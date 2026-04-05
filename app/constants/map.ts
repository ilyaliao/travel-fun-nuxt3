import { Sort } from '../types'

export const countryMap = new Map().set('taiwan', '台灣')

export const cityPos = new Map()
  .set('north', '北部')
  .set('central', '中部')
  .set('south', '南部')
  .set('east', '東部')
  .set('outlying', '離島')

export const cityMap = new Map()
  .set('taipei', '臺北市')
  .set('keelung', '基隆市')
  .set('new-taipei', '新北市')
  .set('taoyuan', '桃園市')
  .set('hsinchu', '新竹市')
  .set('hsinchu-county', '新竹縣')
  .set('miaoli', '苗栗縣')
  .set('taichung', '臺中市')
  .set('changhua', '彰化縣')
  .set('nantou', '南投縣')
  .set('yunlin', '雲林縣')
  .set('chiayi', '嘉義市')
  .set('chiayi-county', '嘉義縣')
  .set('tainan', '臺南市')
  .set('kaohsiung', '高雄市')
  .set('pingtung', '屏東縣')
  .set('yilan', '宜蘭縣')
  .set('hualien', '花蓮縣')
  .set('taitung', '臺東縣')
  .set('penghu', '澎湖縣')
  .set('kinmen', '金門縣')
  .set('lienchiang', '連江縣')

export const cityData: Record<string, string[]> = {
  north: ['taipei', 'new-taipei', 'keelung', 'hsinchu', 'taoyuan', 'hsinchu-county', 'yilan'],
  central: ['taichung', 'miaoli', 'changhua', 'nantou', 'yunlin'],
  south: ['kaohsiung', 'tainan', 'chiayi', 'chiayi-county', 'pingtung', 'penghu'],
  east: ['hualien', 'taitung', 'chiayi', 'chiayi-county', 'pingtung', 'penghu'],
  outlying: ['kinmen', 'lienchiang'],
}

export const categoryMap = new Map().set('tickets', '門票').set('package', '套票')

export const unitMap = new Map().set('張', '張')

export const sortMap = new Map<Sort, string>()
  .set(Sort.Popular, '熱門程度')
  .set(Sort.UserRating, '用戶評價')
  .set(Sort.PriceLowToHigh, '價格：低到高')
  .set(Sort.NewArrivals, '最新上架')

export const cityImageMap = new Map<string, string>()
  .set('taipei', 'https://images.unsplash.com/photo-1587959133322-6f38bf3d21ad?w=800&q=80')
  .set('keelung', 'https://images.unsplash.com/photo-1647685102327-6c34417ed9ed?w=800&q=80')
  .set('new-taipei', 'https://images.unsplash.com/photo-1540187334920-54e87c2771c0?w=800&q=80')
  .set('taoyuan', 'https://images.unsplash.com/photo-1603416547763-c637d96f5fef?w=800&q=80')
  .set('hsinchu', 'https://images.unsplash.com/photo-1603416529883-545298b8b85d?w=800&q=80')
  .set('hsinchu-county', 'https://images.unsplash.com/photo-1625427890696-47a177a730b2?w=800&q=80')
  .set('miaoli', 'https://images.unsplash.com/photo-1748439844626-770f60f8f325?w=800&q=80')
  .set('taichung', 'https://images.unsplash.com/photo-1675227422449-f2d4d9a731dd?w=800&q=80')
  .set('changhua', 'https://images.unsplash.com/photo-1665296380265-d98d74d4571f?w=800&q=80')
  .set('nantou', 'https://images.unsplash.com/photo-1600280254948-231f1e57ee3d?w=800&q=80')
  .set('yunlin', 'https://images.unsplash.com/photo-1695015768870-e0cfd454f35d?w=800&q=80')
  .set('chiayi', 'https://images.unsplash.com/photo-1575467627652-0c597f6dba77?w=800&q=80')
  .set('chiayi-county', 'https://images.unsplash.com/photo-1587108639646-c6ea7b46b247?w=800&q=80')
  .set('tainan', 'https://images.unsplash.com/photo-1568213960603-7746a0fc4d55?w=800&q=80')
  .set('kaohsiung', 'https://images.unsplash.com/photo-1677607221983-630ffb5ea1d8?w=800&q=80')
  .set('pingtung', 'https://images.unsplash.com/photo-1621315875054-3adb72ab43bf?w=800&q=80')
  .set('yilan', 'https://images.unsplash.com/photo-1694005891521-150e805eebf1?w=800&q=80')
  .set('hualien', 'https://images.unsplash.com/photo-1617544530529-b5e9b791b6a2?w=800&q=80')
  .set('taitung', 'https://images.unsplash.com/photo-1622660566657-2aa1c96848e6?w=800&q=80')
  .set('penghu', 'https://images.unsplash.com/photo-1649001254038-48a019e3a152?w=800&q=80')
  .set('kinmen', 'https://images.unsplash.com/photo-1670737619030-cd61f247eafd?w=800&q=80')
  .set('lienchiang', 'https://images.unsplash.com/photo-1737175778221-ccd0b854de50?w=800&q=80')
