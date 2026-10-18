import Link from 'next/link'

// En-tête bleu commun aux pages intérieures : fil d'Ariane, badge optionnel, titre et introduction.
// `breadcrumb` : étapes après « Accueil », la dernière (sans href) étant la page courante.
// `children` : contenu supplémentaire dans le bandeau (boutons, onglets…).
export default function PageHeader({ title, intro, breadcrumb = [], badge, children }) {
  const trail = [{ name: 'Accueil', href: '/' }, ...breadcrumb]

  return (
    <div className="bg-[#00205b] text-white pt-28 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 translate-x-1/3 -translate-y-1/3 pointer-events-none" aria-hidden="true"></div>
      <div className="max-w-[76rem] mx-auto relative z-10 flex flex-col items-start">
        <nav aria-label="Fil d'Ariane" className="mb-8 text-sm">
          <ol className="flex flex-wrap items-center gap-2">
            {trail.map((item, i) => {
              const current = i === trail.length - 1
              return (
                <li key={item.name} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/30" aria-hidden="true">/</span>}
                  {current ? (
                    <span aria-current="page" className="text-gray-300">{item.name}</span>
                  ) : (
                    <Link href={item.href} className="text-[#00b5e2] hover:text-white transition-colors">{item.name}</Link>
                  )}
                </li>
              )
            })}
          </ol>
        </nav>
        {badge}
        <h1 className="text-4xl md:text-6xl font-bold mb-4">{title}</h1>
        {intro && <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">{intro}</p>}
        {children}
      </div>
    </div>
  )
}
