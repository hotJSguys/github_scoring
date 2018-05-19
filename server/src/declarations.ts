declare module 'language-map' {
    const t: Record<string, {
        type: 'programming' | 'data'
        color: string
        extensions: string[]
    }>
    export = t
}