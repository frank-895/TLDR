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
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-medium">Input Text</label>
        <textarea
          className="w-full rounded-md border p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          rows={6}
          placeholder="Paste or type text to summarize..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading || text.trim().length === 0}
          className="inline-flex items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? 'Processing…' : 'Run Pipeline'}
        </button>
      </form>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4">
          <div className="rounded-lg border bg-white p-4">
            <h3 className="text-lg font-semibold">Summary</h3>
            <p className="mt-2 whitespace-pre-wrap text-gray-700">{result.summary}</p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <h3 className="text-lg font-semibold">Quiz</h3>
            <ul className="mt-2 list-disc space-y-3 pl-6">
              {result.questions?.map((q, idx) => (
                <li key={idx} className="space-y-1">
                  <div className="font-medium">{q.question}</div>
                  <ul className="list-disc pl-6 text-sm text-gray-700">
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


