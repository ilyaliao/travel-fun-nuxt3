import { Sort } from '../types'

export const countryMap = new Map().set('taiwan', '台灣')

export const cityPos = new Map()
  .set('north', '北部')
  .set('central', '中部')
  .set('south', '南部')
  .set('east', '東部')
  .set('outlying', '離島')

export const cityMap = new Map()
  .set('taipei', '台北')
  .set('keelung', '基隆')
  .set('new-taipei', '新北')
  .set('taoyuan', '桃園')
  .set('hsinchu', '新竹')
  .set('miaoli', '苗栗')
  .set('taichung', '台中')
  .set('changhua', '彰化')
  .set('nantou', '南投')
  .set('yunlin', '雲林')
  .set('chiayi', '嘉義')
  .set('tainan', '台南')
  .set('kaohsiung', '高雄')
  .set('pingtung', '屏東')
  .set('yilan', '宜蘭')
  .set('hualien', '花蓮')
  .set('taitung', '台東')
  .set('penghu', '澎湖')

export const cityData: Record<string, string[]> = {
  central: ['hsinchu', 'miaoli', 'taichung', 'changhua'],
  east: ['yilan', 'hualien', 'taitung'],
  north: ['taipei', 'keelung', 'new-taipei', 'taoyuan'],
  outlying: ['pingtung', 'penghu'],
  south: ['nantou', 'yunlin', 'chiayi', 'tainan', 'kaohsiung'],
}

export const categoryMap = new Map().set('tickets', '門票').set('package', '套票')

export const unitMap = new Map().set('張', '張')

export const sortMap = new Map<Sort, string>()
  .set(Sort.Popular, '熱門程度')
  .set(Sort.UserRating, '用戶評價')
  .set(Sort.PriceLowToHigh, '價格：低到高')
  .set(Sort.NewArrivals, '最新上架')

export const mockMap = [
  { id: 1, lat: 25.0425, lng: 121.5468 },
  { id: 2, lat: 25.1023, lng: 121.3321 },
  { id: 3, lat: 25.1123, lng: 121.3221 },
  { id: 4, lat: 25.0423, lng: 121.54271 },
  { id: 5, lat: 25.1423, lng: 121.522 },
  { id: 6, lat: 25.1623, lng: 121.4922 },
  { id: 7, lat: 25.0013, lng: 121.5122 },
  { id: 8, lat: 25.1283, lng: 121.5471 },
]
