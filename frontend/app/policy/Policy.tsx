import { styles } from "../styles/style";

const Policy = () => {
  return (
    <div className="text-black dark:text-white min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-justify ">
      <div className="w-[92%] sm:w-[88%] md:w-[85%] lg:w-[80%] xl:w-[75%] m-auto py-4 sm:py-6 md:py-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1
            className={`${styles.title} !text-center mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl`}
          >
            Terms and Conditions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto px-4 sm:px-6">
            Please read these terms and conditions carefully before using our
            Learning Management System platform.
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-3 sm:mt-4 rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
          {/* Introduction */}
          <div className="mb-6 sm:mb-8 p-4 sm:p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg sm:rounded-xl border-l-4 border-blue-500">
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-2 sm:mb-3">
              Agreement to Terms
            </h2>
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              By accessing and using the LMS platform, you acknowledge that you
              have read, understood, and agree to be bound by these Terms and
              Conditions. These terms constitute a legally binding agreement
              between you and LMS regarding your use of our educational
              services.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-6 sm:space-y-8">
            {/* User Registration */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4 flex items-start sm:items-center">
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0">
                  1
                </span>
                <span className="leading-tight">
                  User Registration and Account Management
                </span>
              </h3>
              <div className="md:ml-8 sm:ml-11 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Users must provide accurate, complete, and current information
                  during the registration process. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 ml-2 sm:ml-4">
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your account information remains up-to-date</li>
                </ul>
              </div>
            </div>

            {/* Course Access */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4 flex items-start sm:items-center">
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0">
                  2
                </span>
                <span className="leading-tight">
                  Course Access and Usage Rights
                </span>
              </h3>
              <div className="md:ml-8 sm:ml-11 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  Upon successful enrollment and payment, users gain access to
                  course materials for the specified duration. Usage rights
                  include:
                </p>
                <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400 ml-2 sm:ml-4">
                  <li>Personal, non-commercial use of course materials</li>
                  <li>
                    Access to course content within the specified timeframe
                  </li>
                  <li>Participation in course discussions and assessments</li>
                  <li>
                    Download of course materials for offline study (where
                    permitted)
                  </li>
                </ul>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 sm:p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
                    <strong>Restriction:</strong> Course materials may not be
                    shared, copied, distributed, or used for commercial purposes
                    without explicit written permission.
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg sm:rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-3 sm:mb-4 flex items-start sm:items-center">
                <span className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 flex-shrink-0 mt-0.5 sm:mt-0">
                  3
                </span>
                <span className="leading-tight">
                  Payment Terms and Refund Policy
                </span>
              </h3>
              <div className="md:ml-8 sm:ml-11 space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                  All course fees must be paid in full before accessing course
                  content. Our refund policy is designed to protect both users
                  and our educational standards:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2 text-sm sm:text-base">
                      Eligible for Refund
                    </h4>
                    <ul className="text-xs sm:text-sm text-green-700 dark:text-green-300 space-y-1">
                      <li>• Within 7 days of purchase</li>
                      <li>• Less than 20% of course accessed</li>
                      <li>• Technical issues preventing access</li>
                      <li>• Course cancellation by LMS</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-3 sm:p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2 text-sm sm:text-base">
                      Not Eligible for Refund
                    </h4>
                    <ul className="text-xs sm:text-sm text-red-700 dark:text-red-300 space-y-1">
                      <li>• More than 20% course completion</li>
                      <li>• Violation of terms of service</li>
                      <li>• Change of mind after 7 days</li>
                      <li>• Course certificate already issued</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Intellectual Property */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  4
                </span>
                Intellectual Property Rights
              </h3>
              <div className="md:ml-11 space-y-3">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  All content on the LMS platform is protected by intellectual
                  property laws and is the exclusive property of LMS or its
                  licensors:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-4">
                  <li>Course videos, documents, and assessments</li>
                  <li>Platform design, layout, and functionality</li>
                  <li>Brand names, logos, and trademarks</li>
                  <li>
                    User-generated content (with user retention of rights)
                  </li>
                </ul>
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-400">
                  <p className="text-red-800 dark:text-red-200 text-sm">
                    <strong>Warning:</strong> Unauthorized reproduction,
                    distribution, or commercial use of any platform content is
                    strictly prohibited and may result in legal action.
                  </p>
                </div>
              </div>
            </div>

            {/* User Conduct */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  5
                </span>
                User Conduct and Community Guidelines
              </h3>
              <div className="md:ml-11 space-y-4">
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We maintain a professional and respectful learning
                  environment. Users must adhere to the following conduct
                  standards:
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 dark:text-green-200 mb-3">
                      Expected Behavior
                    </h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Respectful communication with instructors and peers
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Constructive feedback and collaboration
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Academic integrity and honest work
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">✓</span>
                        Professional language and appropriate content
                      </li>
                    </ul>
                  </div>

                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 dark:text-red-200 mb-3">
                      Prohibited Behavior
                    </h4>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-2">
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        Harassment, bullying, or discrimination
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        Spam, advertising, or off-topic content
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        Sharing copyrighted materials without permission
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2">✗</span>
                        Impersonation or false representation
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    Consequences of Violations
                  </h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Violations of community guidelines may result in warnings,
                    temporary suspension, or permanent account termination.
                    Serious violations will be reported to appropriate
                    authorities when necessary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policy;
