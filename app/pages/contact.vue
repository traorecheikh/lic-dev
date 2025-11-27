<template>
  <div class="bg-white">
    <!-- Hero -->
    <section class="py-20 bg-lic-light">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 class="text-5xl md:text-6xl font-black text-lic-dark mb-6 tracking-tight">
          Contactez-Nous
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl">
          Discutons de vos défis technologiques et explorez comment LIC peut vous aider.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16">
          <!-- Contact Info -->
          <div>
            <h2 class="text-3xl font-black text-lic-dark mb-12">Coordonnées</h2>

            <!-- Phone -->
            <div class="mb-12">
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-2">TÉLÉPHONE</p>
              <p class="text-2xl font-bold text-lic-dark mb-2">+221 77 230 60 78</p>
              <p class="text-gray-600">Lundi - Vendredi, 8h00 - 18h00 (GMT)</p>
            </div>

            <!-- Email -->
            <div class="mb-12">
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-2">EMAIL</p>
              <p class="text-2xl font-bold text-lic-dark mb-2">contact@loitconsulting.com</p>
              <p class="text-gray-600">Réponse en moins de 24h</p>
            </div>

            <!-- Address -->
            <div class="mb-12">
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-2">ADRESSE</p>
              <p class="text-2xl font-bold text-lic-dark mb-2">CICES FOIRE VILLA 111</p>
              <p class="text-gray-600">Dakar, Sénégal</p>
            </div>

            <!-- Social -->
            <div class="pt-8 border-t border-gray-200">
              <p class="text-sm font-bold text-lic-orange tracking-widest mb-6">SUIVEZ-NOUS</p>
              <div class="flex gap-4">
                <a href="#" class="w-12 h-12 bg-lic-blue text-white rounded-full flex items-center justify-center hover:bg-lic-orange transition">
                  <span class="text-lg">f</span>
                </a>
                <a href="#" class="w-12 h-12 bg-lic-blue text-white rounded-full flex items-center justify-center hover:bg-lic-orange transition">
                  <span class="text-lg">in</span>
                </a>
                <a href="#" class="w-12 h-12 bg-lic-blue text-white rounded-full flex items-center justify-center hover:bg-lic-orange transition">
                  <span class="text-lg">@</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="bg-lic-light p-12 rounded-lg">
            <h2 class="text-2xl font-black text-lic-dark mb-8">Envoyer un Message</h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name -->
              <div>
                <label class="block text-sm font-bold text-lic-dark mb-2">Nom Complet</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-b-2 border-lic-dark bg-transparent focus:outline-none focus:border-lic-orange transition"
                  placeholder="Jean Dupont"
                />
              </div>

              <!-- Email -->
              <div>
                <label class="block text-sm font-bold text-lic-dark mb-2">Adresse Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border-b-2 border-lic-dark bg-transparent focus:outline-none focus:border-lic-orange transition"
                  placeholder="jean@exemple.com"
                />
              </div>

              <!-- Phone -->
              <div>
                <label class="block text-sm font-bold text-lic-dark mb-2">Téléphone (optionnel)</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border-b-2 border-lic-dark bg-transparent focus:outline-none focus:border-lic-orange transition"
                  placeholder="+221 XX XXX XX XX"
                />
              </div>

              <!-- Company -->
              <div>
                <label class="block text-sm font-bold text-lic-dark mb-2">Entreprise</label>
                <input
                  v-model="form.company"
                  type="text"
                  class="w-full px-4 py-3 border-b-2 border-lic-dark bg-transparent focus:outline-none focus:border-lic-orange transition"
                  placeholder="Nom de votre entreprise"
                />
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-sm font-bold text-lic-dark mb-2">Sujet</label>
                <select
                  v-model="form.subject"
                  required
                  class="w-full px-4 py-3 border-b-2 border-lic-dark bg-transparent focus:outline-none focus:border-lic-orange transition"
                >
                  <option value="">Sélectionner un sujet</option>
                  <option value="formation">Formation IT</option>
                  <option value="developpement">Développement</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="conseil">Conseil Technologique</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <!-- Message -->
              <div>
                <label class="block text-sm font-bold text-lic-dark mb-2">Message</label>
                <textarea
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 border-b-2 border-lic-dark bg-transparent focus:outline-none focus:border-lic-orange transition resize-none"
                  placeholder="Décrivez votre projet ou votre question..."
                ></textarea>
              </div>

              <!-- Submit -->
              <div>
                <button
                  type="submit"
                  class="w-full bg-lic-blue hover:bg-blue-700 text-white font-bold py-3 transition duration-300 mt-4"
                >
                  Envoyer le Message
                </button>
              </div>

              <!-- Success Message -->
              <div v-if="submitted" class="bg-green-50 border-l-4 border-green-600 text-green-700 px-4 py-3 rounded mt-4">
                <p class="font-bold">Message Envoyé!</p>
                <p class="text-sm">Merci pour votre message. Nous vous recontacterons rapidement.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-24 bg-lic-light">
      <div class="max-w-4xl mx-auto px-6 lg:px-8">
        <h2 class="text-4xl font-black text-lic-dark mb-16 tracking-tight text-center">
          Questions Fréquentes
        </h2>

        <div class="space-y-6">
          <!-- FAQ 1 -->
          <div class="bg-white p-8 rounded-lg border-l-4 border-lic-orange">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Quel est votre délai de réponse?</h3>
            <p class="text-gray-600">Nous répondons à tous les messages dans les 24 heures. Pour les demandes urgentes, appelez-nous directement au +221 77 230 60 78.</p>
          </div>

          <!-- FAQ 2 -->
          <div class="bg-white p-8 rounded-lg border-l-4 border-lic-orange">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Offrez-vous une consultation gratuite?</h3>
            <p class="text-gray-600">Oui! Nous proposons une consultation initiale gratuite de 30 minutes pour comprendre vos besoins et discuter de solutions potentielles.</p>
          </div>

          <!-- FAQ 3 -->
          <div class="bg-white p-8 rounded-lg border-l-4 border-lic-orange">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Travaillez-vous avec des entreprises de toutes tailles?</h3>
            <p class="text-gray-600">Absolument! De la PME à la grande entreprise, nous adaptons nos services à votre taille, vos besoins et votre budget.</p>
          </div>

          <!-- FAQ 4 -->
          <div class="bg-white p-8 rounded-lg border-l-4 border-lic-orange">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Proposez-vous du support après la livraison?</h3>
            <p class="text-gray-600">Oui, nous proposons des contrats de maintenance et support à long terme pour assurer la performance continue de votre solution.</p>
          </div>

          <!-- FAQ 5 -->
          <div class="bg-white p-8 rounded-lg border-l-4 border-lic-orange">
            <h3 class="text-lg font-bold text-lic-dark mb-3">Comment sont facturés vos services?</h3>
            <p class="text-gray-600">Nous proposons plusieurs modèles: par projet, temps dédié (T&M), ou support à long terme. Discutons de ce qui convient le mieux à votre situation.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 bg-lic-dark">
      <div class="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-black text-white mb-6">
          Prêt à Démarrer?
        </h2>
        <div class="flex flex-col md:flex-row gap-4 justify-center">
          <a href="tel:+221772306078" class="inline-block bg-lic-orange hover:bg-orange-600 text-white px-10 py-4 font-bold transition duration-300">
            Appeler Maintenant
          </a>
          <a href="mailto:contact@loitconsulting.com" class="inline-block border-2 border-lic-orange text-lic-orange hover:bg-lic-orange hover:text-white px-10 py-4 font-bold transition duration-300">
            Envoyer un Email
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  message: '',
})

const submitted = ref(false)

const handleSubmit = async () => {
  console.log('Form submitted:', form.value)

  submitted.value = true

  form.value = {
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  }

  setTimeout(() => {
    submitted.value = false
  }, 5000)
}
</script>
