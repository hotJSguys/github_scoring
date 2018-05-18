import * as Koa from 'koa'
import * as bodyParser from "koa-bodyparser"
import * as koaStatic from "koa-static"
import {globalRouter} from './routes'
import KoaLogger = require('koa-logger')

const server = new Koa()
    .use(bodyParser())
    .use(KoaLogger())
    .use(koaStatic('../../client/dist'))
    .use(globalRouter.routes())
    .use(globalRouter.allowedMethods())

server.listen(3000)