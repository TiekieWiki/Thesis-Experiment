<template>
  <div :class="['tap-menu', interfaceOrientation]">
    <div class="menu">
      <button @click.stop="menuOpen = !menuOpen">
        <transition name="switch" mode="out-in">
          <font-awesome-icon v-if="!menuOpen" :icon="['fas', 'bars']" />
          <font-awesome-icon v-else :icon="['fas', 'xmark']" />
        </transition>
        <p>Menu</p>
      </button>
      <ul v-if="menuOpen">
        <li v-for="item in menuItems" :key="item">
          <a
            href="#"
            @click.stop="item == 'About' ? next() : (menuOpen = true)"
            >{{ item }}</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { UserClick } from '@/utils/types/measurements'
import { ref, watch } from 'vue'

const props = defineProps<{
  interfaceOrientation: string
  hand: string
  userClick: UserClick
}>()

const emit = defineEmits(['finishedTask'])
function next() {
  emit('finishedTask')
}

const menuOpen = ref<boolean>(false)
const menuItems: string[] = ['Home', 'About', 'Contact']

watch(
  () => props.userClick,
  newValue => {
    console.log('User clicked:', newValue)
  },
  { immediate: true },
)
</script>
