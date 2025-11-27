<script setup>
import founderImg from '~/assets/founder.jpg'
</script>

<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="py-20 bg-lic-light">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 class="text-5xl md:text-6xl font-black text-lic-dark mb-6 tracking-tight">
          À Propos de LIC
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl">
          Une startup tech fondée par de jeunes sénégalais passionnés par la transformation digitale de l'Afrique.
        </p>
      </div>
    </section>

    <!-- Story -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl">
          <h2 class="text-4xl font-black text-lic-dark mb-8 tracking-tight">Notre Histoire</h2>
          <div class="space-y-6 text-gray-600 leading-relaxed">
            <p>
              LO IT CONSULTING est née d'une vision simple mais puissante : démocratiser l'accès à une expertise technologique de classe mondiale en Afrique. Fondée par Makhmadane Lo et une équipe de développeurs passionnés, LIC incarne l'esprit d'innovation que les jeunes sénégalais apportent au continent.
            </p>
            <p>
              Depuis sa création, LIC a accompagné plus de 200 entreprises dans leur transition digitale, en proposant des solutions adaptées au contexte africain tout en maintenant les standards internationaux de qualité et de sécurité.
            </p>
            <p>
              Nous croyons que la technologie est un catalyseur de changement social et économique. Chaque projet que nous menons est une opportunité de créer un impact durable et de contribuer au développement du continent africain.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Founder -->
    <section class="py-24 bg-lic-light">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="bg-white p-8 rounded-lg border-l-4 border-lic-orange">
            <h3 class="text-sm font-bold text-lic-orange mb-2 tracking-widest">FONDATEUR</h3>
            <h2 class="text-3xl font-black text-lic-dark mb-2">Makhmadane Lo</h2>
            <p class="text-gray-500 font-medium mb-8">Directeur Général</p>
            <blockquote class="border-l-4 border-lic-blue pl-6 py-6 mb-8">
              <p class="text-gray-700 italic text-lg leading-relaxed mb-4">
                "LIC est le rêve de jeunes sénégalais devenus acteurs du changement numérique. Nous ne voyons pas l'absence d'infrastructure comme une limitation, mais comme une opportunité de créer des solutions innovantes et durables."
              </p>
            </blockquote>
            <p class="text-gray-600">
              Avec plus de 15 ans d'expérience dans le secteur technologique, Makhmadane guide LIC vers de nouveaux horizons en innovation digitale.
            </p>
          </div>

          <div class="bg-gray-200 h-[600px] rounded-lg border-l-4 border-orange-500 overflow-hidden">
            <img :src="founderImg" alt="Makhmadane Lo" class="w-full h-full object-cover object-top" />
          </div>
        </div>
      </div>
    </section>

    <!-- Vision -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="text-4xl font-black text-lic-dark mb-16 tracking-tight">
          Notre Vision & Valeurs
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-lic-light p-8 rounded-lg border-t-4 border-lic-blue">
            <h3 class="text-2xl font-black text-lic-blue mb-4">Impact Social</h3>
            <p class="text-gray-600 leading-relaxed">
              Mettre la technologie au service de l'autonomie, de l'innovation et de l'inclusion numérique en Afrique et au-delà.
            </p>
          </div>

          <div class="bg-lic-light p-8 rounded-lg border-t-4 border-lic-orange">
            <h3 class="text-2xl font-black text-lic-orange mb-4">Partenariat Durable</h3>
            <p class="text-gray-600 leading-relaxed">
              Accompagner les entreprises avec des solutions fiables, évolutives et humaines, basées sur la confiance et la transparence.
            </p>
          </div>

          <div class="bg-lic-light p-8 rounded-lg border-t-4 border-lic-blue">
            <h3 class="text-2xl font-black text-lic-blue mb-4">Perspective Africaine</h3>
            <p class="text-gray-600 leading-relaxed">
              Créer des solutions technologiques adaptées aux réalités locales du continent africain avec excellence mondiale.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="py-20 bg-lic-dark text-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">50+</p>
            <p class="text-gray-300">Professionnels</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">5</p>
            <p class="text-gray-300">Pays Africains</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">200+</p>
            <p class="text-gray-300">Clients Satisfaits</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">15+</p>
            <p class="text-gray-300">Années d'Expertise</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
