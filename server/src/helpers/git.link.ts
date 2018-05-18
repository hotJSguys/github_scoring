import * as url from 'url'

export function parseUrl(gitLink: string) {
    let parsed = url.parse(gitLink)
    if (!parsed.protocol) {
        parsed = url.parse('https://' + parsed)
    }

    if (!parsed.hostname || !parsed.pathname) {
        throw new Error('wrong url')
    }
    if (parsed.protocol === 'http' || parsed.protocol === 'http:') {
        parsed.protocol = 'https:'
    }

    return {
        gitUrl: url.format(parsed),
    }
}

export const tmpDirectory = '/tmp'
