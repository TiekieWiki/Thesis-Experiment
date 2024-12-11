<template>
  <div :class="['long-tap-select', interfaceOrientation]">
    <p ref="textRef" class="select-text">
      {{ content }}
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  useEmitCurrentAction,
  useOnMountedCurrentAction,
} from '@/composables/useTasks';
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
function detectSelectionChange() {
  const selection = window.getSelection();
  if (selection && selection.toString().trim() == content.value) {
    currentAction.value.action = 'endLongTapSelect';

    // Emit finished task after seeing the selection
    setTimeout(() => {
      emit('finishedTask');
    }, resultTimer);
  }
}
</script>
