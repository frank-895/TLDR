import { useState } from 'react'
import { postJson } from '../lib/apiClient'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function Home() {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [isQuizOpen, setIsQuizOpen] = useState(false)
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedIdx, setSelectedIdx] = useState(null)
  const [answers, setAnswers] = useState([])
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

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

  function startQuiz() {
    if (!result?.quiz?.length) return
    setIsQuizOpen(true)
    setQuizIndex(0)
    setSelectedIdx(null)
    setAnswers([])
    setShowResults(false)
    setScore(0)
  }

  function handleCloseQuiz() {
    setIsQuizOpen(false)
  }

  function handleNext() {
    if (selectedIdx === null) return
    const q = result.quiz[quizIndex]
    const nextAnswers = [...answers, selectedIdx]
    const isLast = quizIndex === result.quiz.length - 1
    if (isLast) {
      // compute score
      const total = result.quiz.length
      let correct = 0
      nextAnswers.forEach((ans, i) => {
        const opts = result.quiz[i].options || []
        if (opts[ans]?.is_correct) correct += 1
      })
      setScore(correct)
      setAnswers(nextAnswers)
      setShowResults(true)
    } else {
      setAnswers(nextAnswers)
      setQuizIndex((i) => i + 1)
      setSelectedIdx(null)
    }
  }

  function handleRestart() {
    setQuizIndex(0)
    setSelectedIdx(null)
    setAnswers([])
    setShowResults(false)
    setScore(0)
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
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 font-medium text-white shadow-lg shadow-emerald-900/20 transition hover:bg-emerald-500 disabled:opacity-50"
        >
          {loading ? 'Reading for you...' : 'TLDR it!'}
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
            {result?.quiz?.length > 0 && (
              <section className="mt-6 border-y border-white/10 py-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-100">Ready to test yourself?</h4>
                    <p className="mt-1 text-sm text-gray-300">Test your understanding of the text with a short multiple-choice quiz.</p>
                  </div>
                  <button
                    type="button"
                    onClick={startQuiz}
                    className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-emerald-500"
                  >
                    Quiz me!
                  </button>
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {isQuizOpen && result?.quiz?.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={handleCloseQuiz} />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-white/10 bg-[#0b0f19] p-6 shadow-2xl">
            {!showResults ? (
              <div>
                <div className="mb-4 text-sm text-gray-400">Question {quizIndex + 1} of {result.quiz.length}</div>
                <h4 className="text-lg font-semibold text-gray-100">{result.quiz[quizIndex]?.question}</h4>
                <div className="mt-4 grid gap-2">
                  {(result.quiz[quizIndex]?.options || []).map((opt, i) => (
                    <label key={i} className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition ${selectedIdx === i ? 'border-violet-400 bg-violet-500/10' : 'border-white/10 hover:bg-white/5'}`}>
                      <input
                        type="radio"
                        name={`q-${quizIndex}`}
                        className="h-4 w-4"
                        checked={selectedIdx === i}
                        onChange={() => setSelectedIdx(i)}
                      />
                      <span className="text-gray-100">{opt.label}</span>
                    </label>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button type="button" onClick={handleCloseQuiz} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Close</button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={selectedIdx === null}
                    className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-emerald-500 disabled:opacity-50"
                  >
                    {quizIndex === result.quiz.length - 1 ? 'Finish' : 'Next'}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-lg font-semibold text-gray-100">Your results</h4>
                <p className="mt-1 text-gray-300">Score: {score} / {result.quiz.length}</p>
                <div className="mt-5 grid gap-3">
                  {result.quiz.map((q, qi) => {
                    const user = answers[qi]
                    const correctIdx = (q.options || []).findIndex(o => o.is_correct)
                    const isCorrect = user === correctIdx
                    return (
                      <div key={qi} className={`rounded-lg border p-3 ${isCorrect ? 'border-emerald-500/40 bg-emerald-500/10' : 'border-red-500/30 bg-red-500/10'}`}>
                        <div className="font-medium text-gray-100">{q.question}</div>
                        <div className="mt-2 text-sm text-gray-300">
                          Your answer: <span className="font-medium">{q.options?.[user]?.label ?? '—'}</span>
                        </div>
                        <div className="text-sm text-gray-300">
                          Correct answer: <span className="font-medium">{q.options?.[correctIdx]?.label ?? '—'}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <button type="button" onClick={handleCloseQuiz} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Close</button>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={handleRestart} className="rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-200 hover:bg-white/5">Retry</button>
                    <button type="button" onClick={() => { handleRestart(); setIsQuizOpen(false) }} className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-lg hover:bg-emerald-500">Done</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


