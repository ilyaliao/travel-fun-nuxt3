<script setup lang="ts">
import { toast } from 'vue-sonner'

const { fetch: refreshSession } = useUserSession()
const signInMutation = useSignIn()

const form = reactive({
  email: '',
  password: '',
})

async function handleLogin() {
  if (!form.email || !form.password) {
    toast.error('請輸入帳號和密碼')
    return
  }

  signInMutation.mutate(form, {
    onSuccess: async () => {
      await refreshSession()
      toast.success('登入成功')
      navigateTo('/')
    },
    onError: () => {
      toast.error('登入失敗')
    },
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
          <label class="text-body text-cc-black font-medium mb-1 block">Email</label>
          <UiInputInput v-model="form.email" type="email" placeholder="請輸入 Email" />
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
