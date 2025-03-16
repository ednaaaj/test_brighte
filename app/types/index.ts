import { z } from 'zod'

export const ReferralInputSchema = z.object({
  givenName: z.string().nonempty(),
  surname: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
  homeName: z.string().optional(),
  street: z.string().optional(),
  suburb: z.string().optional(),
  state: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional()
})

export type ReferralInput = z.infer<typeof ReferralInputSchema>

export const ReferralOutputSchema = ReferralInputSchema.extend({
  id: z.number()
})
export type Referral = z.infer<typeof ReferralOutputSchema>

export const ReferralArraySchema = z.array(ReferralOutputSchema)
