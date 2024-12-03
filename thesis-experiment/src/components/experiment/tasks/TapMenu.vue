<template>
  <div :class="['tap-menu', interfaceOrientation]">
    <div class="menu">
      <button @click="menuClicked" ref="menuRef">
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
        <li @click="finishTask" ref="menuItemRef">
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
import type { Action } from '@/utils/types/measurements';
import { nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';

defineProps<{
  interfaceOrientation: string;
  hand: string;
}>();

const emit = defineEmits(['finishedTask', 'currentAction']);

// Menu
const menuRef = useTemplateRef<HTMLElement>('menuRef');
const menuItemRef = useTemplateRef<HTMLElement>('menuItemRef');
const menuOpen = ref<boolean>(false);

// Measurements
const currentAction = ref<Action>({
  action: 'clickMenu',
  centerX: 0,
  centerY: 0,
});

// Set initial action
onMounted(() => {
  currentAction.value = {
    action: 'clickMenu',
    centerX: menuRef.value
      ? menuRef.value.offsetLeft + menuRef.value.offsetWidth / 2
      : 0,
    centerY: menuRef.value
      ? menuRef.value.offsetTop + menuRef.value.offsetHeight / 2
      : 0,
  };
});

// Emit current action
watch(
  currentAction,
  () => {
    emit('currentAction', currentAction.value);
  },
  { immediate: true, flush: 'sync' },
);

/**
 * Set menu open and set current action
 */
async function menuClicked() {
  menuOpen.value = true;

  // Set current action when menu items are loaded
  await nextTick();
  currentAction.value = {
    action: 'clickMenuItem',
    centerX: menuItemRef.value
      ? menuItemRef.value.offsetLeft + menuItemRef.value.offsetWidth / 2
      : 0,
    centerY: menuItemRef.value
      ? menuItemRef.value.offsetTop + menuItemRef.value.offsetHeight / 2
      : 0,
  };
}

/**
 * Finish task
 */
function finishTask() {
  emit('finishedTask');
}
</script>
