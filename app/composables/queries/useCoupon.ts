import type { AppliedCoupon } from '~/types/cart'
import { useMutation } from '@pinia/colada'

interface VerifyCouponResponse {
  success: boolean
  message: string
  code: string
  title: string
  type: 'percent' | 'fixed'
  value: number
  discountAmount: number
}

export function useVerifyCoupon() {
  return useMutation({
    mutation: async (params: { code: string, orderAmount: number }): Promise<AppliedCoupon> => {
      const res = await $fetch<VerifyCouponResponse>('/api/coupons/verify', {
        method: 'POST',
        body: params,
      })
      return {
        code: res.code,
        title: res.title,
        type: res.type,
        value: res.value,
        discountAmount: res.discountAmount,
      }
    },
  })
}
