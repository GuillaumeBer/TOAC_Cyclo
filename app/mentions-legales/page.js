import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site TOAC Cyclotourisme'
}

export default function MentionsLegales() {
  return (
    <>
      <div className="pt-28 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center text-[#0077b6] hover:text-[#00205b] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'accueil
          </Link>
          
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-[#00205b] mb-8">Mentions Légales</h1>
            
            <div className="prose prose-lg max-w-none text-gray-600">
              
              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">1. Éditeur du site</h2>
                <p className="mb-4">
                  <strong>TOAC Cyclotourisme</strong><br />
                  Section cyclotourisme du TOAC<br />
                  Complexe Sportif TOAC<br />
                  31000 Toulouse, France
                </p>
                <p>
                  <strong>Email :</strong> toac.cyclo@gmail.com<br />
                  <strong>Président :</strong> Jérôme PARDUILLAR
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">2. Hébergement</h2>
                <p>
                  Ce site est hébergé par :<br />
                  <strong>OVH SAS</strong><br />
                  2 rue Kellermann<br />
                  59100 Roubaix, France<br />
                  RCS Lille Métropole 424 761 419 00045
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">3. Propriété intellectuelle</h2>
                <p>
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur 
                  et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour 
                  les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">4. Crédits photos</h2>
                <p>
                  Les photographies utilisées sur ce site proviennent de :<br />
                  • Photos du club TOAC Cyclotourisme<br />
                  • Unsplash (banque d'images libres de droits)
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">5. Liens hypertextes</h2>
                <p>
                  Le site peut contenir des liens vers d'autres sites. TOAC Cyclotourisme n'exerce aucun 
                  contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#00205b] mb-4">6. Contact</h2>
                <p>
                  Pour toute question concernant ces mentions légales, vous pouvez nous contacter à l'adresse : 
                  <a href="mailto:toac.cyclo@gmail.com" className="text-[#0077b6] underline hover:no-underline ml-1">
                    toac.cyclo@gmail.com
                  </a>
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
