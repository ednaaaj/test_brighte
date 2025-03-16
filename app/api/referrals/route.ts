import { NextRequest, NextResponse } from 'next/server'
import {
  ReferralInputSchema,
  Referral
} from '@/types'

let referrals: Referral[] = []

export async function GET() {
  return NextResponse.json(referrals, { status: 200 })
}

export async function POST(req: NextRequest) {
  try {
    const json = await req.json()
    const parsed = ReferralInputSchema.safeParse(json)
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors }, { status: 400 })
    }
    const newReferral: Referral = {
      id: referrals.length,
      ...parsed.data
    }
    referrals.push(newReferral)
    return NextResponse.json(newReferral, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
