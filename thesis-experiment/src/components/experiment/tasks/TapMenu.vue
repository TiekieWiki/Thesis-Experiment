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
      <ul v-show="menuOpen">
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
  <div id="firstDiv"></div>
  <div id="secondDiv"></div>
</template>

<script setup lang="ts">
import type { Action } from '@/utils/types/measurements'
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue'

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
async function menuClicked() {
  const firstDiv = document.getElementById('firstDiv')

  // Define coordinates in pixels
  const x1 = currentAction.value.centerX // Horizontal position in pixels
  const y1 = currentAction.value.centerY // Vertical position in pixels

  // Apply coordinates to the div
  firstDiv!.style.left = x1 + 'px'
  firstDiv!.style.top = y1 + 'px'

  menuOpen.value = true

  // Set current action when menu items are loaded
  await nextTick()
  currentAction.value = {
    action: 'clickMenuItem',
    centerX: menuItem.value
      ? menuItem.value.offsetLeft + menuItem.value.offsetWidth / 2
      : 0,
    centerY: menuItem.value
      ? menuItem.value.offsetTop + menuItem.value.offsetHeight / 2
      : 0,
  }
  const secondDiv = document.getElementById('rightDiv')

  // Define coordinates in pixels
  const x2 = currentAction.value.centerX // Horizontal position in pixels
  const y2 = currentAction.value.centerY // Vertical position in pixels

  // Apply coordinates to the div
  secondDiv!.style.left = x2 + 'px'
  secondDiv!.style.top = y2 + 'px'
}

/**
 * Finish task
 */
function finishTask() {
  emit('finishedTask')
}
</script>

<style scoped>
#firstDiv,
#secondDiv {
  position: absolute;
  width: 1px;
  height: 1px;
  background-color: red;
}
</style>
