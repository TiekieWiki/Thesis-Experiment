<template>
  <div class="tap-menu">
    <div class="menu">
      <transition name="switch" mode="out-in">
        <button v-if="!menuOpen" @click="menuOpen = true">
          <font-awesome-icon :icon="['fas', 'bars']" />
          <p>Menu</p>
        </button>
        <button v-else>
          <font-awesome-icon
            @click="menuOpen = false"
            :icon="['fas', 'xmark']"
          />
          <p>Menu</p>
        </button>
      </transition>
      <ul v-if="menuOpen">
        <li v-for="item in menuItems" :key="item">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const menuOpen = ref<boolean>(false)
const menuItems: string[] = ['A', 'B', 'C']
</script>
