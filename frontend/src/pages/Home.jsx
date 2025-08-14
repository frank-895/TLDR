import { useState } from 'react'
import { postJson } from '../lib/apiClient'

export default function Home() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const data = await postJson('/v1/pipeline', { text })
      setResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-10">
      <form onSubmit={handleSubmit} className="space-y-3" id="input">
        <label className="block text-sm font-medium text-gray-300">Input Text</label>
        <div className="group rounded-xl border border-white/10 bg-white/5 p-2 shadow-sm transition focus-within:border-white/20 focus-within:bg-white/10 reveal-up">
          <textarea
            className="w-full resize-y rounded-lg bg-transparent p-3 text-gray-100 outline-none placeholder:text-gray-500"
            rows={8}
            placeholder="Paste or type text to summarize..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={loading || text.trim().length === 0}
          className="btn-sheen inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-violet-900/20 transition hover:brightness-110 disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Run Pipeline'}
        </button>
      </form>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="grid gap-8 md:grid-cols-2">
          <div className="reveal-fade rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold">Summary</h3>
            <p className="mt-2 whitespace-pre-wrap text-gray-200">{result.summary}</p>
          </div>

          <div className="reveal-fade rounded-2xl border border-white/10 bg-white/5 p-4">
            <h3 className="text-lg font-semibold">Quiz</h3>
            <ul className="mt-2 grid gap-3">
              {result.questions?.map((q, idx) => (
                <li key={idx} className="rounded-lg border border-white/10 bg-black/20 p-3 reveal-up">
                  <div className="font-medium text-gray-100">{q.question}</div>
                  <ul className="mt-1 grid gap-1 pl-4 text-sm text-gray-300">
                    {q.choices?.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}


