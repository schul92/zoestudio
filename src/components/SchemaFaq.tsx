type Question = { name?: string; acceptedAnswer?: { text?: string } }

/**
 * Renders a page's FAQPage JSON-LD as visible Q&A. Google requires FAQ markup to match content
 * users can see; reading straight from the schema object keeps the two identical by construction.
 */
export default function SchemaFaq({ schema, locale }: { schema: { mainEntity?: Question[] }; locale?: string }) {
  const items = (schema?.mainEntity ?? []).filter((q) => q?.name && q.acceptedAnswer?.text)
  if (!items.length) return null
  const ko = locale === 'ko'
  return (
    <section className="py-20" aria-label={ko ? '자주 묻는 질문' : 'Frequently asked questions'}>
      <div className="container mx-auto max-w-3xl px-6">
        <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">{ko ? '자주 묻는 질문' : 'Frequently asked questions'}</h2>
        <div className="divide-y divide-white/10">
          {items.map((q) => (
            <div key={q.name} className="py-6">
              <h3 className="text-lg font-semibold md:text-xl">{q.name}</h3>
              <p className="mt-3 leading-relaxed text-gray-300">{q.acceptedAnswer!.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
