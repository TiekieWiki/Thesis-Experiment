<template>
  <div :class="['tap-menu', interfaceOrientation]">
    <slot></slot>
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
          <a @click="menuOpen = true">Home</a>
        </li>
        <li @click="finishTask" ref="menuItemRef">
          <a href="#">About</a>
        </li>
        <li>
          <a @click="menuOpen = true">Contact</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useEmitCurrentAction,
  useOnMountedCurrentAction,
} from '@/composables/useTasks';
import { enterFullScreen } from '@/utils/logic/fullScreen';
import type { Action } from '@/utils/types/measurements';
import { nextTick, ref, useTemplateRef } from 'vue';

defineProps<{
  interfaceOrientation: string;
}>();

const emit = defineEmits<{
  finishedTask: [];
  currentAction: [value: Action];
}>();

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
useOnMountedCurrentAction(currentAction, 'clickMenu', menuRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Set menu open and set current action
 */
async function menuClicked(): Promise<void> {
  menuOpen.value = true;

  // Set current action when menu items are loaded
  await nextTick();
  currentAction.value = {
    action: 'clickMenuItem',
    centerX: menuItemRef.value
      ? menuItemRef.value.getBoundingClientRect().left +
        menuItemRef.value.getBoundingClientRect().width / 2
      : 0,
    centerY: menuItemRef.value
      ? menuItemRef.value.getBoundingClientRect().top +
        menuItemRef.value.getBoundingClientRect().height / 2
      : 0,
  };
}

/**
 * Finish task
 */
function finishTask(): void {
  emit('finishedTask');

  // Enter full screen
  enterFullScreen();
}
</script>
