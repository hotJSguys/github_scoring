// perfect db

const idToLinkMap = new Map<number, string>()
const linkToIdMap = new Map<string, number>()
let counter = 0

export const getLinkId = (link: string) => linkToIdMap.get(link)

export const addLink = (link: string) => {
    if (linkToIdMap.has(link)) {
        return linkToIdMap.get(link)!
    }

    counter++
    linkToIdMap.set(link, counter)
    idToLinkMap.set(counter, link)
    return counter
}

export const getLinkFromId = (id: number) => idToLinkMap.get(id)