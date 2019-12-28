export interface Pet {
    id: number
    uuid: string
    created_date: Date
    modified_date: Date
    deleted: boolean
    canonical: string
    schema_name: string
    table_name: string
    updater_user_id: number
    creator_user_id: number
    version: number
    gallery_id: number
    name: string
    picture: string
    active: true
    breed_primary_id: 4659124
    breed_secondary_id?: number
    specie_id: number
    sex_key: string
    age_key: string
    size_key: string
    description: string
    status_key: string
    price: number
}