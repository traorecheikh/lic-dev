<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="min-h-screen flex items-center bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20 w-full">
        <div class="max-w-2xl">
          <h1 class="text-5xl md:text-7xl font-black text-lic-dark mb-6 leading-tight tracking-tight">
            L'expertise IT au service de l'Afrique Digitale
          </h1>
          <p class="text-lg text-gray-600 mb-10 leading-relaxed max-w-xl">
            LO IT CONSULTING transforme les défis technologiques en opportunités de croissance. Formation, développement, cloud, et conseil pour propulser votre entreprise vers l'avenir.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <NuxtLink to="/services" class="bg-lic-blue hover:bg-blue-700 text-white px-8 py-4 font-bold text-center transition duration-300">
              Découvrir les Services
            </NuxtLink>
            <NuxtLink to="/contact" class="border-2 border-lic-dark text-lic-dark hover:bg-lic-light px-8 py-4 font-bold text-center transition duration-300">
              Demander un Devis
            </NuxtLink>
          </div>
        </div>
      </div>
      <!-- Right side: stats or visual element -->
      <div class="hidden lg:block flex-1 ml-12">
        <div class="h-96 bg-lic-light rounded-lg border-l-4 border-lic-orange flex items-center justify-center">
          <div class="text-center">
            <p class="text-4xl font-black text-lic-blue mb-2">200+</p>
            <p class="text-gray-600 font-medium">Projets Réalisés</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="bg-lic-dark text-white py-16">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">200+</p>
            <p class="text-gray-300 font-medium">Projets Réalisés</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">98%</p>
            <p class="text-gray-300 font-medium">Clients Satisfaits</p>
          </div>
          <div>
            <p class="text-5xl font-black text-lic-orange mb-2">15+</p>
            <p class="text-gray-300 font-medium">Années d'Expertise</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Preview -->
    <section class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-2xl mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-lic-dark mb-4 tracking-tight">
            Nos Domaines d'Expertise
          </h2>
          <p class="text-lg text-gray-600">
            Solutions complètes pour accompagner votre transformation digitale
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Service 1 -->
          <div class="border-l-4 border-lic-orange p-8 hover:bg-lic-light transition duration-300">
            <h3 class="text-xl font-bold text-lic-dark mb-3">Formation IT</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Développez les compétences de votre équipe avec nos programmes de formation reconnus.
            </p>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• Web Development</li>
              <li>• Mobile Apps</li>
              <li>• DevOps & Cloud</li>
            </ul>
          </div>

          <!-- Service 2 -->
          <div class="border-l-4 border-lic-orange p-8 hover:bg-lic-light transition duration-300">
            <h3 class="text-xl font-bold text-lic-dark mb-3">Développement</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Solutions technologiques sur mesure adaptées à vos besoins spécifiques.
            </p>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• Frontend & Backend</li>
              <li>• Applications Mobiles</li>
              <li>• APIs & Intégrations</li>
            </ul>
          </div>

          <!-- Service 3 -->
          <div class="border-l-4 border-lic-orange p-8 hover:bg-lic-light transition duration-300">
            <h3 class="text-xl font-bold text-lic-dark mb-3">Cloud & DevOps</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Infrastructure moderne, sécurisée et scalable pour votre croissance.
            </p>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• AWS & Azure</li>
              <li>• Containerization</li>
              <li>• CI/CD Pipelines</li>
            </ul>
          </div>

          <!-- Service 4 -->
          <div class="border-l-4 border-lic-orange p-8 hover:bg-lic-light transition duration-300">
            <h3 class="text-xl font-bold text-lic-dark mb-3">Conseil Tech</h3>
            <p class="text-gray-600 text-sm leading-relaxed mb-6">
              Guidance stratégique pour naviguer votre transformation digitale.
            </p>
            <ul class="text-sm text-gray-700 space-y-2">
              <li>• Audit Technologique</li>
              <li>• Stratégie IT</li>
              <li>• Sécurité & Compliance</li>
            </ul>
          </div>
        </div>

        <div class="mt-12 text-center">
          <NuxtLink to="/services" class="text-lic-blue hover:text-lic-orange font-bold transition">
            Voir Tous les Services →
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Why Us -->
    <section class="py-24 bg-lic-light">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-2xl mb-16">
          <h2 class="text-4xl md:text-5xl font-black text-lic-dark mb-4 tracking-tight">
            Pourquoi Choisir LIC?
          </h2>
          <p class="text-lg text-gray-600">
            Une expertise reconnue au service de votre réussite
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Équipe Expérimentée</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              50+ professionnels avec 15+ années d'expertise combinée en technologies modernes.
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Approche Pragmatique</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Solutions réalistes adaptées à votre contexte et votre budget, pas de solutions génériques.
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Partenariat à Long Terme</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Nous ne sommes pas juste des prestataires, mais vos partenaires de transformation.
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Impact Africain</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Expertise mondiale avec une compréhension profonde du contexte africain.
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Qualité & Normes</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Standards internationaux en sécurité, performance et bonnes pratiques.
            </p>
          </div>

          <div class="bg-white p-8 rounded-lg border-t-4 border-lic-blue">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Support Continu</h3>
            <p class="text-gray-600 text-sm leading-relaxed">
              Maintenance, amélioration et support 24/7 pour la continuité de votre activité.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-lic-dark">
      <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-black text-white mb-4">
          Prêt à Transformer votre Entreprise?
        </h2>
        <p class="text-lg text-gray-300 mb-10">
          Contactez-nous pour discuter de vos défis technologiques et explorer les solutions adaptées.
        </p>
        <NuxtLink to="/contact" class="inline-block bg-lic-orange hover:bg-orange-600 text-white px-10 py-4 font-bold transition duration-300">
          Démarrer une Consultation
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
