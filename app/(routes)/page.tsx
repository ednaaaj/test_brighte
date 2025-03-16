import ReferralForm from '@/ui/referrals/form'
import ReferralsTable from '@/ui/referrals/list'

export default function ReferralsPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full gap-4 p-4">
        <div className="bg-white p-6 rounded-lg shadow-md h-full overflow-y-auto">
          <ReferralForm />
        </div>

        <div className="bg-gray-50 rounded-lg shadow-md h-full overflow-hidden flex flex-col">
          <div className="flex-1 m-4 overflow-auto">
            <ReferralsTable />
          </div>
        </div>
      </div>
    </div>
  )
}
