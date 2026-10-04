import Link from 'next/link'
import { ArrowLeft, Mail, Bike, Users, ShieldCheck, Gift, CheckCircle, ChevronDown } from 'lucide-react'
import sorties from '@/data/sorties.json'

export const metadata = {
  title: 'Venir essayer le club',
  description: "Envie de rouler avec le TOAC Cyclo à Toulouse ? Découvrez comment essayer une sortie, les sorties régulières, le matériel nécessaire et comment adhérer.",
}

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
    a: "Le club est affilié à la FFVélo (cyclotourisme) et à la FSGT (omnisports). Vous choisissez celle qui vous convient ; les détails et les tarifs sont sur la page adhésion.",
  },
  {
    q: 'Combien ça coûte ?',
    a: "Une cotisation club (gratuite la première année pour les nouvelles adhérentes) plus une licence fédérale. Les tarifs de la saison à venir seront publiés sur la page adhésion.",
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
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Venir essayer le club</h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Envie de rouler en bonne compagnie à Toulouse ? Venez faire une sortie avec nous avant de vous décider.
          </p>
          <a
            href="mailto:toac.cyclo@gmail.com?subject=Je souhaite essayer une sortie"
            className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors text-lg"
          >
            <Mail className="w-5 h-5" /> Demander une sortie d'essai
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
        {/* Étapes */}
        <section>
          <h2 className="text-2xl font-bold text-[#00205b] mb-6">Comment ça se passe ?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {ETAPES.map((etape, i) => (
              <div key={etape.title} className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-[#00b5e2]">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-[#00205b] text-white flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <etape.icon className="w-5 h-5 text-[#00b5e2]" />
                </div>
                <h3 className="font-bold text-[#00205b] mb-2">{etape.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{etape.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sorties */}
        <section>
          <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <Users className="w-6 h-6 text-[#00b5e2]" /> Où et quand nous rejoindre
          </h2>
          <div className="space-y-4">
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

        {/* Offre */}
        <section className="bg-[#fcd34d]/25 border border-[#fcd34d] rounded-lg p-6 flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#fcd34d] flex items-center justify-center flex-shrink-0">
            <Gift className="w-6 h-6 text-[#00205b]" />
          </div>
          <div>
            <h2 className="font-bold text-[#00205b] text-lg">Nouvelles adhérentes : cotisation club offerte</h2>
            <p className="text-sm text-gray-600 mt-1">La cotisation du club est gratuite la première année pour toutes les nouvelles adhérentes.</p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-[#00205b] mb-6 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#00b5e2]" /> Questions fréquentes
          </h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group bg-white rounded-lg shadow-sm border border-gray-100">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-5 font-bold text-[#00205b]">
                  {item.q}
                  <ChevronDown className="w-5 h-5 text-[#00b5e2] flex-shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-[#00205b] text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Prêt à pédaler avec nous ?</h2>
          <p className="text-gray-300 mb-6">Une question ? Écrivez au bureau, on vous répond rapidement.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:toac.cyclo@gmail.com?subject=Je souhaite essayer une sortie"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#fcd34d] hover:bg-[#fde68a] text-[#00205b] font-bold rounded-sm transition-colors"
            >
              <Mail className="w-5 h-5" /> Nous écrire
            </a>
            <Link
              href="/adhesion"
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-white/60 hover:border-white hover:bg-white/10 font-bold rounded-sm transition-colors"
            >
              Tarifs et adhésion
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
