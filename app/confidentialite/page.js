import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles du site TOAC Cyclotourisme'
}

export default function Confidentialite() {
  return (
    <>
      <div className="pt-28 pb-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Link href="/" className="inline-flex items-center text-[#0077b6] hover:text-[#00205b] mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Retour à l'accueil
          </Link>
          
          <div className="bg-white p-8 md:p-12 shadow-sm border border-gray-100 rounded-lg">
            <h1 className="text-3xl md:text-4xl font-bold text-[#00205b] mb-8">Politique de confidentialité</h1>
            
            <div className="prose prose-lg max-w-none text-gray-600">
              
              <p className="text-sm text-gray-500 mb-8">Dernière mise à jour : Octobre 2026</p>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">1. Introduction</h2>
                <p>
                  TOAC Cyclotourisme s'engage à protéger la vie privée des utilisateurs de son site web. 
                  Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons 
                  vos informations personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">2. Données collectées</h2>
                <p className="mb-4">Nous pouvons collecter les informations suivantes :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Nom et prénom (lors d'une demande d'adhésion ou d'essai par email)</li>
                  <li>Adresse email</li>
                  <li>Statistiques de fréquentation anonymisées (pages consultées, sans identification personnelle)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">3. Utilisation des données</h2>
                <p className="mb-4">Vos données sont utilisées pour :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gérer votre adhésion au club</li>
                  <li>Vous informer des événements et sorties</li>
                  <li>Améliorer notre site web</li>
                  <li>Répondre à vos demandes de contact</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">4. Cookies et mesure d'audience</h2>
                <p>
                  Ce site n'utilise aucun cookie publicitaire ni traceur de profilage individuel. 
                  La mesure d'audience est réalisée de manière strictement anonyme et sans dépôt de cookie, conformément aux recommandations de la CNIL.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">5. Partage des données</h2>
                <p>
                  Nous ne vendons, n'échangeons ni ne transférons vos informations personnelles à des tiers, 
                  sauf obligation légale ou avec votre consentement explicite.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">6. Vos droits</h2>
                <p className="mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                  <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
                  <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données</li>
                  <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</li>
                  <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold text-[#00205b] mb-4">7. Sécurité</h2>
                <p>
                  Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données 
                  personnelles contre tout accès, modification, divulgation ou destruction non autorisés.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-bold text-[#00205b] mb-4">8. Contact</h2>
                <p>
                  Pour exercer vos droits ou pour toute question concernant cette politique, contactez-nous :
                  <br /><br />
                  <strong>TOAC Cyclotourisme</strong><br />
                  Email : <a href="mailto:toac.cyclo@gmail.com" className="text-[#0077b6] underline hover:no-underline">toac.cyclo@gmail.com</a>
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
