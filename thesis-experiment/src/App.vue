<template>
  <a href="#">Test</a
  ><img src="./assets/images/Test.jpg" alt="Photo by Greg Becker on Unsplash" />
  <div class="menu">
    <transition name="switch" mode="out-in">
      <font-awesome-icon
        v-if="!menuOpen"
        @click="menuOpen = true"
        :icon="['fas', 'bars']"
      />
      <font-awesome-icon
        v-else
        @click="menuOpen = false"
        :icon="['fas', 'xmark']"
      />
    </transition>
    <ul v-if="menuOpen">
      <li v-for="item in menuItems" :key="item">
        <a href="#">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref<boolean>(false)
const menuItems: string[] = ['A', 'B', 'C']
</script>
