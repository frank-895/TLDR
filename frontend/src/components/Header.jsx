export default function Header() {
	return (
		<header className="border-b border-white/10 bg-black/40 backdrop-blur">
			<div className="mx-auto max-w-5xl px-6 py-6">
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold tracking-tight">TLDR</h1>
					<a
						className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-200 transition hover:border-white/20 hover:bg-white/10"
						href="https://github.com/frank-895/TLDR"
						target="_blank"
						rel="noreferrer"
					>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
							<path d="M12 .5C5.73.5.77 5.46.77 11.73c0 4.93 3.19 9.11 7.62 10.59.56.1.77-.24.77-.54 0-.27-.01-1.16-.02-2.1-3.1.67-3.76-1.32-3.76-1.32-.51-1.28-1.25-1.62-1.25-1.62-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1.01 1.73 2.64 1.23 3.28.94.1-.73.39-1.23.7-1.52-2.47-.28-5.06-1.24-5.06-5.52 0-1.22.43-2.22 1.15-3-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.08 1.15a10.7 10.7 0 0 1 2.8-.38c.95 0 1.9.13 2.8.38 2.14-1.45 3.08-1.15 3.08-1.15.61 1.53.23 2.66.11 2.94.72.78 1.15 1.78 1.15 3 0 4.29-2.6 5.24-5.07 5.52.4.35.75 1.04.75 2.1 0 1.52-.01 2.74-.01 3.11 0 .3.2.65.78.54A10.99 10.99 0 0 0 23.23 11.73C23.23 5.46 18.27.5 12 .5z"/>
						</svg>
						GitHub
					</a>
				</div>
			</div>
		</header>
	)
}
