<script setup>
const { generateResponsiveAttrs } = useResponsiveImage()

const resources = [
  {
    category: 'DevOps',
    duration: '15 min',
    title: 'Introduction au DevOps',
    description: "Comprendre les bases de la culture DevOps, les outils principaux (Docker, Kubernetes) et l'intégration continue.",
    image: 'https://images.unsplash.com/photo-1607799275518-d58665d099db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: 'https://www.youtube.com/watch?v=0yWAtQ6GGXE'
  },
  {
    category: 'Frontend',
    duration: '45 min',
    title: 'Maîtriser React.js en 2025',
    description: 'Un guide complet pour démarrer avec React. Les hooks, les composants fonctionnels et le state management.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: 'https://www.youtube.com/watch?v=bMknfKXIFA8'
  },
  {
    category: 'Cloud',
    duration: '30 min',
    title: 'Architecture Cloud AWS',
    description: 'Découvrez comment concevoir des architectures robustes et scalables sur Amazon Web Services.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: 'https://www.youtube.com/watch?v=rrK1uK0m5wc'
  },
  {
    category: 'Sécurité',
    duration: '20 min',
    title: 'Sécurité des Applications Web',
    description: 'Les failles courantes (OWASP Top 10) et comment sécuriser vos applications contre les attaques.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    category: 'Agile',
    duration: '10 min',
    title: 'Gestion de Projet Agile',
    description: 'Comment livrer de la valeur plus rapidement avec la méthodologie Scrum. Rôles et événements.',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  },
  {
    category: 'Data',
    duration: '1h 15m',
    title: 'Data Science avec Python',
    description: "Introduction à l'analyse de données avec Pandas, NumPy et la visualisation avec Matplotlib.",
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    link: '#'
  }
]

useHead({
  title: 'Formation Gratuite - LIC',
  meta: [
    { name: 'description', content: 'Tutoriels et ressources gratuits pour développer vos compétences IT.' }
  ]
})
</script>

<template>
  <div class="bg-white min-h-screen">
    
    <!-- Simple Header -->
    <section class="pt-20 pb-12 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl">
          <span class="text-lic-orange font-bold tracking-widest uppercase text-sm mb-2 block">LIC Academy</span>
          <h1 class="text-4xl md:text-5xl font-black text-lic-dark mb-6 tracking-tight">
            Apprenez & Grandissez
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            Une sélection de nos meilleures ressources pour vous aider à maîtriser les technologies qui façonnent le monde de demain.
          </p>
        </div>
      </div>
    </section>

    <!-- Library Grid -->
    <section class="pb-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(resource, index) in resources" 
            :key="index" 
            class="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-lic-blue/50 transition-all duration-300 hover:shadow-lg flex flex-col"
          >
            <!-- Thumbnail -->
            <a :href="resource.link" target="_blank" class="block relative aspect-video overflow-hidden bg-gray-100">
              <img
                :src="resource.image"
                :srcset="generateResponsiveAttrs(resource.image, '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 400px').srcset"
                :sizes="generateResponsiveAttrs(resource.image, '(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 400px').sizes"
                :alt="resource.title"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              
              <!-- Play Button -->
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-90 group-hover:scale-100">
                <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-lic-dark ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </div>
              </div>

              <!-- Badges -->
              <div class="absolute top-4 left-4 flex gap-2">
                 <span class="bg-lic-dark/90 text-white text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {{ resource.category }}
                </span>
              </div>
              <div class="absolute bottom-4 right-4">
                <span class="bg-black/70 text-white text-xs font-medium px-2 py-1 rounded backdrop-blur-sm flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ resource.duration }}
                </span>
              </div>
            </a>

            <!-- Info -->
            <div class="p-6 flex flex-col flex-grow">
              <h3 class="text-lg font-bold text-lic-dark mb-3 group-hover:text-lic-blue transition-colors leading-tight">
                <a :href="resource.link" target="_blank">{{ resource.title }}</a>
              </h3>
              <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-4">
                {{ resource.description }}
              </p>
              
              <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <a :href="resource.link" target="_blank" class="text-sm font-bold text-lic-blue hover:text-lic-orange transition-colors flex items-center">
                  Regarder maintenant
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Redesigned -->
    <section class="py-20 bg-gray-50 border-t border-gray-200">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="bg-white rounded-3xl p-8 md:p-16 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-12">
                <div class="max-w-lg">
                    <h2 class="text-3xl font-black text-lic-dark mb-4">Restez à jour</h2>
                    <p class="text-gray-600 text-lg">
                        Recevez nos derniers tutoriels et actualités tech directement dans votre boîte mail. Pas de spam, promis.
                    </p>
                </div>
                <div class="w-full max-w-md">
                    <form class="flex flex-col gap-4" @submit.prevent>
                        <div class="relative">
                             <input type="email" placeholder="Votre adresse email" class="w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl text-lic-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lic-blue/20 focus:border-lic-blue transition-all" />
                        </div>
                        <button class="w-full bg-lic-dark hover:bg-black text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center group">
                            S'inscrire
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </form>
                    <p class="text-xs text-gray-400 mt-4 text-center md:text-left">
                        En vous inscrivant, vous acceptez notre politique de confidentialité.
                    </p>
                </div>
            </div>
        </div>
    </section>

  </div>
</template>
