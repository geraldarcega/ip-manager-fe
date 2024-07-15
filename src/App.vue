<script setup>
import { RouterView } from 'vue-router'
import Theme from './layouts/Theme.vue';
</script>

<template>
  <Theme>
    <RouterView :key="$route.fullPath"/>
  </Theme>
</template>