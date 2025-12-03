<template>
    <div class="bg-white">
        <!-- Integrated Hero & Form Section -->
        <section
            class="relative min-h-[85vh] flex items-center justify-center bg-lic-dark text-white"
        >
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    width="2070"
                    height="1200"
                    alt="Contactez-nous"
                    class="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-r from-lic-dark/90 via-lic-dark/80 to-lic-dark/40"
                ></div>
            </div>

            <div
                class="relative z-10 w-full max-w-7xl mx-auto px-[5%] lg:px-[10%] py-8 lg:py-12 flex items-center"
            >
                <div
                    class="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 lg:gap-12 items-stretch w-full"
                >
                    <!-- Left Column: Content & Info -->
                    <div>
                        <span
                            class="text-lic-orange-dark font-bold tracking-widest uppercase text-sm mb-3 block"
                            >Parlons de Votre Projet</span
                        >
                        <h1
                            class="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight"
                        >
                            Contactez-Nous
                        </h1>
                        <p class="text-lg text-gray-300 leading-relaxed mb-8">
                            Discutons de vos défis technologiques et découvrez
                            comment LIC peut accélérer votre transformation
                            digitale.
                        </p>

                        <!-- Contact Details List -->
                        <div class="space-y-6">
                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 bg-lic-orange-dark/20 text-lic-orange-dark rounded-full flex items-center justify-center flex-shrink-0"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p
                                        class="text-sm text-gray-400 font-bold uppercase tracking-wider"
                                    >
                                        Téléphone
                                    </p>
                                    <p class="text-white font-medium text-lg">
                                        +221 77 230 60 78
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 bg-lic-blue/20 text-lic-blue rounded-full flex items-center justify-center flex-shrink-0"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p
                                        class="text-sm text-gray-400 font-bold uppercase tracking-wider"
                                    >
                                        Email
                                    </p>
                                    <p class="text-white font-medium text-lg">
                                        contact@loitconsulting.com
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-center gap-4">
                                <div
                                    class="w-12 h-12 bg-lic-orange-dark/20 text-lic-orange-dark rounded-full flex items-center justify-center flex-shrink-0"
                                >
                                    <svg
                                        class="w-6 h-6"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        ></path>
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <div>
                                    <p
                                        class="text-sm text-gray-400 font-bold uppercase tracking-wider"
                                    >
                                        Adresse
                                    </p>
                                    <p class="text-white font-medium text-lg">
                                        CICES FOIRE VILLA 111, Dakar
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column: Form -->
                    <div
                        id="contact-form"
                        class="bg-white rounded-2xl shadow-2xl p-6 lg:p-8 relative overflow-hidden h-full flex flex-col justify-center"
                    >
                        <div class="relative z-10">
                            <h2 class="text-2xl font-black text-lic-dark mb-4">
                                Envoyer un Message
                            </h2>

                            <form
                                @submit.prevent="handleSubmit"
                                class="space-y-3"
                            >
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-3"
                                >
                                    <div>
                                        <label
                                            class="block text-sm font-bold text-lic-dark mb-1"
                                            >Nom Complet</label
                                        >
                                        <input
                                            v-model="form.name"
                                            type="text"
                                            required
                                            class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-orange focus:ring-2 focus:ring-lic-orange/20 transition text-base text-lic-dark"
                                            placeholder="Votre nom"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block text-sm font-bold text-lic-dark mb-1"
                                            >Email</label
                                        >
                                        <input
                                            v-model="form.email"
                                            type="email"
                                            required
                                            class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-orange focus:ring-2 focus:ring-lic-orange/20 transition text-base text-lic-dark"
                                            placeholder="votre@email.com"
                                        />
                                    </div>
                                </div>

                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-3"
                                >
                                    <div>
                                        <label
                                            class="block text-sm font-bold text-lic-dark mb-1"
                                            >Téléphone</label
                                        >
                                        <input
                                            v-model="form.phone"
                                            type="tel"
                                            class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-orange focus:ring-2 focus:ring-lic-orange/20 transition text-base text-lic-dark"
                                            placeholder="+221..."
                                        />
                                    </div>
                                    <div>
                                        <label
                                            class="block text-sm font-bold text-lic-dark mb-1"
                                            >Sujet</label
                                        >
                                        <select
                                            v-model="form.subject"
                                            required
                                            class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-orange focus:ring-2 focus:ring-lic-orange/20 transition text-base text-lic-dark"
                                        >
                                            <option value="">
                                                Sélectionner un sujet
                                            </option>
                                            <option value="Demander une demo">
                                                Demander une demo
                                            </option>
                                            <option value="devis">
                                                Demande de Devis
                                            </option>
                                            <option value="partenariat">
                                                Partenariat
                                            </option>
                                            <option value="recrutement">
                                                Recrutement
                                            </option>
                                            <option value="autre">Autre</option>
                                        </select>
                                    </div>
                                </div>

                                <div
                                    v-if="form.subject === 'Demander une demo'"
                                >
                                    <label
                                        class="block text-sm font-bold text-lic-dark mb-1"
                                        >Projet</label
                                    >
                                    <select
                                        v-model="form.project"
                                        class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-orange focus:ring-2 focus:ring-lic-orange/20 transition text-base text-lic-dark"
                                    >
                                        <option value="">
                                            Sélectionner un projet
                                        </option>
                                        <option
                                            v-for="p in projects"
                                            :key="p"
                                            :value="p"
                                        >
                                            {{ p }}
                                        </option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        class="block text-sm font-bold text-lic-dark mb-1"
                                        >Message</label
                                    >
                                    <textarea
                                        v-model="form.message"
                                        rows="3"
                                        required
                                        class="w-full px-3 py-2 rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:border-lic-orange focus:ring-2 focus:ring-lic-orange/20 transition resize-none text-base text-lic-dark"
                                        placeholder="Dites-nous en plus..."
                                    ></textarea>
                                </div>

                                <div class="pt-2 flex justify-center">
                                    <button
                                        type="submit"
                                        class="w-2/3 bg-lic-orange-dark hover:bg-orange-800 text-white font-bold px-6 py-3 rounded-lg transition duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center text-base"
                                    >
                                        Envoyer le Message
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="h-4 w-4 ml-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <!-- Success Message -->
                                <div
                                    v-if="submitted"
                                    class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center text-sm"
                                >
                                    <p class="font-bold">Message Envoyé! ✓</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="py-24 bg-white border-t border-gray-100">
            <div class="max-w-4xl mx-auto px-6 lg:px-8">
                <h2
                    class="text-3xl font-black text-lic-dark mb-12 tracking-tight text-center"
                >
                    Questions Fréquentes
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div class="p-6 bg-gray-50 rounded-2xl">
                        <h3 class="font-bold text-lic-dark mb-2">
                            Quel est votre délai de réponse?
                        </h3>
                        <p class="text-sm text-gray-600">
                            Nous répondons sous 24h ouvrées.
                        </p>
                    </div>
                    <div class="p-6 bg-gray-50 rounded-2xl">
                        <h3 class="font-bold text-lic-dark mb-2">
                            La consultation est-elle gratuite?
                        </h3>
                        <p class="text-sm text-gray-600">
                            Oui, le premier échange est 100% gratuit.
                        </p>
                    </div>
                    <div class="p-6 bg-gray-50 rounded-2xl">
                        <h3 class="font-bold text-lic-dark mb-2">
                            Où êtes-vous situés?
                        </h3>
                        <p class="text-sm text-gray-600">
                            Nous sommes basés à Dakar, mais opérons partout.
                        </p>
                    </div>
                    <div class="p-6 bg-gray-50 rounded-2xl">
                        <h3 class="font-bold text-lic-dark mb-2">
                            Recrutez-vous?
                        </h3>
                        <p class="text-sm text-gray-600">
                            Consultez notre page LinkedIn pour les offres.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const route = useRoute();

const projects = [
    "Site Vitrine",
    "E-commerce",
    "Application Mobile",
    "ERP/CRM",
    "Autre",
];

useHead({
    title: "Contact - LO IT CONSULTING",
    meta: [
        {
            name: "description",
            content:
                "Contactez notre équipe pour discuter de votre projet de transformation digitale.",
        },
    ],
});

const form = ref({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    project: "",
    message: "",
});

// Watch for route query changes to handle navigation within the same page
watch(
    () => route.query.subject,
    (newSubject) => {
        if (newSubject) {
            form.value.subject = newSubject as string;
        } else {
            form.value.subject = "";
        }
    },
    { immediate: true },
);

const submitted = ref(false);

const handleSubmit = async () => {
    console.log("Form submitted:", form.value);
    submitted.value = true;

    // Reset form
    form.value = {
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
    };

    setTimeout(() => {
        submitted.value = false;
    }, 5000);
};
</script>
