export default function PlanCard() {
  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-4 sm:space-y-0">
        <div className="flex-1">
          <div className="inline-block bg-white bg-opacity-20 text-xs font-medium px-2 py-1 rounded mb-2">
            CURRENT PLAN
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mb-2">Researcher</h2>
          <div className="flex items-center text-sm mb-4">
            <span>API Usage</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>0/1,000 Credits</span>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '0%' }}></div>
            </div>
          </div>
          <div className="text-sm">Plan</div>
        </div>
        <div className="text-left sm:text-right">
          <div className="flex items-center text-sm mb-4">
            <span>Pay as you go</span>
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <button className="bg-white text-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 w-full sm:w-auto">
            Manage Plan
          </button>
        </div>
      </div>
    </div>
  );
}
