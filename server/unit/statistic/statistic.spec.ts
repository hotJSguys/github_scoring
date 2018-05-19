// todo rewrite
/*
import {Repository} from 'nodegit'
import * as fs from 'fs'
test('getName', async () => {
    const repository = await Repository.open('../../../')
    expect(await getName(repository)).toEqual('github_scoring')
})

test('getAllCommits', async () => {
    const repository = await Repository.open('../../../')
    await getAllCommits(repository) // should not fail
})

test('getReadme', async () => {
    const repository = await Repository.open('../../../')
    expect(await getReadme(repository))
        .toEqual(fs.readFileSync('../../../README.md').toString())
})

test('getMainLanguage', async () => {
    const repository = await Repository.open('../../../')
    const {maxLinesLanguage} = await getMainLanguage(repository)
    expect((maxLinesLanguage!.name === 'JavaScript' || maxLinesLanguage!.name === 'TypeScript')).toEqual(true)
})
*/