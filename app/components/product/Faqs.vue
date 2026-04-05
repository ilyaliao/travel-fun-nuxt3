<script setup lang="ts">
import type { Faq } from '~/types'

defineProps<{
  faqs: Faq[]
}>()
</script>

<template>
  <section>
    <h2 class="text-h4 tracking-normal mb-6">
      常見問題
    </h2>
    <div class="border border-cc-grey-e9 rounded-xl">
      <UiAccordion type="multiple">
        <UiAccordionItem
          v-for="faq in faqs"
          :key="faq.id"
          :value="String(faq.id)"
          class="border-b border-cc-grey-e9 last:border-b-0"
        >
          <UiAccordionTrigger class="px-5">
            {{ faq.question }}
          </UiAccordionTrigger>
          <UiAccordionContent class="px-5">
            <p class="text-sm text-cc-grey-66 leading-relaxed">
              {{ faq.answer }}
            </p>
          </UiAccordionContent>
        </UiAccordionItem>
      </UiAccordion>
    </div>
  </section>
</template>
