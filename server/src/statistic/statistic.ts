import {Repository} from 'nodegit'
import * as fs from 'fs'
import {promisify} from 'util'
import * as path from 'path'
import langList = require('language-map')
import * as nodegit from 'nodegit'
import {parseUrl, tmpDirectory} from '../helpers/git.link'
import {addLink, getLinkFromId, getLinkId} from '../helpers/git.holder'

export interface UserGitData {
    avatar?: string
    commits: Array<{ description: string, date: Date, sha: string }>
    additions: number
    deletions: number
}

export interface Language {
    color: string,
    name: string
}

export interface Issue {
    id: number
    createdAt: Date
    closedAt: Date | null
    assignee: Array<{ user: string | null, fromDate: Date }>
    milestone: Array<{ milestone: number | null, fromDate: Date }>
    state: 'open' | 'closed'
}

export interface Milestone {
    id: number
    title: string
    openIssues: number
    closedIssues: number
    deadline: Date
    closedAt: Date | null
}

const extMap = new Map<string, Language>()

for (const [name, {type, color, extensions}] of Object.entries(langList) as any) {
    if (type !== 'programming' || !extensions) {
        continue
    }
    for (const extension of extensions) {
        extMap.set(extension, {color, name})
    }
}

const statPromise = promisify(fs.stat)
const readdirPromise = promisify(fs.readdir)
const readFilePromise = promisify(fs.readFile)

export class Statistic {

    private repository: Repository
    protected localPath: string
    protected url: string

    protected constructor() {
    }

    public static async initFromId(id: number) {
        const statistic = new Statistic()

        statistic.url = getLinkFromId(id)!
        if (!statistic.url) {
            throw new Error('not found repository')
        }

        statistic.localPath = Statistic.makeLocalPath(id)
        statistic.repository = await nodegit.Repository.open(statistic.localPath)
        return statistic
    }

    public static async init(url: string) {

        const {gitUrl} = parseUrl(url)
        let id = getLinkId(gitUrl)


        if (id) {
            const repo = await nodegit.Repository.open(Statistic.makeLocalPath(id))
            await repo.fetchAll({prune: 1})

        } else {
            id = addLink(gitUrl)
            await nodegit.Clone.clone(gitUrl, Statistic.makeLocalPath(id))
        }
        return Statistic.initFromId(id)
    }

    public static makeLocalPath(id: number) {
        return path.join(tmpDirectory, id.toString())
    }

    public async getName() {
        const config = await this.repository.config()

        const origin: string = await config.getStringBuf('remote.origin.url') as any

        const parts = origin.split('/')
        const name = parts[parts.length - 1]

        return name.endsWith('.git') ? name.slice(0, name.length - 4) : name
    }


    public async commitsStatistic(): Promise<Map<string, UserGitData>> {
        const walker = await this.repository.createRevWalk('HEAD')

        walker.pushGlob('refs/heads/*')

        const users = new Map<string, UserGitData>()

        while (true) {
            const allCommits = await walker.getCommits(200)
            if (allCommits.length === 0) {
                break
            }
            for (const commit of allCommits) {

                const {when, email} = commit.author()
                let userGitData = users.get(email)

                const commitInfo = {
                    description: commit.message(),
                    date: new Date(when.time),
                    sha: commit.sha(),
                }

                let lineAdditions = 0
                let lineDeletions = 0

                const diffs = await commit.getDiff()

                for (const diff of diffs) {
                    const patches = await diff.patches()
                    for (const patch of patches) {
                        const stats = patch.lineStats()
                        lineAdditions += stats.total_additions
                        lineDeletions += stats.total_deletions
                    }
                }

                if (userGitData) {
                    if (userGitData.commits.length < 10) {
                        userGitData.commits.push(commitInfo)
                    }
                } else {
                    userGitData = {
                        commits: [commitInfo],
                        additions: 0,
                        deletions: 0,
                    }
                    users.set(email, userGitData)
                }
                userGitData.additions += lineAdditions
                userGitData.deletions += lineDeletions
            }
        }

        return users
    }


    public async getReadme() {
        const readmePath = this.localPath + 'README.md'
        const exists = fs.existsSync(readmePath)
        if (exists) {
            const stats = await statPromise(readmePath)
            if (stats.size < 10000) {
                return (await readFilePromise(readmePath)).toString()
            }
        }
    }

    private async walker(dir: string, map: Map<string, number>) {
        const list = await readdirPromise(dir)

        await Promise.all(list.map(async node => {
            const newPath = path.join(dir, node)

            const stat = await statPromise(newPath)

            if (stat.isDirectory()) {
                return this.walker(newPath, map)
            }

            const extension = path.extname(newPath).toLowerCase()

            if (!extension) {
                return
            }

            map.set(extension, (map.get(extension) || 0) + stat.size)
        }))
    }


    public async getMainLanguage() {
        const sizesMap = new Map<string, number>()
        await this.walker(this.localPath, sizesMap)
        let maxLines = 0
        let maxLinesLanguage: Language | undefined
        for (const [name, count] of sizesMap) {
            if (!extMap.has(name)) {
                continue
            }
            if (maxLines < count) {
                maxLines = count
                maxLinesLanguage = extMap.get(name)!
            }
        }
        return {
            maxLinesLanguage,
            maxLines,
        }
    }

    public async getIssues(): Promise<Issue[]> {
        return []
    }

    public async getMilestones(): Promise<Issue[]> {
        return []
    }
}