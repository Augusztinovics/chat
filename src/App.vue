<script setup>
import { RouterView } from 'vue-router'
const socket = io();
</script>

<template>
  <RouterView :socket="socket"/>
</template>
