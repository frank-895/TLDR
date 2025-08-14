import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
export default function App() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="glow -left-16 -top-16" />
      <div className="glow bottom-10 right-0" />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <Header />

        <main className="flex-1">
          <div className="mx-auto max-w-5xl px-6 py-28">
            <section className="relative mb-32 grid items-center md:grid-cols-2 md:gap-16">
              <div className="reveal-up relative z-10">
                <h2 className="text-5xl font-extrabold tracking-tight text-white md:text-6xl">Too long, didn't read</h2>
                <p className="mt-6 text-xl text-gray-300">Paste text, get a summary and an interactive quiz.</p>
              </div>
              {/* Blobs removed to avoid GPU-intensive animation */}
            </section>
            <Home />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  )
}
