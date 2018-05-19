import * as Router from 'koa-router'
import {GithubStatistic} from '../statistic/github'

export const statisticRouter = new Router()
    .get('/statistic/:id', async ctx => {
        const {id} = ctx.params
        // todo gitlab, fallback to simple
        const repository = await GithubStatistic.initFromId(id)

        const [name, commitsStat, readme, mainLanguage] = await Promise.all([
            repository.getName(),
            repository.commitsStatistic(),
            repository.getReadme(),
            repository.getMainLanguage()
        ])

        ctx.body = {
            name,
            commitsStat,
            readme,
            mainLanguage
        }
    })