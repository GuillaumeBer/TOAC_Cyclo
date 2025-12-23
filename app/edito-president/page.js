import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calendar } from 'lucide-react'

export const metadata = {
  title: 'Édito du Président - TOAC Cyclotourisme',
  description: 'Discours du président lors de l\'Assemblée Générale 2025 du TOAC Cyclotourisme'
}

export default function EditoPresident() {
  return (
    <>
      <NavigationBar />
      <main className="pt-28 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/#club" className="inline-flex items-center text-[#00b5e2] hover:text-[#00205b] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour au site
          </Link>
          
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-8 items-center mb-12 pb-8 border-b border-gray-200">
              <div className="flex-shrink-0">
                <div className="p-1 border border-gray-300 bg-white">
                  <Image 
                    src="/images/president.jpg" 
                    alt="Alain D. - Président" 
                    width={150}
                    height={150}
                    className="w-36 h-36 object-cover"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#00205b] mb-2">Édito du Président</h1>
                <h2 className="text-xl text-[#00b5e2] font-medium mb-3">Alain D.</h2>
                <div className="flex items-center text-gray-500 text-sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Assemblée Générale du 6 décembre 2024
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              
              <p className="text-xl text-[#00205b] font-medium">Mesdames, Messieurs,</p>
              
              <p>C'est avec un immense plaisir que je déclare ouverte notre assemblée générale 2025.</p>

              <p>Avant toute chose, je tiens à exprimer ma profonde gratitude à Patrick Lecuyer pour sa présence parmi nous aujourd'hui. Jean-Paul, quant à lui, n'a pas pu se joindre à nous mais adresse à chacun ses vœux de réussite pour cette assemblée générale. Je les remercie tous deux pour leur soutien indéfectible, leur engagement et leur fidélité, qui comptent énormément pour nous.</p>

              <p>J'aimerais également que nous ayons une pensée pour Lulu, qui nous a quittés il y a déjà un an, ainsi que pour Georges Gout, disparu plus récemment.</p>

              <p>Un mot maintenant pour l'équipe du bureau sortant : merci à chacun pour son engagement, son sérieux et la bonne humeur qui ont marqué toute cette année.</p>

              <p>Je souhaite également adresser un remerciement particulier à René et Thierry pour leur investissement et leur présence auprès de la FSGT et de la FF Vélo. Merci à vous deux.</p>

              <h3 className="text-xl font-bold text-[#00205b] mt-8 mb-4">Retour sur l'année écoulée</h3>

              <p>Avant de poursuivre, prenons un instant pour revenir sur l'année qui s'achève. La ligne d'arrivée approche, et c'est le moment idéal pour jeter un regard en arrière et apprécier le chemin parcouru.</p>

              <h4 className="text-lg font-bold text-[#00205b] mt-6 mb-3">Notre sortie annuelle</h4>

              <p>Eh bien... disons-le honnêtement : ce n'était pas le millésime du siècle. Avec seulement 70 participants, une météo digne d'un mois de novembre et un week-end à rallonge, il fallait être sacrément motivé pour être au départ !</p>

              <p><strong>La bonne nouvelle</strong>, c'est que l'an prochain, nous revenons à notre traditionnel week-end du <span className="text-[#00b5e2] font-bold">29 mars</span>. Vous pouvez d'ores et déjà bloquer la date — et peut-être commander le soleil, on ne sait jamais !</p>

              <p>Nous espérons pouvoir compter sur plus de volontaires pour l'organisation des Rameaux, afin que tout se déroule sereinement. Votre aide permettrait de mieux préparer cet événement et de partager un beau moment tous ensemble !</p>

              <h4 className="text-lg font-bold text-[#00205b] mt-6 mb-3">Brevet des 150 km : à la découverte du Tour de France</h4>

              <p>Le brevet des 150 km, inspiré de l'étape Toulouse-Toulouse du Tour de France, s'est déroulé dans des conditions parfaites. Un petit peloton de sept cyclistes a pris le départ, profitant d'une météo idéale et d'une ambiance chaleureuse tout au long du parcours. Seul petit bémol : un ravitaillement un peu plus long que prévu, qui n'a toutefois pas entamé la bonne humeur du groupe.</p>

              <p>Bravo à Xavier et Patrick Bernard pour leur belle performance lors de l'ascension des Canalets, véritable point d'orgue de cette sortie sportive réussie.</p>

              <h4 className="text-lg font-bold text-[#00205b] mt-6 mb-3">La sortie des anciens – La nouveauté 2025 !</h4>

              <p>Grande première cette année : la sortie des anciens ! Un 100 km au compteur, 14 participants au sourire contagieux, une météo idéale et bien sûr, un bon resto à la clé. Tout s'est déroulé à merveille, à part la petite glissade de Guillaume, sans gravité heureusement — juste de quoi tester la solidité du bitume et la réactivité des copains.</p>

              <p>Un immense merci à Alain Malard pour un circuit vraiment top, avec ce qu'il faut de bosses pour réveiller les appétits.</p>

              <h4 className="text-lg font-bold text-[#00205b] mt-6 mb-3">Journée du Souvenir à Mérenvielle</h4>

              <p>À la mi-octobre, sous un ciel lumineux mais légèrement frais et voilé d'un léger brouillard, nous nous sommes réunis à Mérenvielle pour la Journée du Souvenir. Dix-huit participants étaient présents pour honorer la mémoire de nos anciens du club disparus.</p>

              <p>Ce moment de recueillement et de partage, empreint de sérénité, restera désormais associé à cette belle période de l'année : la cérémonie se tiendra dorénavant chaque mois d'octobre.</p>

              <h3 className="text-xl font-bold text-[#00205b] mt-8 mb-4">Bravo à toutes et à tous !</h3>

              <p>Un immense bravo à celles et ceux qui défendent nos couleurs, que ce soit dans d'autres régions ou même chez nos voisins anglais, pour leur périple Londres – Édimbourg – Londres ! Une belle aventure, malheureusement interrompue par la tempête... preuve que là-bas, le soleil reste parfois un concept théorique.</p>

              <p>Chapeau également à Jean-Marc Juvan et Patrick Rizzi, qui ont traversé les Pyrénées en seulement une semaine : messieurs, respect !</p>

              <p>Un grand merci au CSE, toujours prêt à nous soutenir, notamment pour ce périple anglais.</p>

              <div className="bg-[#00205b] text-white p-6 rounded-sm my-8">
                <p className="text-lg font-medium mb-0">Et pour finir... <strong>je suis heureux de vous annoncer que je me représente pour un nouveau mandat !</strong> Avec la même envie de faire avancer notre club, de partager de beaux moments et de continuer cette belle aventure ensemble.</p>
              </div>

              <p>Alors, n'hésitez pas : posez vos questions et partagez vos idées pour 2026 — même les plus audacieuses ! Promis, on fera le tri... toujours avec humour et bienveillance.</p>

              <p>Je vous souhaite dès maintenant d'excellentes fêtes de fin d'année : profitez de vos proches, reposez-vous et revenez en pleine forme pour de nouvelles aventures, sportives et humaines !</p>

              <p className="text-[#00205b] font-medium mt-8">Merci à tous pour votre attention.</p>

              <p className="text-right text-gray-500 italic mt-8">— Alain D., Président du TOAC Cyclotourisme</p>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
