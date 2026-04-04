export * from './data'

export interface Pagination {
  category: string
  current_page: number
  has_next: boolean
  has_pre: boolean
  total_pages: number
}

export interface UserInfo {
  password: string
  username: string
}

export enum Class {
  City = 'city',
  Country = 'country',
}
