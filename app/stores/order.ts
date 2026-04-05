import type { AppliedCoupon, CartItem, Order, PaymentMethod } from '~/types/cart'

export const useOrderStore = defineStore(
  'order',
  () => {
    const orders = ref<Order[]>([])

    function getOrderById(id: string): Order | undefined {
      return orders.value.find(o => o.id === id)
    }

    function createOrder(
      userInfo: { name: string, email: string, tel: string, address: string },
      message: string,
      paymentMethod: PaymentMethod,
      cartItems: CartItem[],
      cartCoupon: AppliedCoupon | null,
      subtotal: number,
      discountAmount: number,
      total: number,
    ): string {
      const id = crypto.randomUUID()
      orders.value.push({
        id,
        items: [...cartItems],
        coupon: cartCoupon ? { ...cartCoupon } : null,
        user: { ...userInfo },
        message,
        subtotal,
        discountAmount,
        total,
        paymentMethod,
        isPaid: false,
        createdAt: new Date().toISOString(),
      })
      return id
    }

    function markPaid(id: string) {
      const order = orders.value.find(o => o.id === id)
      if (order)
        order.isPaid = true
    }

    function setPaymentMethod(id: string, method: PaymentMethod) {
      const order = orders.value.find(o => o.id === id)
      if (order)
        order.paymentMethod = method
    }

    return { orders, getOrderById, createOrder, markPaid, setPaymentMethod }
  },
  {
    persist: true,
  },
)
