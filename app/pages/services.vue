<script setup>
const serviceImg1 = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Formation: Diverse team learning
const serviceImg2 = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Dev: Coding on screen
const serviceImg3 = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Cloud: Tech network/globe
const serviceImg4 = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' // Conseil: Professional meeting
</script>

<template>
  <div class="bg-white">
    <!-- Modern Split Hero -->
    <section class="relative bg-lic-dark text-white">
        <div class="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh-5rem)]">
            <div class="relative h-96 lg:h-auto overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    width="2070"
                    height="1550"
                    alt="Nos Services"
                    class="absolute inset-0 w-full h-full object-cover opacity-60 hover:scale-105 transition-transform duration-700"
                />
                <div
                    class="absolute inset-0 bg-lic-blue/20 mix-blend-multiply"
                ></div>
            </div>
            <div class="flex items-center p-10 lg:p-24 xl:p-32">
                <div class="max-w-xl">
                    <span
                        class="text-lic-orange font-bold tracking-widest uppercase text-sm mb-4 block"
                        >Ce que nous faisons</span
                    >
                    <h1
                        class="text-5xl md:text-6xl font-black mb-8 leading-tight"
                    >
                        Nos Services
                    </h1>
                    <p class="text-lg text-gray-300 leading-relaxed mb-8">
                         Solutions complètes pour accompagner votre transformation digitale de bout en bout.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Services -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8 space-y-32">
        <!-- Service 1 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-black text-lic-dark mb-6 tracking-tight">Formation IT</h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Développez les compétences de votre équipe avec nos programmes de formation reconnus, conçus par des experts de l'industrie et alignés aux standards internationaux.
            </p>
            <ul class="space-y-4 mb-10">
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Web Development:</strong> HTML, CSS, JavaScript, React, Vue.js, Angular</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Mobile Apps:</strong> React Native, Flutter, Swift, Kotlin</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>DevOps & Cloud:</strong> Docker, Kubernetes, AWS, Azure, GCP</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Certifications:</strong> AWS Certified, Azure Certified, Kubernetes CKA</span>
              </li>
            </ul>
            <NuxtLink to="/contact" class="text-lic-blue hover:text-lic-orange font-bold transition">
              Demander une Formation →
            </NuxtLink>
          </div>
          <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl">
            <img :src="serviceImg1" width="800" height="600" alt="Formation IT" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
          </div>
        </div>

        <!-- Service 2 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl order-2 md:order-1">
             <img :src="serviceImg2" width="800" height="600" alt="Développement Sur Mesure" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
          </div>
          <div class="order-1 md:order-2">
            <h2 class="text-4xl font-black text-lic-dark mb-6 tracking-tight">Développement Sur Mesure</h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Solutions technologiques robustes et scalables, adaptées à vos besoins spécifiques. De la conception à la livraison, nous gérons l'intégralité de votre projet.
            </p>
            <ul class="space-y-4 mb-10">
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Frontend Moderne:</strong> React, Vue.js, Next.js, TypeScript, Responsive Design</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Backend Robuste:</strong> Node.js, Python, Java, .NET, Microservices</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Applications Mobiles:</strong> iOS, Android, Cross-platform, Progressive Web Apps</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>APIs & Intégrations:</strong> REST APIs, GraphQL, Webhooks, Third-party Integrations</span>
              </li>
            </ul>
            <NuxtLink to="/contact" class="text-lic-blue hover:text-lic-orange font-bold transition">
              Discuter de Votre Projet →
            </NuxtLink>
          </div>
        </div>

        <!-- Service 3 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-4xl font-black text-lic-dark mb-6 tracking-tight">Cloud & DevOps</h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Infrastructure moderne et sécurisée. De la migration à la gestion continue, nous assurons la scalabilité et la performance de votre infrastructure.
            </p>
            <ul class="space-y-4 mb-10">
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Cloud Platforms:</strong> AWS, Microsoft Azure, Google Cloud Platform, Multi-cloud</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Containerization:</strong> Docker, Kubernetes, Container Registry, Orchestration</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>CI/CD Pipelines:</strong> GitHub Actions, GitLab CI, Jenkins, Automated Testing</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Monitoring & Logs:</strong> Datadog, New Relic, ELK Stack, Real-time Alerts</span>
              </li>
            </ul>
            <NuxtLink to="/contact" class="text-lic-blue hover:text-lic-orange font-bold transition">
              Planifier votre Migration →
            </NuxtLink>
          </div>
          <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl">
             <img :src="serviceImg3" alt="Cloud & DevOps" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
          </div>
        </div>

        <!-- Service 4 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div class="h-80 rounded-lg border-l-4 border-lic-orange overflow-hidden shadow-xl order-2 md:order-1">
             <img :src="serviceImg4" alt="Conseil Technologique" class="w-full h-full object-cover transform hover:scale-105 transition duration-700" />
          </div>
          <div class="order-1 md:order-2">
            <h2 class="text-4xl font-black text-lic-dark mb-6 tracking-tight">Conseil Technologique</h2>
            <p class="text-lg text-gray-600 mb-8 leading-relaxed">
              Guidance stratégique pour naviguer votre transformation digitale. Nous alignons la technologie avec vos objectifs métier et créons une feuille de route pour la réussite.
            </p>
            <ul class="space-y-4 mb-10">
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Audit Technologique:</strong> Évaluation complète de votre infrastructure IT</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Stratégie IT:</strong> Feuille de route technologique alignée avec vos besoins</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Digital Transformation:</strong> Accompagnement de vos projets de modernisation</span>
              </li>
              <li class="flex gap-3">
                <span class="text-lic-orange font-bold">•</span>
                <span class="text-gray-700"><strong>Sécurité & Compliance:</strong> Audit de sécurité et conformité réglementaire</span>
              </li>
            </ul>
            <NuxtLink to="/contact" class="text-lic-blue hover:text-lic-orange font-bold transition">
              Demander une Consultation →
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="py-24 bg-lic-light">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 class="text-4xl font-black text-lic-dark mb-16 tracking-tight text-center">
          Notre Approche
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-lic-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 font-black text-2xl">1</div>
            <h3 class="font-bold text-lic-dark mb-3 text-lg">Diagnostic</h3>
            <p class="text-gray-600 text-sm">Compréhension approfondie de vos besoins et défis technologiques.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-lic-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 font-black text-2xl">2</div>
            <h3 class="font-bold text-lic-dark mb-3 text-lg">Stratégie</h3>
            <p class="text-gray-600 text-sm">Planification détaillée et conception de la solution optimale.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-lic-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 font-black text-2xl">3</div>
            <h3 class="font-bold text-lic-dark mb-3 text-lg">Exécution</h3>
            <p class="text-gray-600 text-sm">Mise en œuvre agile et déploiement en environnement de production.</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-lic-blue text-white rounded-full flex items-center justify-center mx-auto mb-6 font-black text-2xl">4</div>
            <h3 class="font-bold text-lic-dark mb-3 text-lg">Support</h3>
            <p class="text-gray-600 text-sm">Maintenance continue et amélioration progressive de votre solution.</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
