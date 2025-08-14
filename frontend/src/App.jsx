import Home from './pages/Home.jsx'
export default function App() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="glow -left-16 -top-16" />
      <div className="glow bottom-10 right-0" />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <header className="border-b border-white/10 bg-black/40 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold tracking-tight">TLDR</h1>
              <a
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-gray-200 transition hover:border-white/20 hover:bg-white/10"
                href="https://github.com/frank-895/TLDR"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <div className="mx-auto max-w-4xl px-4 py-10">
            <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold">Turn long text into instant insight</h2>
              <p className="mt-2 text-gray-400">Paste text, get a summary and an interactive quiz. Clean, fast, privacy-friendly.</p>
            </div>
            <Home />
          </div>
        </main>

        <footer className="border-t border-white/10 bg-black/40 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 py-4 text-xs text-gray-400">
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
                href="https://github.com/frank-895/TLDR"
                target="_blank"
                rel="noreferrer"
              >
                github.com/frank-895/TLDR
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
