'use client'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, FileText, CreditCard, Shield, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdhesionPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#00205b] text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00b5e2] rounded-full blur-[128px] opacity-20 transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-[#00b5e2] hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Devenir Membre
          </h1>
          <p className="text-xl text-gray-300">
            Rejoignez le TOAC Cyclo pour la saison 2026
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        
        {/* Intro */}
        {/* Intro */}
        <div className="bg-white rounded-lg shadow-sm p-8 border-l-4 border-[#00b5e2]">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold text-[#00205b] mb-4">Campagne d'adhésion 2026</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                La campagne d'adhésion pour la nouvelle saison est ouverte ! Que vous souhaitiez renouveler votre licence ou nous rejoindre pour la première fois, voici la marche à suivre.
              </p>
              <div className="flex items-start gap-3 bg-blue-50 p-4 rounded-md text-blue-900 text-sm">
                <AlertCircle className="w-5 h-5 text-[#00b5e2] flex-shrink-0 mt-0.5" />
                <p>
                  <strong>Important :</strong> Veuillez lire attentivement les instructions ci-dessous avant de commencer votre démarche.
                </p>
              </div>
            </div>
            <div className="relative h-64 md:h-full min-h-[200px] rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/images/maillot_toac.jpg" 
                alt="Maillot TOAC Cyclo" 
                fill 
                className="object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Étapes */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00205b] text-white text-sm">1</span>
            Remplir le formulaire
          </h3>
          
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <p className="text-gray-600 mb-6">
              La première étape consiste à remplir le formulaire de demande de licence en ligne. Cela nous permet de collecter vos informations pour l'inscription.
            </p>
            <a 
              href="https://forms.gle/1P66F7gW9RFKJ9Ux8" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-[#00b5e2] text-[#00205b] font-bold rounded-sm hover:bg-[#009bc2] transition-colors shadow-sm"
            >
              Accéder au formulaire 2026 ↗
            </a>
          </div>

          <h3 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
             <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00205b] text-white text-sm">2</span>
            Paiement
          </h3>
          
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
            <div className="flex items-start gap-4">
              <div className="bg-yellow-100 p-3 rounded-full">
                <CreditCard className="w-6 h-6 text-yellow-700" />
              </div>
              <div>
                <h4 className="font-bold text-[#00205b] mb-2">Ne payez pas tout de suite !</h4>
                <p className="text-gray-600">
                  Une fois le formulaire rempli, <strong>attendez notre contact</strong>. Nous vous enverrons un email pour :
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1 ml-2">
                  <li>Confirmer les documents à fournir.</li>
                  <li>Vous indiquer le montant exact à régler.</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#00205b] flex items-center gap-2">
             <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00205b] text-white text-sm">3</span>
            Tarifs 2026
          </h3>
          
          <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100 space-y-8">
            <p className="text-gray-600">
              Le coût total de votre inscription comprend l'adhésion au club (obligatoire) et le coût de la licence fédérale (au choix).
            </p>

            {/* Part 1: Adhésion Club */}
            <div>
              <h4 className="font-bold text-[#00205b] text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00b5e2] text-white flex items-center justify-center text-xs">A</span>
                Cotisation Club (Obligatoire)
              </h4>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="font-bold text-[#00205b] mb-2">Groupe Airbus</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                      <span>Salarié Airbus Opérations</span>
                      <span className="font-bold">20€</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Ayant-droit Airbus Opérations</span>
                      <span className="font-bold">20€</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Retraité Airbus Opérations</span>
                      <span className="font-bold">20€</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Autre Airbus</span>
                      <span className="font-bold">40€</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="font-bold text-[#00205b] mb-2">Extérieurs & Offres</div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex justify-between">
                      <span>Extérieur</span>
                      <span className="font-bold">40€</span>
                    </li>
                    <li className="flex justify-between text-[#00b5e2]">
                      <span>Nouvelle adhérente féminine</span>
                      <span className="font-bold">GRATUIT</span>
                    </li>
                    <li className="text-xs text-gray-500 mt-2 italic">
                      *Gratuit la 1ère année pour les nouvelles adhérentes.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-100"></div>

            {/* Part 2: Licences */}
            <div>
              <h4 className="font-bold text-[#00205b] text-lg mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00b5e2] text-white flex items-center justify-center text-xs">B</span>
                Licence Fédérale (Au choix)
              </h4>
              <div className="grid md:grid-cols-2 gap-6">
                {/* FFVélo */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#00b5e2] transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bold text-[#00205b]">FFVélo</h5>
                    <span className="px-2 py-1 bg-gray-100 text-xs font-bold text-gray-500 rounded">Cyclotourisme</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 h-10">Pour les amateurs de randonnée pure et de voyages à vélo.</p>
                  <ul className="space-y-2">
                    <li>
                      <a href="https://drive.google.com/file/d/1Ux-Hh2NXmt0P5FC6BOO6vCUdHppTadSz/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#00b5e2] hover:underline">
                        <FileText className="w-4 h-4" /> Tarifs Licences 2026
                      </a>
                    </li>
                    <li>
                      <a href="https://drive.google.com/file/d/1R2gDzUmdbSEw7e3Sy2Kal_aEQAW-WvvL/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00b5e2]">
                        <Shield className="w-4 h-4" /> Guide Assurances
                      </a>
                    </li>
                    <li>
                      <a href="https://drive.google.com/file/d/1zKx-XCw90qtjslxFdxp2mSF4rBWX_KVS/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00b5e2]">
                        <FileText className="w-4 h-4" /> Notice d'information
                      </a>
                    </li>
                  </ul>
                </div>

                {/* FSGT */}
                <div className="bg-white rounded-lg border border-gray-200 p-4 hover:border-[#00b5e2] transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-bold text-[#00205b]">FSGT</h5>
                    <span className="px-2 py-1 bg-gray-100 text-xs font-bold text-gray-500 rounded">Omnisports</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 h-10">Une licence multisports accessible et solidaire.</p>
                   <ul className="space-y-2">
                    <li>
                      <a href="https://drive.google.com/file/d/1uN_LoOmrDZa3_KfuXBaIK226zK3RuXqN/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#00b5e2] hover:underline">
                        <FileText className="w-4 h-4" /> Demande de Licence 2026
                      </a>
                    </li>
                    <li>
                      <a href="https://drive.google.com/file/d/1yv0lbDVUL8Gv1TKzMHc4sOtpJ36_LCqh/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00b5e2]">
                        <Shield className="w-4 h-4" /> Guide Assurances
                      </a>
                    </li>
                    <li>
                      <a href="https://drive.google.com/file/d/1PgY_HNQrEMe8y3hrQGue2zkJs4wJJO-Q/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#00b5e2]">
                        <FileText className="w-4 h-4" /> Notice Assurance IA
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-100 rounded-lg p-6 text-center text-sm text-gray-600">
          <p>
            Des questions ? Contactez le <a href="mailto:contact@toac-cyclo.com" className="font-bold hover:text-[#00b5e2] transition-colors">bureau</a>.
          </p>
        </div>

      </div>
    </div>
  )
}
