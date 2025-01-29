<template>
  <div :class="['long-tap-hyperlink', interfaceOrientation]">
    <a ref="linkRef" href="#" v-on-long-press.prevent="openPopUp"
      >Open pop-up</a
    >
    <teleport to="body" v-if="popUpOpen">
      <div class="pop-up-background">
        <div class="pop-up">
          <p>Well done!</p>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { vOnLongPress } from '@vueuse/components';
import type { Action } from '@/utils/types/measurements';
import { resultTimer } from '@/utils/logic/timers';
import {
  useEmitCurrentAction,
  useOnMountedCurrentAction,
} from '@/composables/useTasks';

defineProps<{
  interfaceOrientation: string;
}>();

const emit = defineEmits<{
  finishedTask: [];
  currentAction: [value: Action];
}>();

// Link and pop-up
const linkRef = useTemplateRef<HTMLElement>('linkRef');
const popUpOpen = ref<boolean>(false);

// Measurements
const currentAction = ref<Action>({
  action: 'startLongTapHyperlink',
  centerX: 0,
  centerY: 0,
});

// Set initial action
useOnMountedCurrentAction(currentAction, 'startLongTapHyperlink', linkRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Open pop-up after long tap
 */
function openPopUp() {
  popUpOpen.value = true;

  // Emit finished task after seeing the pop-up
  setTimeout(() => {
    emit('finishedTask');
  }, resultTimer);
}
</script>
