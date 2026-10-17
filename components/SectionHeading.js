// En-tête de section commun : repère numéroté, grand titre condensé, texte et action optionnelle.
export default function SectionHeading({ eyebrow, title, text, action, light = false }) {
  return (
    <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#00b5e2] mb-4">
            <span className="h-px w-10 bg-[#00b5e2]" aria-hidden="true" />
            {eyebrow}
          </p>
        )}
        <h2 className={`display text-4xl sm:text-5xl lg:text-6xl font-bold ${light ? 'text-white' : 'text-[#00205b]'}`}>
          {title}
        </h2>
        {text && (
          <p className={`mt-5 text-lg leading-relaxed ${light ? 'text-gray-300' : 'text-gray-600'}`}>{text}</p>
        )}
      </div>
      {action}
    </div>
  )
}
