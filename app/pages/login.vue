<script setup lang="ts">
import { toast } from 'vue-sonner'

const userStore = useUserStore()
const signInMutation = useSignIn()

const form = reactive({
  username: '',
  password: '',
})

async function handleLogin() {
  if (!form.username || !form.password) {
    toast.error('請輸入帳號和密碼')
    return
  }

  signInMutation
    .mutateAsync(form)
    .then((res: any) => {
      if (res.token) {
        userStore.setToken(res.token, res.expired)
        toast.success('登入成功')
        navigateTo('/')
      }
    })
    .catch(() => {
      toast.error('登入失敗')
    })
}

useSeoMeta({ title: '登入' })
</script>

<template>
  <div class="px-4 flex min-h-[60vh] items-center justify-center">
    <div class="max-w-sm w-full">
      <h1 class="text-h3 mb-8 text-center">
        登入
      </h1>

      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <div>
          <label class="text-body text-cc-black font-medium mb-1 block">帳號</label>
          <UiInputInput v-model="form.username" placeholder="請輸入帳號" />
        </div>
        <div>
          <label class="text-body text-cc-black font-medium mb-1 block">密碼</label>
          <UiInputInput v-model="form.password" type="password" placeholder="請輸入密碼" />
        </div>

        <button
          type="submit"
          class="btn mt-2 py-3 w-full"
          :disabled="signInMutation.isPending.value"
        >
          {{ signInMutation.isPending.value ? "登入中..." : "登入" }}
        </button>
      </form>
    </div>
  </div>
</template>
