import type { District } from '../apps/DistrictType'

export interface DistrictResponse {
  msg: string
  district: District[]
}