'use client'
import { useState } from 'react'
import { createReferral } from '@/services/referrals-api'
import { ReferralInputSchema, ReferralInput } from '@/types'
import { Input } from '@/components/input'
import { useRouter } from 'next/navigation'

export default function ReferralForm() {
  const router = useRouter()
  const [values, setValues] = useState<ReferralInput>({
    givenName: '',
    surname: '',
    email: '',
    phone: '',
    homeName: '',
    street: '',
    suburb: '',
    state: '',
    postcode: '',
    country: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = ReferralInputSchema.safeParse(values)

    if (!result.success) {
      const newErrors = result.error.errors.reduce((acc, curr) => {
        acc[curr.path[0]] = curr.message
        return acc
      }, {} as Record<string, string>)
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await createReferral(result.data)
      router.refresh()
      setValues({
        givenName: '',
        surname: '',
        email: '',
        phone: '',
        homeName: '',
        street: '',
        suburb: '',
        state: '',
        postcode: '',
        country: '',
      })
    } catch (err) {
      setErrors({ general: 'Failed to create referral' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 space-y-8">
      <h2 className="text-3xl font-bold text-gray-900">Referral Builder</h2>

      <div className="space-y-6">
        <section className="space-y-6">
          <h3 className="text-md font-bold text-gray-500">PERSONAL DETAILS</h3>
          <hr className="border-t border-gray-300" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Input
              name="givenName"
              value={values.givenName}
              onChange={handleChange}
              label="Given Name"
              error={errors.givenName}
            />
            <Input
              name="surname"
              value={values.surname}
              onChange={handleChange}
              label="Surname"
              error={errors.surname}
            />
            <Input
              name="email"
              value={values.email}
              onChange={handleChange}
              label="Email"
              error={errors.email}
            />
            <Input
              name="phone"
              value={values.phone}
              onChange={handleChange}
              label="Phone"
              error={errors.phone}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-md font-bold text-gray-500">ADDRESS</h3>
          <hr className="border-t border-gray-300" />

          <div className="space-y-6">
            <Input
              name="homeName"
              value={values.homeName}
              onChange={handleChange}
              label="Home Name or #"
              error={errors.homeName}
            />
            <Input
              name="street"
              value={values.street}
              onChange={handleChange}
              label="Street"
              error={errors.street}
            />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Input
                name="suburb"
                value={values.suburb}
                onChange={handleChange}
                label="Suburb"
                error={errors.suburb}
              />
              <Input
                name="state"
                value={values.state}
                onChange={handleChange}
                label="State"
                error={errors.state}
              />
              <Input
                name="postcode"
                value={values.postcode}
                onChange={handleChange}
                label="Postcode"
                error={errors.postcode}
              />
              <Input
                name="country"
                value={values.country}
                onChange={handleChange}
                label="Country"
                error={errors.country}
              />
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <button
            type="button"
            className="px-6 py-3 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Upload Avatar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-400 transition-colors"
          >
            {loading ? 'Creating...' : 'Create Referral'}
          </button>
        </div>

        {errors.general && (
          <p className="text-red-500 text-sm">{errors.general}</p>
        )}
      </div>
    </form>
  )
}
