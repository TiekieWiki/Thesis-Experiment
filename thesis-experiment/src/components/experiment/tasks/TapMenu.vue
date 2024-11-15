<template>
  <div :class="['tap-menu', interfaceOrientation]">
    <div class="menu">
      <button @click="menuClicked()" ref="menu">
        <transition name="switch" mode="out-in">
          <font-awesome-icon v-if="!menuOpen" :icon="['fas', 'bars']" />
          <font-awesome-icon v-else :icon="['fas', 'xmark']" />
        </transition>
        <p>Menu</p>
      </button>
      <ul v-if="menuOpen">
        <li>
          <a @click="menuOpen = true">A</a>
        </li>
        <li @click="finishTask()" ref="menuItem">
          <a href="#">B</a>
        </li>
        <li>
          <a @click="menuOpen = true">C</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Action } from '@/utils/types/measurements'
import { onMounted, ref, useTemplateRef, watch } from 'vue'

defineProps<{
  interfaceOrientation: string
  hand: string
}>()

const emit = defineEmits(['finishedTask', 'currentAction'])

// Menu
const menu = useTemplateRef('menu')
const menuItem = useTemplateRef('menuItem')
const menuOpen = ref<boolean>(false)

// Measurements
const currentAction = ref<Action>({
  action: 'clickMenu',
  centerX: 0,
  centerY: 0,
})

// Set initial action
onMounted(() => {
  currentAction.value = {
    action: 'clickMenu',
    centerX: menu.value
      ? menu.value.offsetLeft + menu.value.offsetWidth / 2
      : 0,
    centerY: menu.value
      ? menu.value.offsetTop + menu.value.offsetHeight / 2
      : 0,
  }
})

// Emit current action
watch(
  () => currentAction.value,
  () => {
    emit('currentAction', currentAction.value)
  },
  { immediate: true },
)

/**
 * Set menu open and set current action
 */
function menuClicked() {
  menuOpen.value = true
  currentAction.value = {
    action: 'clickMenuItem',
    centerX: menuItem.value
      ? menuItem.value.offsetLeft + menuItem.value.offsetWidth / 2
      : 0,
    centerY: menuItem.value
      ? menuItem.value.offsetTop + menuItem.value.offsetHeight / 2
      : 0,
  }
}

/**
 * Finish task
 */
function finishTask() {
  emit('finishedTask')
}
</script>
