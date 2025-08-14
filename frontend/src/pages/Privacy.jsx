export default function Privacy() {
	return (
		<div className="mx-auto max-w-3xl px-6 py-16">
			<h1 className="text-3xl font-bold tracking-tight text-white">Privacy Policy</h1>
			<p className="mt-2 text-sm text-gray-400">Last updated: {new Date().toLocaleDateString()}</p>

			<section className="mt-8 space-y-4 text-gray-200">
				<p>
					This Privacy Policy explains how we handle your information when you use the TLDR service
					("Service"). We are committed to protecting your privacy and complying with the EU General
					Data Protection Regulation (GDPR).
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Summary</h2>
				<ul className="list-disc pl-5">
					<li>We do not store your input or generated content on our servers.</li>
					<li>Your input text is sent to OpenAI to generate summaries and quizzes.</li>
					<li>Do not use this Service for confidential, personal, or sensitive information.</li>
					<li>We use transient processing only and do not build user profiles.</li>
				</ul>

				<h2 className="mt-6 text-xl font-semibold text-white">Data Controller</h2>
				<p>
					For GDPR purposes, the data controller is the operator of this Service. If you have
					questions or requests, contact the maintainer via the repository contact details.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">What Data We Process</h2>
				<p>
					When you submit text, we process that text to produce a summary and a quiz. We do not
					save this data. It is transmitted to OpenAI for processing and may be retained by OpenAI
					in accordance with their policies.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Legal Basis (GDPR)</h2>
				<p>
					We process your input on the basis of your consent (GDPR Art. 6(1)(a)). By using the
					Service and clicking submit, you consent to the processing of your text for the purpose
					of generating a summary and quiz.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Data Storage and Retention</h2>
				<p>
					We do not store your input or outputs. Processing is transient in memory. However,
					OpenAI may retain logs or content as described in their documentation and policies.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Data Transfers</h2>
				<p>
					Your data is transferred to OpenAI for processing, which may involve transfers outside
					of your jurisdiction. OpenAI states it implements appropriate safeguards; please review
					their privacy documentation.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Your Rights</h2>
				<p>
					Under GDPR, you may have rights including access, rectification, erasure, restriction,
					and objection. Because we do not store your data, some rights (e.g., access/erasure) may
					not be technically feasible beyond ceasing use of the Service.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Security</h2>
				<p>
					We apply reasonable technical measures to protect transient processing. Do not submit
					information you consider confidential or sensitive.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Third Parties</h2>
				<p>
					Processing relies on OpenAI. Use of the Service is also subject to OpenAI's terms and
					privacy policy.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Changes</h2>
				<p>
					We may update this policy from time to time. Continued use of the Service constitutes
					acceptance of the updated policy.
				</p>

				<h2 className="mt-6 text-xl font-semibold text-white">Contact</h2>
				<p>
					For privacy-related inquiries, please open an issue in the project repository or contact
					the maintainer listed there.
				</p>
			</section>
		</div>
	)
}
