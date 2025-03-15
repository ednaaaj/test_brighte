import { NextRequest, NextResponse } from 'next/server'
import {  object, string, infer } from 'zod'

const referralSchema = object({
  name: string().nonempty(),
  email: string().email(),
  phone: string().nonempty(),
  message: string().nonempty()
})

interface Referral extends infer<typeof referralSchema> {
  id: number
}

// temporary database
let referrals: Referral[] = []


export async function GET() {
  return NextResponse.json(referrals, { status: 200 })
}


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = referralSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors },
        { status: 400 }
      )
    }
    const newReferral: Referral = {
      id: Date.now(),
      ...parsed.data,
    }
    referrals.push(newReferral)
    return NextResponse.json(newReferral, { status: 201 })
  } catch (e) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
