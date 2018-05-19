import * as Octokit from '@octokit/rest'
import {Issue, Statistic, UserGitData} from './statistic'

const octokit = new Octokit()

export class GithubStatistic extends Statistic {

    private get repo() {
        return 'repo' // todo
    }

    private get owner() {
        return 'owner' // todo
    }

    public async commitsStatistic() {
        const users = new Map<string, UserGitData>()

        const contributors = await octokit.repos.getStatsContributors({
            repo: this.repo,
            owner: this.owner
        })

        for (const contributor of contributors.data) {
            const author = contributor.author.login

            const userGitData: UserGitData = {
                additions: 0,
                deletions: 0,
                commits: [],
                avatar: contributor.author.avatar_url
            }

            for (const {a, d} of contributor.weeks) {
                userGitData.additions += a
                userGitData.deletions += d
            }

            const commits: { data: any[] } = await octokit.repos.getCommits({
                repo: this.repo,
                owner: this.owner,
                author,
                per_page: 10,
            })
            userGitData.commits = commits.data.map(({sha, commit}) => ({
                sha,
                author: commit.author.name,
                date: new Date(commit.author.date),
                description: commit.message
            }))

            users.set(author, userGitData)
        }
        return users
    }

    public async getIssues() {
        let page = 1
        const issues = new Map<number, Issue>((await this.getIssuesList())
            .map((issue): [number, Issue] => [issue.id, issue]))

        while (true) {
            const {data: events} = await octokit.issues.getEventsForRepo({
                page: page++,
                per_page: 100,
                owner: this.owner,
                repo: this.repo,
            })

            for (const event of events) {
                const issue = issues.get(event.issue.id)!
                switch (event.event) {
                    case 'assigned':
                        issue.assignee.push({
                            user: event.assignee.login,
                            fromDate: new Date(event.created_at)
                        })
                        break
                    case 'unassigned':
                        issue.assignee.push({
                            user: null,
                            fromDate: new Date(event.created_at)
                        })
                        break
                    case 'milestoned':
                        issue.milestone.push({
                            milestone: event.milestone.number,
                            fromDate: new Date(event.created_at)
                        })
                        break
                    case 'demilestoned':
                        issue.milestone.push({
                            milestone: null,
                            fromDate: new Date(event.created_at)
                        })
                        break
                }
            }

            if (events.length < 100) {
                break
            }
        }
        return [...issues.values()]
    }

    public async getMilestones() {
        return super.getMilestones()
    }


    private async getIssuesList() {
        let page = 1
        const issueList: Issue[] = []
        while (true) {
            const {data: apiIssues}: { data: any[] } = await octokit.issues.getForRepo({
                direction: 'asc',
                state: 'all',
                owner: this.owner,
                repo: this.repo,
                page: page++,
                per_page: 100,
            })

            issueList.push(...apiIssues.map((apiIssue: any) => ({
                id: apiIssue.id,
                createdAt: new Date(apiIssue.created_at),
                closedAt: apiIssue.closedAt && new Date(apiIssue.closedAt),
                assignee: apiIssue.assignee.login,
                milestone: [],
                state: apiIssue.state,
            })))

            if (apiIssues.length < 100) {
                break
            }
        }
        return issueList
    }
}
