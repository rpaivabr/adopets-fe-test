import { Query, Options, Search } from "../models/query"

const queryEditor = (page: number, limit: number, sex: string | null, size: string | null, age: string | null, order: boolean): Query => {
    const search: Search = {}
    const options: Options = { page, limit }
    const sort: string[] = [];

    if (sex) search.sex_key = sex
    if (size) search.size_key = size
    if (age) search.age_key = age
    order ? sort.push('name') : sort.push('-name')
    
    return { search, options, sort }
}

export default queryEditor