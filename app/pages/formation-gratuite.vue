<script setup>
import { ArrowRight } from 'lucide-vue-next'; // Keep this for the arrow icon

const { generateResponsiveAttrs } = useResponsiveImage()
const { find } = useStrapi()

// Function to extract YouTube ID from various YouTube URL formats
const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

// Fetch data from Strapi and then enrich with YouTube data
const { data: strapiData, pending, error, refresh } = await useAsyncData('formation-videos', async () => {
  // Artificial delay to show skeleton (User request)
  await new Promise(resolve => setTimeout(resolve, 800));

  // 1. Get links from Strapi with Retry Logic (Handle server wake-up delay)
  let videosRes;
  const maxRetries = 10;
  let attempt = 0;

  while (attempt < maxRetries) {
    try {
      videosRes = await find('resources', { fields: ['link', 'slug'], sort: 'publishedAt:desc' });
      break; // Success
    } catch (err) {
      attempt++;
      console.warn(`Tentative de connexion au serveur ${attempt}/${maxRetries}...`);

      if (attempt >= maxRetries) {
        console.error('Server connection failed after multiple retries:', err);
        throw new Error(`Le serveur met plus de temps que prévu à répondre. Veuillez rafraîchir la page dans quelques instants.`);
      }

      // Wait before retrying (increasing delay: 5s, 10s, 15s, then 20s for the rest)
      const delay = Math.min(attempt * 5000, 20000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  if (!videosRes || !Array.isArray(videosRes.data)) {
      return [];
  }

  // 2. Enrich each video with YouTube data (Title, Duration, etc.)
  const processedVideos = await Promise.all(videosRes.data.map(async (v) => {
    const resourceLink = v.attributes?.link || v.link;
    const resourceSlug = v.attributes?.slug || v.slug;
    const youtubeId = getYouTubeId(resourceLink);

    let youtubeData = { title: 'Titre de vidéo', author: '', duration: 'N/A', thumbnail: '' };

    if (youtubeId) {
      try {
        // Call our internal server API to get details (oEmbed + Duration Scraper)
        youtubeData = await $fetch(`/api/video-metadata?videoId=${youtubeId}`);
      } catch (err) {
        // Fallback thumbnail if API fails
        youtubeData.thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
      }
    }
    
    return {
      id: v.id,
      category: 'Vidéo',
      duration: youtubeData.duration || 'N/A',
      title: youtubeData.title || 'Titre de vidéo',
      description: youtubeData.author ? `Vidéo de ${youtubeData.author}` : 'Description non disponible',
      image: youtubeData.thumbnail || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      link: resourceLink,
      youtubeId: youtubeId,
      slug: resourceSlug,
    };
  }));

  return processedVideos;
}, {
  lazy: true,
  server: false
});

const displayedResources = computed(() => {
  return strapiData.value || [];
});

useHead({
  title: 'Formation Gratuite - LIC',
  meta: [
    { name: 'description', content: 'Tutoriels et ressources vidéo gratuits pour développer vos compétences IT.' }
  ]
});
</script>

<template>
  <div class="bg-white min-h-screen">
    
    <!-- Header -->
    <section class="pt-20 pb-12 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="max-w-3xl">
          <span class="text-lic-orange font-bold tracking-widest uppercase text-sm mb-2 block">LIC Academy</span>
          <h1 class="text-4xl md:text-5xl font-black text-lic-dark mb-6 tracking-tight">
            Apprenez & Grandissez
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            Une sélection de nos meilleures ressources vidéos pour vous aider à maîtriser les technologies de demain.
          </p>
        </div>
      </div>
    </section>

    <!-- Video Resources Grid -->
    <section class="pb-24 bg-white">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="flex items-center justify-between mb-8">
           <h2 class="text-2xl font-bold text-lic-dark">Tutoriels Vidéos</h2>
        </div>

        <!-- Loading State (Skeleton) - Show only if pending AND no data -->
        <div v-if="pending && (!strapiData || strapiData.length === 0)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="n in 6" :key="n" class="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm animate-pulse flex flex-col">
            <!-- Image Skeleton -->
            <div class="w-full aspect-video bg-gray-200"></div>
            <!-- Content Skeleton -->
            <div class="p-6 flex flex-col gap-4">
              <div class="h-6 bg-gray-200 rounded w-3/4"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-2/3"></div>
              <div class="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                 <div class="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Error State - Show only if error AND no data -->
        <div v-else-if="error && (!strapiData || strapiData.length === 0)" class="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-2">Oups ! Une erreur est survenue</h3>
            <p class="text-gray-600 mb-4 max-w-md mx-auto">Nous n'avons pas pu charger les vidéos.</p>
            
            <div v-if="error" class="mb-6 text-left bg-red-50 p-4 rounded-lg border border-red-100 overflow-auto max-w-lg mx-auto">
              <p class="text-xs font-bold text-red-700 uppercase mb-1">Détails techniques :</p>
              <code class="text-xs text-red-600 block break-words">{{ error.message || error }}</code>
              <p v-if="error.statusCode === 500 || error.message?.includes('Strapi')" class="mt-2 text-xs text-red-500 italic">
                Conseil : Vérifiez que le serveur Strapi est démarré et accessible.
              </p>
            </div>

            <button @click="refresh" class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-lic-dark hover:bg-black transition-all shadow-lg hover:shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Réessayer
            </button>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(resource, index) in displayedResources" 
            :key="resource.id || index" 
            class="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-lic-blue/50 transition-all duration-300 hover:shadow-lg flex flex-col"
          >
            <!-- Thumbnail -->
            <a :href="resource.link" target="_blank" class="block relative aspect-video overflow-hidden bg-gray-100">
              <img
                :src="resource.image"
                :srcset="generateResponsiveAttrs(resource.image, 'card').srcset"
                :sizes="generateResponsiveAttrs(resource.image, 'card').sizes"
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