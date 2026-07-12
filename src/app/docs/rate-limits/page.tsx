export default function RateLimitsPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
        Rate Limits
      </h1>
      <p className="text-zinc-400 text-lg mb-8">Understanding rate limits and quotas for your plan.</p>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-zinc-800">
              <th className="text-left py-4 px-4 text-white">Plan</th>
              <th className="text-left py-4 px-4 text-white">Pages / month</th>
              <th className="text-left py-4 px-4 text-white">API Calls / min</th>
              <th className="text-left py-4 px-4 text-white">Max File Size</th>
            </tr>
          </thead>
          <tbody className="text-zinc-400">
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-4 text-white">Free</td>
              <td className="py-4 px-4">100</td>
              <td className="py-4 px-4">10</td>
              <td className="py-4 px-4">10 MB</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-4 text-white">Pro</td>
              <td className="py-4 px-4">10,000</td>
              <td className="py-4 px-4">100</td>
              <td className="py-4 px-4">50 MB</td>
            </tr>
            <tr className="border-b border-zinc-800/50">
              <td className="py-4 px-4 text-white">Business</td>
              <td className="py-4 px-4">100,000</td>
              <td className="py-4 px-4">1,000</td>
              <td className="py-4 px-4">200 MB</td>
            </tr>
            <tr>
              <td className="py-4 px-4 text-white">Enterprise</td>
              <td className="py-4 px-4">Unlimited</td>
              <td className="py-4 px-4">Custom</td>
              <td className="py-4 px-4">Unlimited</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
