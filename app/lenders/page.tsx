import Image from "next/image";
import Link from "next/link";

export default function LendersPage() {
  return (
    <main className="text-gray-700">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-32 px-6 h-screen flex justify-center items-center"
        style={{ backgroundImage: `url('/lenders.avif')` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
        <div className="relative max-w-4xl mx-auto text-center z-10 lg:pt-16">
          <h1 className="text-[2.5rem] font-bold mb-4 text-primary">
            Launch, Scale, and Automate Your Lending Operations — Without
            Writing a Single Line of Code.
          </h1>
          <p className="text-lg mb-6">
            Whether you’re building a digital micro-lending business or managing
            thousands of borrowers under a regulated institution, Coast Link24
            gives you the tools, speed, and automation to win.
          </p>
          <div>
            <div className="space-x-4 py-8">
              <Link
                href="/pricing"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                View Pricing
              </Link>
              <Link
                href="/demo"
                className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-blue-600"
              >
                Book a Demo
              </Link>
            </div>
            <Link
              href="/pitchdeck.pdf"
              className="underline hover:text-blue-500"
            >
              Download Lender Pitch Deck
            </Link>
          </div>
        </div>
      </section>

      {/* Choose Your Lender Type */}
      <section className="py-20 bg-white px-24 space-y-24">
        {/* Institutional Lenders */}
        <div className="md:flex items-center gap-10">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Institutional Lenders
            </h2>
            <p>Designed for licensed or structured organizations like:</p>
            <ul className="list-disc list-inside">
              <li>MFIs, Microfinance Banks, Fintechs, SACCOs</li>
            </ul>
            <p className="text-gray-600">
              Set up branded lending operations, integrate borrower access,
              control KYC, loan logic, and risk — all on your terms.
            </p>
            <ul className="mt-4 list-disc list-inside space-y-1">
              <li>Full web dashboard & analytics</li>
              <li>Custom USSD builder</li>
              <li>KYC & credit integrations</li>
              <li>API access for custom apps</li>
            </ul>
            <p className="text-sm text-gray-500 mt-2">
              Ideal for: MFBs, commercial lenders, BNPL startups, etc.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/lenders-dashboard.png"
              alt="Institutional Lenders"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Capital-Backed Investors */}
        <div className="md:flex items-center gap-10 md:flex-row-reverse">
          <div className="md:w-1/2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Capital-Backed Investors
            </h2>
            <p>
              Designed for angel investors, credit funds, DeFi backers, and
              others with capital but no interest in day-to-day ops.
            </p>
            <ul className="mt-2 list-disc list-inside space-y-1">
              <li>Fund high-performing lenders directly</li>
              <li>Track real-time usage & performance</li>
              <li>Risk-adjusted return insights</li>
              <li>Transparent, compliance-reviewed partners</li>
            </ul>
            <p className="text-sm text-gray-500">
              Ideal for: Family offices, private investors, DeFi credit pools.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image
              src="/investor-portfolio.png"
              alt="Capital-Backed Investors"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Unified Platform */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            One Platform. Two Powerful Paths.
          </h2>
          <p className="text-lg text-gray-600">
            Whether you’re operational or capital-backed — you benefit from
            Coast Link24’s all-in-one infrastructure.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid gap-8 md:grid-cols-2">
        {[
          [
            "Automated Lending Engine",
            "From onboarding to disbursement and repayment — we handle the flow.",
          ],
          [
            "Multi-channel Access",
            "USSD, Web, and Mobile-ready infrastructure out of the box.",
          ],
          [
            "Built-in Scoring & Risk Engine",
            "Make fast, smart decisions with real-time analytics.",
          ],
          ["Data Ownership", "Export your data, plug into your systems."],
          ["Audit & Compliance", "Regulatory-readiness baked in from day one."],
        ].map(([title, desc], i) => (
          <div key={i} className="p-6 bg-white rounded-lg shadow">
            <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-600">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
