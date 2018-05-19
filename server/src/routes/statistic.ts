import * as Router from 'koa-router'
import * as nodegit from 'nodegit'
import * as path from 'path'
import {tmpDirectory} from '../helpers/git.link'
import {getAllCommits, getMainLanguage, getName, getReadme} from '../statistic/statistic'

export const statisticRouter = new Router()
    .get('/statistic/:id', async ctx => {
        const {id} = ctx.params
        const repository = await nodegit.Repository.open(path.join(tmpDirectory, id))

        const [name, commitsStat, readme, mainLanguage] = await Promise.all([
            getName(repository),
            getAllCommits(repository),
            getReadme(repository),
            getMainLanguage(repository)
        ])

        ctx.body = {
            name,
            commitsStat,
            readme,
            mainLanguage
        }
    })