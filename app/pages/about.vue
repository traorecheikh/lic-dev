<template>
    <div class="bg-white overflow-hidden">
        <!-- Modern Split Hero -->
        <section class="relative bg-lic-dark text-white">
            <div class="grid grid-cols-1 lg:grid-cols-2">
                <div class="relative h-64 lg:h-auto overflow-hidden">
                    <img
                        src="@/assets/banner.png"
                        alt="Notre Mission"
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
                            >À Propos de Nous</span
                        >
                        <h1
                            class="text-5xl md:text-6xl font-black mb-8 leading-tight"
                        >
                            L'excellence technologique,
                            <span class="text-lic-blue">made in Africa.</span>
                        </h1>
                        <p class="text-lg text-gray-300 leading-relaxed mb-8">
                            LIC est bien plus qu'une entreprise de services
                            numériques. C'est le fruit d'une ambition : celle de
                            prouver que l'expertise africaine peut rivaliser
                            avec les standards mondiaux les plus exigeants.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Story & Vision - Bento Grid Style -->
        <section class="py-24 max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 grid-rows-2">
                <!-- Story Block (Large) -->
                <div
                    class="md:col-span-2 bg-gray-50 rounded-3xl p-10 relative overflow-hidden group hover:shadow-lg transition-shadow duration-300"
                >
                    <div class="relative z-10">
                        <h2 class="text-3xl font-black text-lic-dark mb-6">
                            Notre Histoire
                        </h2>
                        <div class="space-y-4 text-gray-600 leading-relaxed">
                            <p>
                                Tout a commencé avec une observation simple : le
                                talent est universel, mais les opportunités ne
                                le sont pas. Makhmadane Lo a fondé LO IT
                                CONSULTING pour combler ce fossé.
                            </p>
                            <p>
                                Parti d'une petite équipe de développeurs
                                passionnés, LIC est devenu un hub d'innovation
                                incontournable, accompagnant plus de 200
                                entreprises, des startups locales aux
                                multinationales, dans leur transformation
                                numérique.
                            </p>
                        </div>
                    </div>
                    <div
                        class="absolute top-0 right-0 w-64 h-64 bg-gray-200 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity"
                    ></div>
                </div>

                <!-- Stat Block 1 -->
                <div
                    class="bg-lic-blue text-white rounded-3xl p-10 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300"
                >
                    <span class="text-6xl font-black mb-2">200+</span>
                    <span class="text-blue-200 font-medium"
                        >Projets Livrés</span
                    >
                </div>

                <!-- Stat Block 2 -->
                <div
                    class="bg-lic-orange text-white rounded-3xl p-10 flex flex-col justify-center items-center text-center hover:scale-[1.02] transition-transform duration-300"
                >
                    <span class="text-6xl font-black mb-2">15+</span>
                    <span class="text-orange-200 font-medium"
                        >Années d'Expérience</span
                    >
                </div>

                <!-- Vision Block -->
                <div
                    class="md:col-span-2 bg-lic-dark text-white rounded-3xl p-10 relative overflow-hidden flex items-center"
                >
                    <div class="relative z-10 max-w-xl">
                        <h2 class="text-3xl font-black text-lic-orange mb-4">
                            Notre Vision
                        </h2>
                        <p class="text-gray-300 text-lg">
                            Devenir le partenaire technologique de référence en
                            Afrique de l'Ouest, reconnu pour sa capacité à
                            résoudre des problèmes complexes par des solutions
                            simples, élégantes et robustes.
                        </p>
                    </div>
                    <!-- Decorative pattern -->
                    <div
                        class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"
                    ></div>
                </div>
            </div>
        </section>

            <!-- Founder Spotlight -->

            <section class="py-24 bg-lic-light relative">

              <div class="max-w-7xl mx-auto px-6 lg:px-8">

                <div class="bg-white rounded-3xl shadow-xl overflow-hidden">

                  <div class="grid grid-cols-1 lg:grid-cols-12">

                    <!-- Image Side: Added min-h for desktop and object-top -->

                    <div class="lg:col-span-5 relative h-[500px] lg:h-full lg:min-h-[600px]">

                      <img src="@/assets/founder.jpg" alt="Makhmadane Lo" class="absolute inset-0 w-full h-full object-cover object-top" />

                      <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:bg-none"></div>

                       <div class="absolute bottom-0 left-0 p-8 lg:hidden text-white">

                          <h3 class="text-3xl font-black">Makhmadane Lo</h3>

                          <p class="font-medium text-lic-orange">Directeur Général</p>

                       </div>

                    </div>

                    <div class="lg:col-span-7 p-10 lg:p-16 flex flex-col justify-center">

                      <div class="hidden lg:block mb-6">

                        <h3 class="text-4xl font-black text-lic-dark mb-2">Makhmadane Lo</h3>

                        <p class="text-xl font-bold text-lic-orange">Directeur Général & Fondateur</p>

                      </div>

                      

                      <svg class="w-12 h-12 text-gray-300 mb-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9.01697V12H14.017V5H8.01697C6.9124 5 6.01697 5.89543 6.01697 7V19C6.01697 20.1046 6.9124 21 8.01697 21H14.017ZM21.017 21L21.017 18C21.017 16.8954 20.1216 16 19.017 16H16.017V12H21.017V5H15.017C13.9124 5 13.017 5.89543 13.017 7V19C13.017 20.1046 13.9124 21 15.017 21H21.017Z" /></svg>

                      

                      <blockquote class="text-xl text-gray-600 italic leading-relaxed mb-8">

                        "Chez LIC, nous ne cherchons pas à suivre les tendances, nous cherchons à créer de la valeur durable. Chaque ligne de code que nous écrivons est un engagement envers la réussite de nos clients."

                      </blockquote>

                      

                      <div>

                        <NuxtLink to="/equipe" class="inline-flex items-center font-bold text-lic-blue hover:text-lic-orange transition-colors group">

                          Rencontrer toute l'équipe 

                          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">

                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />

                          </svg>

                        </NuxtLink>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </section>

        <!-- Values Grid -->
        <section class="py-24 bg-white">
            <div class="max-w-7xl mx-auto px-6 lg:px-8">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-black text-lic-dark mb-4">
                        Nos Piliers
                    </h2>
                    <p class="text-gray-600 text-lg">
                        Ce qui guide chacune de nos décisions
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div class="text-center group">
                        <div
                            class="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-lic-blue transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-10 w-10 text-lic-blue group-hover:text-white transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-lic-dark mb-3">
                            Excellence
                        </h3>
                        <p class="text-gray-500 leading-relaxed">
                            Nous ne nous contentons jamais de "suffisant". Nous
                            visons l'exceptionnel dans chaque projet.
                        </p>
                    </div>

                    <div class="text-center group">
                        <div
                            class="w-20 h-20 mx-auto bg-orange-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-lic-orange transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-10 w-10 text-lic-orange group-hover:text-white transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-lic-dark mb-3">
                            Humain
                        </h3>
                        <p class="text-gray-500 leading-relaxed">
                            La technologie est un outil, l'humain est la
                            finalité. Nous plaçons l'utilisateur au centre.
                        </p>
                    </div>

                    <div class="text-center group">
                        <div
                            class="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-lic-dark transition-colors duration-300"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-10 w-10 text-gray-600 group-hover:text-white transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl font-bold text-lic-dark mb-3">
                            Local & Global
                        </h3>
                        <p class="text-gray-500 leading-relaxed">
                            Ancrés au Sénégal, ouverts sur le monde. Nous
                            apportons le meilleur des deux mondes.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <CallToAction
            title="Une vision à partager ?"
            description="Venez en discuter avec nous autour d'un café ou en visio."
            button-text="Contactez-nous"
            button-link="/contact"
        />
    </div>
</template>

<script setup>
useHead({
    title: "À Propos - LO IT CONSULTING",
    meta: [
        {
            name: "description",
            content:
                "Découvrez l'histoire, la vision et le fondateur de LO IT CONSULTING.",
        },
    ],
});
</script>
