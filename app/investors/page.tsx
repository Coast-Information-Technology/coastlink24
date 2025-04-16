import Image from "next/image";
import Link from "next/link";

export default function InvestorPage() {
  return (
    <main className="text-gray-700">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center bg-no-repeat text-white py-32 px-6 h-[80vj] flex justify-center items-center"
        style={{
          backgroundImage: `url('/investors.jpg')`,
          backgroundPosition: "top center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="relative text-center z-10 max-w-[70vw]">
          <h1 className="text-4xl font-bold mb-4 text-primary">
            Put Your Capital to Work in Africa{"'"}s Growing Digital Lending
            Ecosystem.
          </h1>
          <p className="text-lg pt-4">
            Coast Link24 connects capital providers like you with vetted lenders
            who serve thousands of creditworthy borrowers across emerging
            markets — without requiring you to manage operations, chase
            repayments, or build tech.
          </p>
        </div>
      </section>

      {/* Why Invest Section */}
      <section className="py-20 px-6 md:px-28 space-y-16 bg-white">
        <h2 className="text-4xl font-bold text-center text-black mb-4">
          Why Invest Through Coast Link24?
        </h2>
        <p className="text-center text-lg text-gray-600 max-w-3xl mx-auto">
          Grow your capital by backing regulated lenders with real-time
          visibility and zero operational stress.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title:
                "Access the Lending Economy Without Building a Lending Business",
              description:
                "You don’t need licenses, staff, or tech infrastructure. Coast Link24 handles all operations, while your capital is assigned to trusted, licensed lenders who operate via our automated system.",
            },
            {
              title: "Fund High-Growth, Regulated Lenders",
              description:
                "We only match you with operational lenders who:\n\n- Are licensed and compliant\n- Have a proven repayment history\n- Use automated scoring and loan logic\n- Operate via our infrastructure for transparency",
            },
            {
              title: "Track Everything — Real-Time ROI",
              description:
                "Get a live dashboard showing:\n\n- Disbursed capital\n- Repayment progress\n- Portfolio health\n- Profit earned\n- Risk-level breakdown",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition duration-300 ease-in-out space-y-4"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="whitespace-pre-line text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-50 py-24 space-y-20 relative overflow-hidden">
        {/* Section Heading */}
        <div className="text-center space-y-4 px-6">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="max-w-xl mx-auto text-gray-500">
            Start earning passively in three simple steps. Coast Link24 makes
            investing in lending easy and transparent.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative z-10 grid md:grid-cols-3 gap-12 px-6 md:px-20">
          {[
            {
              step: "1. Fund Your Wallet",
              desc: "Deposit capital into your investment account (secured via our escrow or wallet partners).",
              icon: "/icons/top-up.png",
            },
            {
              step: "2. Choose a Strategy",
              desc: "Pick from:\n- Fixed income returns\n- Risk-based reward tiers\n- Custom allocation (choose lenders or automated distribution)",
              icon: "/icons/exchange-rate1.png",
            },
            {
              step: "3. Earn Passively",
              desc: "Funds are distributed into live loans. You get:\n- Principal + interest repayments\n- Monthly or quarterly reports\n- Auto-withdraw or reinvest options",
              icon: "/icons/direction.png",
            },
          ].map((step, i) => (
            <div
              key={i}
              className="relative bg-white p-8 rounded-xl shadow-lg flex flex-col items-center text-center space-y-4"
            >
              <Image
                src={step.icon}
                alt={step.step}
                className="w-16 h-16"
                height={64}
                width={64}
              />
              <h4 className="text-lg font-bold text-blue-600">{step.step}</h4>
              <p className="whitespace-pre-line text-sm text-gray-600">
                {step.desc}
              </p>

              {/* Arrow to next box (except last) */}
              {i < 2 && (
                <div className="hidden md:block absolute right-[-40px] top-1/2 transform -translate-y-1/2">
                  <div className="w-10 h-10 border-t-4 border-r-4 border-blue-400 transform rotate-45"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Optional Horizontal Line Behind Steps */}
        <div className="hidden md:block absolute top-[55%] left-24 right-24 h-1 bg-blue-100 z-0"></div>

        {/* CTA */}
        <div className="text-center mt-10 px-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Ready to start investing?
          </h3>
          <button className="bg-blue-600 text-white p-6 rounded-full hover:bg-blue-700 transition">
            <Link href="/auth/register">Join Now</Link>
          </button>
        </div>
      </section>

      {/* Who Should Invest */}
      <section className="py-24 px-6 md:px-20 bg-gray-900 text-center space-y-8">
        <h2 className="text-3xl font-bold text-white">Who Should Invest?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Coast Link24 is ideal for individuals and institutions looking to grow
          their capital through the lending economy.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {[
            "Angel Investors",
            "High Net-Worth Individuals (HNIs)",
            "Private Credit Funds",
            "Diaspora Investors",
            "DeFi Protocols",
          ].map((type, i) => (
            <div
              key={i}
              className="flex items-start space-x-3 bg-gray-300 p-4 rounded-lg shadow-sm"
            >
              <span className="inline-block w-3 h-3 mt-2 bg-blue-600 rounded-full"></span>
              <p className="text-gray-700 font-medium">{type}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety & Transparency */}
      <section className="bg-white py-20">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">
          Safety & Transparency First
        </h2>
        <div className="grid md:grid-cols-2 gap-8 px-28">
          {[
            [
              "KYC/AML Verification",
              "Every lender onboarded is verified and monitored.",
              "/icons/kyc.png",
            ],
            [
              "Capital Controls",
              "You control how much is exposed and where it's used.",
              "/icons/equity.png",
            ],
            [
              "Analytics",
              "Deep visibility into loan activity, risk scores, repayment behavior.",
              "/icons/analysis.png",
            ],
            [
              "Legal Protections",
              "Investment agreements governed by clear contracts and shared risk.",
              "/icons/policy.png",
            ],
          ].map(([title, desc, img], i) => (
            <div key={i} className="p-10 bg-gray-50 rounded-lg shadow">
              <Image src={img} alt="" height={80} width={80} />
              <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
              <p className="text-sm text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sample Returns */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Sample Return Ranges
        </h2>
        <p className="text-gray-300 mb-6">
          Returns vary based on borrower pool, risk appetite, and capital size.
        </p>
        <Image
          src="/ROI.avif"
          alt="Sample Return Graph"
          width={600}
          height={300}
          className="mx-auto"
        />
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20 text-white text-center">
        <h2 className="text-3xl font-bold mb-6 px-28">
          Let Coast Link24 turn your idle capital into recurring profit — with
          real-world impact.
        </h2>
        <div className="space-x-4 px-28">
          <Link
            href="/pitchdeck.pdf"
            className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-blue-100"
          >
            Download Investor Pitch Deck
          </Link>
          <Link
            href="/demo"
            className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-blue-100"
          >
            Book an Intro Call
          </Link>
          <Link
            href="/lenders"
            className="bg-white text-blue-600 px-6 py-3 rounded hover:bg-blue-100"
          >
            View Available Lender Profiles
          </Link>
        </div>
      </section>
    </main>
  );
}
