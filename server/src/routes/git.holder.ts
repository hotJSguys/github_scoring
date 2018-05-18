// perfect db

const idToLinkMap = new Map<number, string>()
const linkToIdMap = new Map<string, number>()
let counter = 0

export const getLinkId = (link: string) => linkToIdMap.get(link)

export const getLinkUrl = (id: number) => idToLinkMap.get(id)

export const addLink = (link: string) => {
    if (linkToIdMap.has(link)) {
        throw new Error('already exists')
    }

    counter++
    linkToIdMap.set(link, counter)
    idToLinkMap.set(counter, link)
    return counter
}
