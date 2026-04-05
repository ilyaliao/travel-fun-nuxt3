import type { AddCartRes, CartRes, CouponRes, DeleteAllCartsRes, DeleteCartRes } from "~/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { queryKeys } from "./keys";

export function useCartQuery() {
  const { loggedIn } = useUserSession();

  return useQuery({
    queryKey: queryKeys.cart.all,
    queryFn: () => $fetch<CartRes>("/api/cart"),
    enabled: loggedIn,
  });
}

export function useAddCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { data: { product_id: string; qty: number; buy_date: number } }) =>
      $fetch<AddCartRes>("/api/cart", { method: "POST", body: data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useDeleteCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => $fetch<DeleteCartRes>(`/api/cart/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useDeleteAllCarts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => $fetch<DeleteAllCartsRes>("/api/cart", { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}

export function useApplyCoupon() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (code: string) =>
      $fetch<CouponRes>("/api/cart/coupon", { method: "POST", body: { data: { code } } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cart.all });
    },
  });
}
