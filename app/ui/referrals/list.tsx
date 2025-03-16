import { Referral } from '@/types'
import { Suspense } from 'react'
import Table, { ColumnDefinition } from '@/components/table'
import { getReferrals } from '@/services/referrals-api'

const referralTableColumn: ColumnDefinition<Referral, keyof Referral>[] = [
  {
    key: 'givenName',
    header: 'Given Name',
  },
  {
    key: 'surname',
    header: 'Surname',
  },
  {
    key: 'email',
    header: 'Email',
  },
  {
    key: 'phone',
    header: 'Phone',
  },
]

export default async function ReferralsTable() {
  const referrals = await getReferrals()

  return (
    <Suspense fallback={<div>Loading Referrals</div>}>
      <Table data={referrals} columns={referralTableColumn} keyField="id" />
    </Suspense>
  )
}
