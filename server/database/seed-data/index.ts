import { changhuaProducts } from './cities/changhua'
import { chiayiProducts } from './cities/chiayi'
import { chiayiCountyProducts } from './cities/chiayi-county'
import { hsinchuProducts } from './cities/hsinchu'
import { hsinchuCountyProducts } from './cities/hsinchu-county'
import { hualienProducts } from './cities/hualien'
import { kaohsiungProducts } from './cities/kaohsiung'
import { keelungProducts } from './cities/keelung'
import { kinmenProducts } from './cities/kinmen'
import { lienchiangProducts } from './cities/lienchiang'
import { miaoliProducts } from './cities/miaoli'
import { nantouProducts } from './cities/nantou'
import { newTaipeiProducts } from './cities/new-taipei'
import { penghuProducts } from './cities/penghu'
import { pingtungProducts } from './cities/pingtung'
import { taichungProducts } from './cities/taichung'
import { tainanProducts } from './cities/tainan'
import { taipeiProducts } from './cities/taipei'
import { taitungProducts } from './cities/taitung'
import { taoyuanProducts } from './cities/taoyuan'
import { yilanProducts } from './cities/yilan'
import { yunlinProducts } from './cities/yunlin'
import { buildFullProduct, generateFaqs, generatePlans, generateReviews } from './generators'

const allCityData = [
  { city: 'taipei', products: taipeiProducts },
  { city: 'new-taipei', products: newTaipeiProducts },
  { city: 'keelung', products: keelungProducts },
  { city: 'taoyuan', products: taoyuanProducts },
  { city: 'hsinchu', products: hsinchuProducts },
  { city: 'hsinchu-county', products: hsinchuCountyProducts },
  { city: 'miaoli', products: miaoliProducts },
  { city: 'taichung', products: taichungProducts },
  { city: 'changhua', products: changhuaProducts },
  { city: 'nantou', products: nantouProducts },
  { city: 'yunlin', products: yunlinProducts },
  { city: 'chiayi', products: chiayiProducts },
  { city: 'chiayi-county', products: chiayiCountyProducts },
  { city: 'tainan', products: tainanProducts },
  { city: 'kaohsiung', products: kaohsiungProducts },
  { city: 'pingtung', products: pingtungProducts },
  { city: 'yilan', products: yilanProducts },
  { city: 'hualien', products: hualienProducts },
  { city: 'taitung', products: taitungProducts },
  { city: 'penghu', products: penghuProducts },
  { city: 'kinmen', products: kinmenProducts },
  { city: 'lienchiang', products: lienchiangProducts },
]

export const seedProducts = allCityData.flatMap(({ city, products }) =>
  products.map(p => buildFullProduct(city, p)),
)

export const seedPlans = allCityData.flatMap(({ city, products }) =>
  products.flatMap(p => generatePlans(city, p)),
)

export const seedReviews = allCityData.flatMap(({ city, products }) =>
  products.flatMap(p => generateReviews(city, p)),
)

export const seedFaqs = allCityData.flatMap(({ city, products }) =>
  products.flatMap(p => generateFaqs(city, p)),
)

export const seedCoupons = [
  {
    code: 'SUMMER90',
    title: '夏日九折',
    type: 'percent' as const,
    value: 10,
    minAmount: 1000,
    isEnabled: 1,
  },
  {
    code: 'WELCOME200',
    title: '新客折200',
    type: 'fixed' as const,
    value: 200,
    minAmount: 500,
    isEnabled: 1,
  },
  {
    code: 'FREE100',
    title: '滿額折百',
    type: 'fixed' as const,
    value: 100,
    minAmount: 2000,
    isEnabled: 1,
  },
]
