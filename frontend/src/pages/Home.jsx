import { useState } from 'react'
import { postJson } from '../lib/apiClient'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

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
      <h3 className="mb-3 text-lg font-medium text-gray-300">Input Text</h3>
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
        <div className="space-y-6">
          <div>
            <h3 className="mb-3 text-lg font-medium text-gray-300">Summary</h3>
            <div className="prose prose-invert prose-base sm:prose-lg max-w-none reveal-fade rounded-2xl border border-white/10 bg-white/5 px-6 pt-4 pb-6 lg:px-8 lg:pt-5 lg:pb-8">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{result.summary || ''}</ReactMarkdown>
            </div>
          </div>

          <div className="reveal-fade rounded-2xl border border-white/10 bg-white/5 p-5">
            <h3 className="mb-2 text-lg font-semibold">Quiz</h3>
            <ul className="mt-3 grid gap-3">
              {result.questions?.map((q, idx) => (
                <li key={idx} className="rounded-lg border border-white/10 bg-black/20 p-3 reveal-up">
                  <div className="font-medium text-gray-100">{q.question}</div>
                  <ul className="mt-1 grid gap-1 pl-4 text-sm text-gray-300 list-disc">
                    {q.choices?.map((c, i) => (
                      <li key={i}>{c}</li>
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


