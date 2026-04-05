<template>
  <div class="flex flex-col gap-4">
    <div>
      <label class="text-body text-cc-black font-medium mb-1 block">卡號</label>
      <UiInput model-value="4242 4242 4242 4242" disabled />
    </div>
    <div class="gap-4 grid grid-cols-2">
      <div>
        <label class="text-body text-cc-black font-medium mb-1 block">有效期限</label>
        <UiInput model-value="12/28" disabled />
      </div>
      <div>
        <label class="text-body text-cc-black font-medium mb-1 block">CVV</label>
        <UiInput model-value="123" disabled />
      </div>
    </div>
    <p class="text-xs text-cc-grey-9f">
      此為模擬付款，不會產生實際扣款
    </p>
  </div>
</template>
