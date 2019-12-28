export interface Query {
    search: Search
    options: Options
    sort: string[]
}

export interface Search {
    sex_key?: string
    size_key?: string
    age_key?: string
}

export interface Options {
    page: number
    limit: number
}