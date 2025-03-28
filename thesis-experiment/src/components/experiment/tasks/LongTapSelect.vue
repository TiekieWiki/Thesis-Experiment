<template>
  <div :class="['long-tap-select', interfaceOrientation]">
    <slot></slot>
    <p
      ref="textRef"
      class="select-text"
      @touchstart="currentAction.action = 'startLongTapSelect'"
      @touchend="currentAction.action = 'endLongTapSelect'"
    >
      {{ content }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  useEmitCurrentAction,
  useOnMountedCurrentAction,
} from '@/composables/useTasks';
import { enterFullScreen } from '@/utils/logic/fullScreen';
import { resultTimer } from '@/utils/logic/timers';
import type { Action } from '@/utils/types/measurements';
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue';

defineProps<{
  interfaceOrientation: string;
}>();

const emit = defineEmits<{
  finishedTask: [];
  currentAction: [value: Action];
}>();

// Text
const textRef = useTemplateRef<HTMLElement>('textRef');
const content = ref<string>('Select this text');

// Measurements
const currentAction = ref<Action>({
  action: 'startLongTapSelect',
  centerX: 0,
  centerY: 0,
});

// Set initial action
useOnMountedCurrentAction(currentAction, 'startLongTapSelect', textRef);

// Set up selection change detection
onMounted(() => {
  document.addEventListener('selectionchange', detectSelectionChange);
});

onUnmounted(() => {
  document.removeEventListener('selectionchange', detectSelectionChange);
});

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Detect selection change
 */
function detectSelectionChange(): void {
  const selection = window.getSelection();
  if (selection && selection.toString().trim() == content.value) {
    // Emit finished task after seeing the selection
    setTimeout(() => {
      emit('finishedTask');

      // Enter full screen
      enterFullScreen();
    }, resultTimer);
  }
}
</script>
