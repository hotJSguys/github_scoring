import * as KoaRouter from 'koa-router'
import {loadGitRouter} from './routes/load'
import * as nodegit from 'nodegit'
import * as path from 'path'
import {tmpDirectory} from './helpers/git.link'
import {repositoryRouter} from './routes/repository'

export const globalRouter = new KoaRouter()
    .use('/load', loadGitRouter.routes())

    .prefix('/:id')
    .use(async (ctx, next) => {
        const {id} = ctx.params
        ctx.state.repository = await nodegit.Repository.open(path.join(tmpDirectory, id))
        await next()
    })
    .use('/repository', repositoryRouter.routes())