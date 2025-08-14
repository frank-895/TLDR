import Home from './pages/Home.jsx'
export default function App() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="border-b bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4">
          <h1 className="text-xl font-semibold tracking-tight">TL;DR</h1>
          <p className="text-sm text-gray-500">Summarizer + Quiz</p>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <Home />
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4 text-xs text-gray-500">
          © {new Date().getFullYear()} TL;DR
        </div>
      </footer>
    </div>
  )
}
