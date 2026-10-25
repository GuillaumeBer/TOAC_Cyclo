// Titre de section des vues de la page Sorties : repère, grand titre condensé et texte d'introduction.
export default function SectionTitle({ icon: Icon, eyebrow, title, text }) {
  return (
    <div className="mb-8">
      <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0077b6] mb-3">
        <span className="h-px w-10 bg-[#0077b6]" aria-hidden="true" /> {eyebrow}
      </p>
      <h2 className="display text-4xl md:text-5xl font-bold text-[#00205b] flex items-center gap-3">
        <Icon className="w-8 h-8 text-[#00b5e2]" aria-hidden="true" /> {title}
      </h2>
      {text && <p className="mt-3 text-gray-600 max-w-2xl">{text}</p>}
    </div>
  )
}
