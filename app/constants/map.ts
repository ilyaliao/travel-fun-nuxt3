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

export const mockProducts = [
  {
    evaluate: 4.5,
    evaluateTotal: 23,
    image: '/images/city/city_taipei.jpg',
    location: '新北市',
    originprice: 1000,
    price: 700,
    title: '北海岸自行車一日遊',
  },
  {
    evaluate: 4,
    evaluateTotal: 23,
    image: '/images/city/city_kaohsiung.jpg',
    location: '台中',
    originprice: 250,
    price: 200,
    title: '臺灣國家美術館門票',
  },
  {
    evaluate: 4.5,
    evaluateTotal: 23,
    image: '/images/city/city_taichung.jpg',
    location: '台北',
    originprice: 1000,
    price: 800,
    title: '台北野柳地質公園半日遊',
  },
  {
    evaluate: 4,
    evaluateTotal: 23,
    image: '/images/city/city_penghu.jpg',
    location: '台中',
    originprice: 400,
    price: 300,
    title: '台中大坑風景區租單車',
  },
  {
    evaluate: 5,
    evaluateTotal: 23,
    image: '/images/city/city_taipei.jpg',
    location: '台南',
    originprice: 800,
    price: 500,
    title: '台南安平漁港釣魚體驗',
  },
  {
    evaluate: 4.5,
    evaluateTotal: 23,
    image: '/images/city/city_kaohsiung.jpg',
    location: '屏東',
    originprice: 700,
    price: 500,
    title: '墾丁水上活動｜香蕉船',
  },
  {
    evaluate: 4.5,
    evaluateTotal: 23,
    image: '/images/city/city_tainan.jpg',
    location: '新北市',
    originprice: 1000,
    price: 800,
    title: '石門水庫單車一日遊',
  },
  {
    evaluate: 4,
    evaluateTotal: 23,
    image: '/images/city/city_taichung.jpg',
    location: '台中',
    originprice: 300,
    price: 250,
    title: '鹿港老街踏青體驗',
  },
  {
    evaluate: 4.5,
    evaluateTotal: 23,
    image: '/images/city/city_kaohsiung.jpg',
    location: '花蓮',
    originprice: 1899,
    price: 1599,
    title: '太魯閣國家公園一日遊',
  },
  {
    evaluate: 4,
    evaluateTotal: 23,
    image: '/images/city/city_taichung.jpg',
    location: '彰化',
    originprice: 999,
    price: 799,
    title: '彰化鹿港｜古蹟文化探索一日遊',
  },
]
