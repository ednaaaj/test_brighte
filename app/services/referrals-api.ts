import { Referral, ReferralInput } from '@/types'

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

export async function getReferrals(): Promise<Referral[]> {
  const res = await fetch(`${baseUrl}/api/referrals`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch referrals')
  return res.json()
}

export async function createReferral(payload: ReferralInput): Promise<Referral> {
  const res = await fetch(`${baseUrl}/api/referrals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const err = await res.json()
    throw err
  }
  return res.json()
}
