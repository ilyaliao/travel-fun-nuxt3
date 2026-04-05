import type { TypedSchema } from 'vee-validate'
import type { z } from 'zod'

/**
 * Wraps a Zod v4 schema into a vee-validate TypedSchema.
 * Replaces `@vee-validate/zod`'s `toTypedSchema` which is incompatible with Zod v4.
 */
export function toTypedSchema<T extends z.ZodType>(zodSchema: T): TypedSchema {
  return {
    __type: 'VVTypedSchema',
    async parse(values: unknown) {
      const result = await zodSchema.safeParseAsync(values)
      if (result.success) {
        return {
          value: result.data,
          errors: [],
        }
      }
      const errors: Record<string, string> = {}
      for (const issue of result.error.issues) {
        const path = issue.path.join('.')
        if (!errors[path])
          errors[path] = issue.message
      }
      return {
        errors: Object.entries(errors).map(([path, message]) => ({
          path,
          errors: [message],
        })),
      }
    },
  }
}
