import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar, Quote } from 'lucide-react'

export const metadata = {
  title: 'Édito du Président - TOAC Cyclotourisme',
  description: 'L\'édito du président Jérôme P. pour la saison 2026 du TOAC Cyclotourisme'
}

export default function EditoPresident() {
  return (
    <>
      <NavigationBar />
      <main className="pt-28 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/#club" className="inline-flex items-center text-[#00b5e2] hover:text-[#00205b] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au site
          </Link>
          
          <article className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
            
            {/* Header */}
            <header className="text-center mb-12">
              <div className="inline-block p-1 border border-gray-300 bg-white mb-6">
                <Image 
                  src="/images/president.jpg" 
                  alt="Jérôme P. - Président" 
                  width={120}
                  height={120}
                  className="w-28 h-28 object-cover"
                />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#00205b] mb-2">Édito du Président</h1>
              <p className="text-[#00b5e2] font-medium text-lg">Jérôme P.</p>
              <div className="flex items-center justify-center text-gray-500 text-sm mt-4">
                <Calendar className="w-4 h-4 mr-2" />
                Saison 2026
              </div>
            </header>

            {/* Quote */}
            <div className="relative bg-[#00205b] text-white p-8 md:p-10 mb-10">
              <Quote className="absolute top-4 left-4 w-8 h-8 text-[#00b5e2] opacity-30" />
              <p className="text-xl md:text-2xl font-light italic leading-relaxed text-center">
                "Faire avancer notre club, partager de beaux moments et continuer cette belle aventure ensemble."
              </p>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              
              <p className="text-xl text-[#00205b] font-medium">Chers membres, chers amis cyclistes,</p>
              
              <p>C'est avec beaucoup de fierté et d'enthousiasme que je m'adresse à vous pour cette nouvelle saison 2026. Une année qui s'annonce riche en pédalées, en rencontres et en moments de partage.</p>

              <h3 className="text-xl font-bold text-[#00205b] mt-8 mb-4">Une saison sous le signe du renouveau</h3>

              <p>2024 nous a offert son lot de défis et de satisfactions. Notre <strong>Randonnée des Rameaux</strong>, malgré les caprices de la météo, a démontré une fois de plus la motivation et l'esprit de notre communauté. 70 participants sous la pluie, c'est la preuve que rien ne peut arrêter un vrai cycliste du TOAC !</p>

              <p>Cette année, nous revenons à notre traditionnel week-end du <span className="text-[#00b5e2] font-bold">29 mars 2026</span>. Une date à bloquer dès maintenant dans vos agendas.</p>

              <h3 className="text-xl font-bold text-[#00205b] mt-8 mb-4">Les temps forts de l'année écoulée</h3>

              <p>Comment ne pas mentionner le <strong>Brevet des 150 km</strong>, inspiré de l'étape Toulouse-Toulouse du Tour de France ? Une météo idéale, une ambiance chaleureuse et une belle performance de nos grimpeurs sur l'ascension des Canalets.</p>

              <p>Grande nouveauté cette année : la <strong>sortie des anciens</strong> ! 100 km, 14 participants au sourire contagieux et un restaurant bien mérité à l'arrivée. Une initiative que nous reconduirons avec plaisir.</p>

              <p>Mention spéciale à nos aventuriers qui ont défendu nos couleurs sur le périple <strong>Londres – Édimbourg – Londres</strong>, ainsi qu'à ceux qui ont traversé les Pyrénées en une semaine. Chapeau !</p>

              <h3 className="text-xl font-bold text-[#00205b] mt-8 mb-4">Se souvenir et avancer</h3>

              <p>Notre <strong>Journée du Souvenir à Mérenvielle</strong> reste un moment important du calendrier. Ce rendez-vous d'octobre, empreint de sérénité, nous permet d'honorer la mémoire de ceux qui ont fait l'histoire de notre club.</p>

              <h3 className="text-xl font-bold text-[#00205b] mt-8 mb-4">Cap sur 2025 !</h3>

              <p>Je me suis représenté pour un nouveau mandat avec une conviction intacte : notre club n'est pas qu'une association sportive, c'est une <strong>famille</strong>. Une famille qui roule ensemble, qui partage, qui s'entraide.</p>

              <p>N'hésitez pas à proposer vos idées pour 2026 — même les plus audacieuses ! Nous ferons le tri... toujours avec humour et bienveillance.</p>

              <p>Je vous souhaite une excellente saison cycliste : profitez de chaque sortie, de chaque kilomètre parcouru et de chaque moment partagé avec vos compagnons de route.</p>

              <p className="text-[#00205b] font-bold mt-8 text-lg">À très vite sur les routes !</p>

              <p className="text-right text-gray-500 italic mt-8 border-t pt-6">
                Jérôme P.<br/>
                <span className="text-sm">Président du TOAC Cyclotourisme</span>
              </p>

            </div>
          </article>
        </div>
      </main>
      <Footer />
    </>
  )
}
