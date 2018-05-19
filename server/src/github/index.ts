import * as Octokit from '@octokit/rest'

interface CommonIssue {
    assignee: string
    milestone: number
    title: string
    state: 'open' | 'closed'
    createdAt: Date
    updatedAt: Date | null
    closedAt: Date | null
}

interface CommonMilestone {
    title: string
    state: 'open' | 'closed'
    number: number
    openIssues: number
    closedIssues: number
    createdAt: Date
    updatedAt: Date | null
    closedAt: Date | null
    dueOn: Date | null
}


const octokit = new Octokit();

export async function getLatestIssues(owner: string, repo: string) {
    const issues: CommonIssue[] = []
    let page = 1;
    while (true) {
        const loadIssues = await octokit.issues.getForRepo({
            sort: 'created',
            owner,
            repo,
            direction: 'asc',
            state: 'all',
            per_page: 100,
            page: page++,
        })
        issues.push(...(loadIssues.data as any[]).map((issue) => ({
            assignee: issue.assignee.login,
            milestone: issue.milestone.number,
            title: issue.title,
            state: issue.state,
            createdAt: new Date(issue.created_at),
            updatedAt: issue.updated_at && new Date(issue.updated_at),
            closedAt: issue.closed_at && new Date(issue.closed_at),
        })))

        if (loadIssues.data.length < 100) {
            break
        }
    }
    return issues
}

export async function getMilestones(owner: string, repo: string) {
    const milestones: CommonMilestone[] = [];
    let page = 1;
    while (true) {
        const {data} = await octokit.issues.getMilestones({
            owner,
            repo,
            state: 'all',
            per_page: 100,
            page: page++,
        })

        milestones.push(...(data as any[]).map(milestone => ({
            title: milestone.title,
            number:milestone.number,
            openIssues: milestone.open_issues,
            closedIssues: milestone.closed_issues,
            state: milestone.state,
            createdAt: new Date(milestone.created_at),
            updatedAt: milestone.updated_at && new Date(milestone.updated_at),
            closedAt: milestone.closed_at && new Date(milestone.closed_at),
            dueOn: milestone.due_on && new Date(milestone.due_on),
        })))

        console.log('data length', data.length)
        if (data.length < 100) {
            break
        }
    }
    return milestones
}

getLatestIssues('hotJSguys', 'github_scoring').then(console.log)