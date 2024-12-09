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
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import { vOnLongPress } from '@vueuse/components';
import type { Action } from '@/utils/types/measurements';
import { resultTimer } from '@/utils/logic/timers';

defineProps<{
  interfaceOrientation: string;
  hand: string;
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
onMounted(() => {
  currentAction.value = {
    action: 'startLongTapHyperlink',
    centerX: linkRef.value
      ? linkRef.value.offsetLeft + linkRef.value.offsetWidth / 2
      : 0,
    centerY: linkRef.value
      ? linkRef.value.offsetTop + linkRef.value.offsetHeight / 2
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
 * Open pop-up after long tap
 */
function openPopUp() {
  currentAction.value.action = 'endLongTapHyperlink';
  popUpOpen.value = true;

  // Emit finished task after seeing the pop-up
  setTimeout(() => {
    emit('finishedTask');
  }, resultTimer);
}
</script>
