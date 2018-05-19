import * as KoaRouter from 'koa-router'
import {loadGitRouter} from './routes/load'
import {statisticRouter} from './routes/statistic'

export const globalRouter = new KoaRouter()
    .use(loadGitRouter.routes())
    .use(statisticRouter.routes())
