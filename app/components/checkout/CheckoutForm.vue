<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

import { toTypedSchema } from '~/utils/zodSchema'

defineProps<{
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  submit: [data: { name: string, email: string, tel: string, address: string, message: string }]
}>()

const TW_PHONE_RE = /^0[2-9]\d{7,8}$/

const schema = toTypedSchema(
  z.object({
    name: z.string().min(2, '姓名至少 2 個字'),
    email: z.string().min(1, '請輸入 Email').email('請輸入有效的 Email 格式'),
    tel: z
      .string()
      .min(1, '請輸入電話')
      .regex(TW_PHONE_RE, '請輸入有效的台灣電話號碼（如 0912345678）'),
    address: z.string().min(5, '請輸入完整地址'),
    message: z.string().optional().default(''),
  }),
)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    name: '',
    email: '',
    tel: '',
    address: '',
    message: '',
  },
})

const [name, nameProps] = defineField('name', { validateOnBlur: true })
const [email, emailProps] = defineField('email', { validateOnBlur: true })
const [tel, telProps] = defineField('tel', { validateOnBlur: true })
const [address, addressProps] = defineField('address', { validateOnBlur: true })
const [message, messageProps] = defineField('message')

const onSubmit = handleSubmit(
  (values) => {
    emit('submit', {
      name: values.name,
      email: values.email,
      tel: values.tel,
      address: values.address,
      message: values.message ?? '',
    })
  },
  () => {
    toast.error('請修正標示的欄位')
  },
)
</script>

<template>
  <form class="flex flex-col gap-5" @submit="onSubmit">
    <div>
      <label class="text-body text-cc-black font-medium mb-1 block">姓名 *</label>
      <UiInput
        v-model="name"
        v-bind="nameProps"
        placeholder="請輸入姓名"
        autocomplete="name"
        :class="errors.name ? 'border-cc-accent focus-visible:ring-cc-accent' : ''"
      />
      <p v-if="errors.name" class="text-xs text-cc-accent mt-1">
        {{ errors.name }}
      </p>
    </div>
    <div>
      <label class="text-body text-cc-black font-medium mb-1 block">Email *</label>
      <UiInput
        v-model="email"
        v-bind="emailProps"
        type="email"
        placeholder="請輸入 Email"
        autocomplete="email"
        :class="errors.email ? 'border-cc-accent focus-visible:ring-cc-accent' : ''"
      />
      <p v-if="errors.email" class="text-xs text-cc-accent mt-1">
        {{ errors.email }}
      </p>
    </div>
    <div>
      <label class="text-body text-cc-black font-medium mb-1 block">電話 *</label>
      <UiInput
        v-model="tel"
        v-bind="telProps"
        type="tel"
        placeholder="請輸入電話"
        autocomplete="tel"
        :class="errors.tel ? 'border-cc-accent focus-visible:ring-cc-accent' : ''"
      />
      <p v-if="errors.tel" class="text-xs text-cc-accent mt-1">
        {{ errors.tel }}
      </p>
    </div>
    <div>
      <label class="text-body text-cc-black font-medium mb-1 block">地址 *</label>
      <UiInput
        v-model="address"
        v-bind="addressProps"
        placeholder="請輸入地址"
        autocomplete="street-address"
        :class="errors.address ? 'border-cc-accent focus-visible:ring-cc-accent' : ''"
      />
      <p v-if="errors.address" class="text-xs text-cc-accent mt-1">
        {{ errors.address }}
      </p>
    </div>
    <div>
      <label class="text-body text-cc-black font-medium mb-1 block">備註</label>
      <textarea
        v-model="message"
        v-bind="messageProps"
        rows="3"
        placeholder="有什麼想告訴我們的嗎？"
        class="text-body px-3 py-2 outline-none border border-cc-grey-d4 rounded-[5px] bg-white w-full resize-none placeholder:text-cc-grey-9f focus:(ring-2 ring-cc-primary ring-offset-2)"
      />
    </div>
    <button type="submit" class="btn py-3 w-full" :disabled="isSubmitting">
      {{ isSubmitting ? "處理中..." : "確認訂單" }}
    </button>
  </form>
</template>
