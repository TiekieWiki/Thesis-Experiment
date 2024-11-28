<template>
  <div :class="['long-tap-select', interfaceOrientation]">
    <p ref="text" class="select-text">
      {{ content }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Action } from '@/utils/types/measurements'
import { onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'

defineProps<{
  interfaceOrientation: string
  hand: string
}>()

const emit = defineEmits(['finishedTask', 'currentAction'])

// Text
const text = useTemplateRef<HTMLElement>('text')
const content = ref<string>('Select this text')

// Measurements
const currentAction = ref<Action>({
  action: 'startLongTapSelect',
  centerX: 0,
  centerY: 0,
})

// Set initial action
onMounted(() => {
  currentAction.value = {
    action: 'startLongTapSelect',
    centerX: text.value
      ? text.value.offsetLeft + text.value.offsetWidth / 2
      : 0,
    centerY: text.value
      ? text.value.offsetTop + text.value.offsetHeight / 2
      : 0,
  }

  document.addEventListener('selectionchange', detectSelectionChange)
})

onUnmounted(() => {
  document.removeEventListener('selectionchange', detectSelectionChange)
})

// Emit current action
watch(
  currentAction,
  () => {
    emit('currentAction', currentAction.value)
  },
  { immediate: true, flush: 'sync' },
)

/**
 * Detect selection change
 */
function detectSelectionChange() {
  const selection = window.getSelection()
  if (selection && selection.toString().trim() == content.value) {
    currentAction.value.action = 'endLongTapSelect'

    // Emit finished task after seeing the pop-up
    setTimeout(() => {
      emit('finishedTask')
    }, 1000)
  }
}
</script>
