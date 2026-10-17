import Link from 'next/link'
import { ArrowLeft, Mail, Bike, Users, ShieldCheck, Gift, CheckCircle, ChevronDown, FileText, Shield, AlertCircle, CreditCard } from 'lucide-react'
import sorties from '@/data/sorties.json'
import adhesion from '@/data/adhesion.json'

const { season, nextSeason, campaignOpen } = adhesion

export const metadata = {
  title: 'Rejoindre le club',
  description: "Envie de rouler avec le TOAC Cyclo à Toulouse ? Essayer une sortie, comprendre l'adhésion, les tarifs et les licences FFVélo et FSGT.",
}

const MAIL_ESSAI = 'mailto:toac.cyclo@gmail.com?subject=Je%20souhaite%20essayer%20une%20sortie'

const ETAPES = [
  {
    icon: Mail,
    title: 'Écrivez-nous',
    text: "Dites-nous votre niveau et vos disponibilités : nous vous indiquons la prochaine sortie adaptée et le point de rendez-vous.",
  },
  {
    icon: Bike,
    title: 'Venez rouler avec nous',
    text: "Retrouvez le groupe, roulez à son allure et laissez-vous guider. Personne n'est laissé derrière.",
  },
  {
    icon: CheckCircle,
    title: 'Décidez tranquillement',
    text: "Si l'ambiance vous plaît, on vous explique l'adhésion et la licence. Sans pression.",
  },
]

const FAQ = [
  {
    q: "Je n'ai jamais roulé en groupe, est-ce pour moi ?",
    a: "Oui. Le TOAC Cyclo est un club de cyclotourisme : pas de compétition, on roule ensemble et on s'adapte à l'allure du groupe. Les membres veillent les uns sur les autres.",
  },
  {
    q: 'Quel vélo faut-il ?',
    a: "Un vélo de route en bon état convient pour les sorties du vendredi et du dimanche. Pour les sorties gravel, un vélo gravel ou un VTT adapté aux chemins. En cas de doute, demandez-nous.",
  },
  {
    q: 'Quel équipement est nécessaire ?',
    a: "Un casque, de l'eau, une chambre à air de rechange et de quoi la changer si possible. Le reste s'apprend en route.",
  },
  {
    q: 'Faut-il être salarié Airbus ?',
    a: "Non. Le club est ouvert à tous. Les salariés, ayants droit et retraités Airbus bénéficient d'une cotisation réduite, les extérieurs sont les bienvenus.",
  },
  {
    q: 'Quelle licence choisir ?',
    a: "Le club est affilié à la FFVélo (cyclotourisme) et à la FSGT (omnisports). Vous choisissez celle qui vous convient ; les documents sont dans la section tarifs ci-dessous.",
  },
]

const COTISATIONS_AIRBUS = [
  ['Salarié Airbus Opérations', '20€'],
  ['Ayant-droit Airbus Opérations', '20€'],
  ['Retraité Airbus Opérations', '20€'],
  ['Autre Airbus', '40€'],
]

const LICENCES = [
  {
    name: 'FFVélo',
    tag: 'Cyclotourisme',
    text: 'Pour les amateurs de randonnée pure et de voyages à vélo.',
    docs: [
      { label: `Tarifs Licences ${season}`, href: 'https://drive.google.com/file/d/1Ux-Hh2NXmt0P5FC6BOO6vCUdHppTadSz/view?usp=drive_link', main: true },
      { label: 'Guide Assurances', href: 'https://drive.google.com/file/d/1R2gDzUmdbSEw7e3Sy2Kal_aEQAW-WvvL/view?usp=sharing', icon: Shield },
      { label: "Notice d'information", href: 'https://drive.google.com/file/d/1zKx-XCw90qtjslxFdxp2mSF4rBWX_KVS/view?usp=sharing' },
    ],
  },
  {
    name: 'FSGT',
    tag: 'Omnisports',
    text: 'Une licence multisports accessible et solidaire.',
    docs: [
      { label: `Demande de Licence ${season}`, href: 'https://drive.google.com/file/d/1uN_LoOmrDZa3_KfuXBaIK226zK3RuXqN/view?usp=sharing', main: true },
      { label: 'Guide Assurances', href: 'https://drive.google.com/file/d/1yv0lbDVUL8Gv1TKzMHc4sOtpJ36_LCqh/view?usp=sharing', icon: Shield },
      { label: 'Notice Assurance IA', href: 'https://drive.google.com/file/d/1PgY_HNQrEMe8y3hrQGue2zkJs4wJJO-Q/view?usp=sharing' },
    ],
  },
]

export default function RejoindrePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link href="/" className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour à l'accueil
          </Link>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Rejoindre le club</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Envie de rouler en bonne compagnie à Toulouse ? Venez faire une sortie avec nous avant de vous décider.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={MAIL_ESSAI}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors text-lg"
            >
              <Mail className="w-5 h-5" /> Demander une sortie d'essai
            </a>
            <a
              href="#adhesion"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/60 hover:border-white hover:bg-white/10 font-bold rounded-sm transition-colors text-lg"
            >
              Adhésion et tarifs
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Étapes */}
        <section>
          <h2 className="text-3xl font-bold text-[#00205b] mb-6">Comment ça se passe ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ETAPES.map((etape, i) => (
              <div key={etape.title} className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#00b5e2]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-[#00205b] text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <etape.icon className="w-5 h-5 text-[#00b5e2]" aria-hidden="true" />
                </div>
                <h3 className="font-bold text-[#00205b] mb-2">{etape.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{etape.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sorties */}
        <section>
          <h2 className="text-3xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00b5e2]" aria-hidden="true" /> Où et quand nous rejoindre
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {sorties.map((s) => (
              <div key={s.title} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <h3 className="font-bold text-[#00205b] text-lg">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">{s.desc}</p>
                <p className="text-sm text-gray-700"><strong>Quand :</strong> {s.when}</p>
                <p className="text-sm text-gray-700"><strong>Où :</strong> {s.where}</p>
                <p className="text-xs text-gray-500 mt-1">{s.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Adhésion et tarifs */}
        <section id="adhesion" className="scroll-mt-24 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-[#00205b] flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-[#00b5e2]" aria-hidden="true" /> Adhésion et tarifs
            </h2>
            <p className="text-gray-600 mt-2">
              Le coût total comprend la cotisation du club (obligatoire) et une licence fédérale (au choix).
            </p>
          </div>

          <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-md text-blue-900 text-sm">
            <AlertCircle className="w-5 h-5 text-[#00b5e2] flex-shrink-0 mt-0.5" aria-hidden="true" />
            <p>
              {campaignOpen ? (
                <><strong>Campagne {season} ouverte.</strong> Écrivez au bureau pour votre adhésion ou votre renouvellement.</>
              ) : (
                <><strong>Adhésion {nextSeason} : bientôt ouverte.</strong> Les tarifs {season} ci-dessous sont indicatifs et peuvent évoluer pour {nextSeason}. Pour nous rejoindre dès maintenant, contactez le bureau.</>
              )}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 border border-gray-100 space-y-8">
            <div>
              <h3 className="font-bold text-[#00205b] text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00b5e2] text-white flex items-center justify-center text-xs">A</span>
                Cotisation club (obligatoire)
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="font-bold text-[#00205b] mb-2">Groupe Airbus</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {COTISATIONS_AIRBUS.map(([label, prix]) => (
                      <li key={label} className="flex justify-between gap-4">
                        <span>{label}</span>
                        <span className="font-bold">{prix}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="font-bold text-[#00205b] mb-2">Extérieurs et offres</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between gap-4">
                      <span>Extérieur</span>
                      <span className="font-bold">40€</span>
                    </li>
                    <li className="flex justify-between gap-4 text-[#0077b6]">
                      <span className="flex items-center gap-1"><Gift className="w-4 h-4" aria-hidden="true" /> Nouvelle adhérente</span>
                      <span className="font-bold">GRATUIT</span>
                    </li>
                    <li className="text-xs text-gray-500 italic">Gratuit la 1ère année pour les nouvelles adhérentes.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100"></div>

            <div>
              <h3 className="font-bold text-[#00205b] text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00b5e2] text-white flex items-center justify-center text-xs">B</span>
                Licence fédérale (au choix)
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {LICENCES.map((lic) => (
                  <div key={lic.name} className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#00b5e2] transition-colors">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-[#00205b]">{lic.name}</h4>
                      <span className="px-2 py-1 bg-gray-100 text-xs font-bold text-gray-500 rounded">{lic.tag}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{lic.text}</p>
                    <ul className="space-y-2">
                      {lic.docs.map((doc) => {
                        const Icon = doc.icon || FileText
                        return (
                          <li key={doc.label}>
                            <a
                              href={doc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2 text-sm ${doc.main ? 'text-[#0077b6] hover:underline' : 'text-gray-500 hover:text-[#0077b6]'}`}
                            >
                              <Icon className="w-4 h-4" aria-hidden="true" /> {doc.label}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-3xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#00b5e2]" aria-hidden="true" /> Questions fréquentes
          </h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group bg-white rounded-lg shadow-sm border border-gray-100">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-bold text-[#00205b]">
                  {item.q}
                  <ChevronDown className="w-5 h-5 text-[#00b5e2] flex-shrink-0 transition-transform group-open:rotate-180" aria-hidden="true" />
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-[#00205b] text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-3">Prêt à pédaler avec nous ?</h2>
          <p className="text-gray-300 mb-6">Une question ? Écrivez au bureau, on vous répond rapidement.</p>
          <a
            href={MAIL_ESSAI}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors"
          >
            <Mail className="w-5 h-5" /> Nous écrire
          </a>
        </section>
      </div>
    </div>
  )
}
