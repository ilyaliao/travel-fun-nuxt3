import type { AppliedCoupon, CartItem } from '~/types/cart'
import type { Product } from '~/types/data'

export const useCartStore = defineStore(
  'cart',
  () => {
    const items = ref<CartItem[]>([])
    const coupon = ref<AppliedCoupon | null>(null)

    const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.qty, 0))

    const subtotal = computed(() =>
      items.value.reduce((sum, item) => {
        const price = item.planPrice ?? item.product.price
        return sum + price * item.qty
      }, 0),
    )

    const discountAmount = computed(() => coupon.value?.discountAmount ?? 0)
    const finalTotal = computed(() => Math.max(0, subtotal.value - discountAmount.value))
    const isEmpty = computed(() => items.value.length === 0)

    function findExistingIndex(productId: string, planTitle?: string, buyDate?: string): number {
      return items.value.findIndex((item) => {
        if (item.productId !== productId)
          return false
        if (planTitle)
          return item.planTitle === planTitle && item.buyDate === buyDate
        return !item.planTitle
      })
    }

    function addItem(
      product: Product,
      qty: number,
      plan?: { title: string, price: number },
      buyDate?: string,
    ) {
      const existingIndex = findExistingIndex(product.id, plan?.title, buyDate)
      if (existingIndex >= 0) {
        items.value[existingIndex]!.qty += qty
        return
      }
      items.value.push({
        id: crypto.randomUUID(),
        productId: product.id,
        product,
        qty,
        ...(plan && { planTitle: plan.title, planPrice: plan.price }),
        ...(buyDate && { buyDate }),
      })
    }

    function removeItem(id: string) {
      items.value = items.value.filter(item => item.id !== id)
      if (items.value.length === 0)
        coupon.value = null
    }

    function updateQty(id: string, qty: number) {
      const item = items.value.find(i => i.id === id)
      if (item)
        item.qty = Math.max(1, qty)
    }

    function setCoupon(applied: AppliedCoupon) {
      coupon.value = applied
    }

    function removeCoupon() {
      coupon.value = null
    }

    function clearCart() {
      items.value = []
      coupon.value = null
    }

    return {
      items,
      coupon,
      totalItems,
      subtotal,
      discountAmount,
      finalTotal,
      isEmpty,
      addItem,
      removeItem,
      updateQty,
      setCoupon,
      removeCoupon,
      clearCart,
    }
  },
  {
    persist: true,
  },
)
