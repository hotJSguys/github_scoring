import * as Router from 'koa-router'
import * as nodegit from 'nodegit'
import {parseUrl, tmpDirectory} from '../helpers/git.link'
import {addLink, getLinkId} from '../helpers/git.holder'
import * as path from 'path'


export const loadGitRouter = new Router()
    .post('/load', async ctx => {
        const {url} = ctx.request.body
        const {gitUrl} = parseUrl(url)
        let id = getLinkId(gitUrl)

        if (id) {
            const repo = await nodegit.Repository.open(path.join(tmpDirectory, id.toString()))
            await repo.fetchAll({prune: 1})

        } else {
            id = addLink(gitUrl)
            await nodegit.Clone.clone(gitUrl, path.join(tmpDirectory, id.toString()))
        }
        ctx.body = id
    })