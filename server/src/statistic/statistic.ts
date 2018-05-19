import {Repository} from 'nodegit'
import * as fs from 'fs'
import {promisify} from 'util'
import * as path from 'path'
import langList = require('language-map')

interface UserGitData {
    commits: Array<{ description: string, date: Date, sha: string }>
    additions: number
    deletions: number
}

interface Language {
    color: string,
    name: string
}

const extMap = new Map<string, Language>();

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

export const getName = async (repository: Repository) => {
    const config = await repository.config()

    const origin: string = await config.getStringBuf('remote.origin.url') as any

    const parts = origin.split('/')
    const name = parts[parts.length - 1]

    return name.endsWith('.git') ? name.slice(0, name.length - 4) : name
}

export const getAllCommits = async (repository: Repository) => {
    const walker = await repository.createRevWalk('HEAD')

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

export const getReadme = async (repository: Repository) => {
    const repositoryPath = repository.path()
    const readmePath = repositoryPath.slice(0, repositoryPath.length - 5) + 'README.md'
    const exists = fs.existsSync(readmePath)
    if (exists) {
        const stats = await statPromise(readmePath)
        if (stats.size < 10000) {
            return (await readFilePromise(readmePath,)).toString()
        }
    }
}

const walker = async (dir: string, map: Map<string, number>) => {
    const list = await readdirPromise(dir)

    await Promise.all(list.map(async node => {
        const newPath = path.join(dir, node)

        const stat = await statPromise(newPath)

        if (stat.isDirectory()) {
            return walker(newPath, map)
        }

        const extension = path.extname(newPath).toLowerCase()

        if (!extension) {
            return
        }

        map.set(extension, (map.get(extension) || 0) + stat.size)
    }))
}


export const getMainLanguage = async (repository: Repository) => {
    const repositoryPath = repository.path()
    const repositoryRootPath = repositoryPath.slice(0, repositoryPath.length - 4)
    const sizesMap = new Map<string, number>()
    await walker(repositoryRootPath, sizesMap)
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
