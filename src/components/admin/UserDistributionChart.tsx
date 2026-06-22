import { motion } from 'framer-motion'

interface UserDistributionChartProps {
  activeUsers: number
  inactiveUsers: number
  totalUsers: number
}

const UserDistributionChart = ({ activeUsers, inactiveUsers, totalUsers }: UserDistributionChartProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 h-fit"
    >
      <h2 className="text-lg font-bold text-neutral-900 mb-6">User Distribution</h2>
      
      <div className="space-y-8">
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-100">
                Active
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-green-600">
                {totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-green-50">
            <div
              style={{ width: `${totalUsers > 0 ? (activeUsers / totalUsers) * 100 : 0}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 transition-all duration-1000 ease-out"
            ></div>
          </div>
          <p className="text-xs text-neutral-500 mt-1">{activeUsers} users currently active</p>
        </div>

        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-red-600 bg-red-100">
                Inactive
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-red-600">
                {totalUsers > 0 ? Math.round((inactiveUsers / totalUsers) * 100) : 0}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-red-50">
            <div
              style={{ width: `${totalUsers > 0 ? (inactiveUsers / totalUsers) * 100 : 0}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500 transition-all duration-1000 ease-out"
            ></div>
          </div>
          <p className="text-xs text-neutral-500 mt-1">{inactiveUsers} users currently inactive</p>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-100">
          <h3 className="text-sm font-medium text-neutral-900 mb-4">System Health</h3>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-neutral-500">Database Status</span>
            <span className="flex items-center text-green-600 font-medium">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Operational
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">API Latency</span>
            <span className="text-neutral-900 font-medium">24ms</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default UserDistributionChart