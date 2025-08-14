export default function Footer() {
	return (
		<footer className="border-t border-white/10 bg-black/40 backdrop-blur">
			<div className="mx-auto max-w-5xl px-6 py-5 text-xs text-gray-400">
				<div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<a
							className="text-gray-300 underline-offset-4 hover:text-white hover:underline"
							href="https://github.com/frank-895/TLDR/blob/develop/LICENSE"
							target="_blank"
							rel="noreferrer"
						>
							MIT License
						</a>
						<span className="mx-2 hidden sm:inline">•</span>
						<span className="text-gray-500">Open source</span>
					</div>
					<a
						className="text-gray-300 underline-offset-4 hover:text-white hover:underline"
						href="/privacy"
					>
						Privacy Policy
					</a>
				</div>
			</div>
		</footer>
	)
}
