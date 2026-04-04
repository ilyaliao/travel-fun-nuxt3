export * from './api'
export * from './data'

export interface UserInfo {
  password: string
  username: string
}

export enum Class {
  City = 'city',
  Country = 'country',
}
