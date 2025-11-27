<template>
  <div class="bg-white">
    <!-- Hero Section -->
    <section class="relative py-20 bg-lic-light overflow-hidden">
      <div class="absolute inset-0 opacity-10 bg-[url('/assets/pattern.png')]"></div> <!-- Optional pattern -->
      <div class="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-5xl md:text-6xl font-black text-lic-dark mb-6 tracking-tight">
            Rencontrez <span class="text-lic-blue">l'Équipe</span>
          </h1>
          <p class="text-xl text-gray-600 leading-relaxed">
            Une équipe passionnée et experte, unie par une vision commune : transformer vos idées en réalités numériques impactantes.
          </p>
        </div>
      </div>
    </section>

    <!-- Team Grid -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <!-- Team Member 1: Makhmadane LO -->
          <div class="group">
            <div class="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] mb-4">
              <img src="@/assets/founder.jpg" alt="Makhmadane LO" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div class="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p class="font-medium">"Diriger par l'innovation et l'excellence."</p>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-black text-lic-dark">Makhmadane LO</h3>
            <p class="text-lic-blue font-bold mb-2">Directeur Général</p>
            <p class="text-gray-600 text-sm">Visionnaire et leader stratégique, il façonne l'avenir de LIC avec détermination et ingéniosité.</p>
          </div>

          <!-- Team Member 2: Cheikh Tidiane TRAORÉ -->
          <div class="group">
            <div class="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] mb-4">
              <img src="@/assets/team1.png" alt="Cheikh Tidiane TRAORÉ" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                 <div class="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p class="font-medium">"Je construis des expériences utilisateurs robustes et intuitives."</p>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-black text-lic-dark">Cheikh Tidiane TRAORÉ</h3>
            <p class="text-lic-orange font-bold mb-2">Développeur Full Stack</p>
            <p class="text-gray-600 text-sm">Maître des technologies frontend et backend, il crée des applications performantes et évolutives.</p>
          </div>

          <!-- Team Member 3: Placeholder -->
          <div class="group">
            <div class="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] mb-4">
              <img src="@/assets/team2.jpg" alt="Membre de l'équipe 3" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                 <div class="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p class="font-medium">"Chaque défi est une opportunité d'apprendre."</p>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-black text-lic-dark">Membre de l'équipe 3</h3>
            <p class="text-lic-blue font-bold mb-2">Spécialiste Cloud</p>
            <p class="text-gray-600 text-sm">Architecte d'infrastructures cloud fiables et sécurisées, il garantit la performance de nos solutions.</p>
          </div>

          <!-- Team Member 4: Placeholder -->
          <div class="group">
            <div class="relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/5] mb-4">
              <img src="@/assets/team3.jpg" alt="Membre de l'équipe 4" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                 <div class="text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p class="font-medium">"L'agilité est la clé du succès de nos projets."</p>
                </div>
              </div>
            </div>
            <h3 class="text-xl font-black text-lic-dark">Membre de l'équipe 4</h3>
            <p class="text-lic-orange font-bold mb-2">Chef de Projet Agile</p>
            <p class="text-gray-600 text-sm">Orchestrateur de nos projets, il assure une collaboration fluide et des livraisons réussies.</p>
          </div>

        </div>
      </div>
    </section>
    
    <!-- Values or Culture -->
    <section class="py-20 bg-lic-light">
        <div class="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <h2 class="text-3xl font-black text-lic-dark mb-8">Pourquoi nous rejoindre ?</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="p-6 bg-white rounded-xl shadow-sm">
                    <h3 class="text-xl font-bold text-lic-blue mb-2">Innovation</h3>
                    <p class="text-gray-600">Travaillez sur les dernières technologies.</p>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-sm">
                    <h3 class="text-xl font-bold text-lic-orange mb-2">Impact</h3>
                    <p class="text-gray-600">Créez des solutions qui comptent.</p>
                </div>
                <div class="p-6 bg-white rounded-xl shadow-sm">
                    <h3 class="text-xl font-bold text-lic-dark mb-2">Équipe</h3>
                    <p class="text-gray-600">Une ambiance collaborative et bienveillante.</p>
                </div>
            </div>
        </div>
    </section>

  </div>
</template>

<script setup>
useHead({
  title: 'Notre Équipe - LIC',
  meta: [
    { name: 'description', content: 'Découvrez les experts passionnés derrière LIC.' }
  ]
})
</script>