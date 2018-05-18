import * as Router from 'koa-router'
import {getLinkUrl} from './git.holder'

export const repositoryRouter = new Router()
    .get('/name', ctx => {
        ctx.body = getLinkUrl(ctx.params.id)
    })
