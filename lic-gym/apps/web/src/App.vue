<script setup lang="ts">
import { brand } from '@gym/ui';
import { formatMoney } from '@gym/utils';
import { shellRoutes } from './shells';

const sampleRevenue = formatMoney({ amountMinor: 125000, currency: 'XOF' });
</script>

<template>
  <main class="app-shell">
    <header class="app-header">
      <h1>{{ brand.appName }}</h1>
      <p>{{ brand.tagline }}</p>
      <p class="app-meta">Sample money format from shared utils: {{ sampleRevenue }}</p>
    </header>
    <nav class="shell-nav">
      <RouterLink
        v-for="shellRoute in shellRoutes"
        :key="shellRoute.shell"
        :to="shellRoute.path"
        class="shell-link"
      >
        {{ shellRoute.title }}
      </RouterLink>
    </nav>
    <router-view />
  </main>
</template>
