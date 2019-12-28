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

const defaultUser = {
    "organization_user": {
        "email": "usuario-test@adopets.com",
        "password": "123123"
    }
}

const apiKey = '505763d6-4202-4b05-9efc-93b366939bcf'

export { queryEditor, defaultUser, apiKey }