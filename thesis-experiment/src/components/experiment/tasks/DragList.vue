<template>
  <div :class="['drag-list', interfaceOrientation]">
    <draggable
      @touchstart="dragStarted"
      @touchend="dragEnded"
      v-model="dragList"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      class="list"
    >
      <template #item="{ element }">
        <div :ref="'elem' + element.name" class="list-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import type { Action } from '@/utils/types/measurements'
import { onMounted, ref, useTemplateRef, watch } from 'vue'
import draggable from 'vuedraggable'

defineProps<{
  interfaceOrientation: string
  hand: string
}>()

const emit = defineEmits(['finishedTask', 'currentAction'])

// Drag list
const A = useTemplateRef<HTMLElement>('elemA')
const C = useTemplateRef<HTMLElement>('elemC')
const drag = ref<boolean>(false)
const dragList = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
])

// Measurements
const currentAction = ref<Action>({
  action: 'startDragList',
  centerX: 0,
  centerY: 0,
})
const goalAction = ref<Action>({
  action: 'endDragList',
  centerX: 0,
  centerY: 0,
})

// Set initial action and goal
onMounted(() => {
  currentAction.value = {
    action: 'startDragList',
    centerX: A.value ? A.value.offsetLeft + A.value.offsetWidth / 2 : 0,
    centerY: A.value ? A.value.offsetTop + A.value.offsetHeight / 2 : 0,
  }
  goalAction.value = {
    action: 'endDragList',
    centerX: C.value ? C.value.offsetLeft + C.value.offsetWidth / 2 : 0,
    centerY: C.value ? C.value.offsetTop + C.value.offsetHeight / 2 : 0,
  }
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
 * Set current action when drag starts
 */
function dragStarted() {
  currentAction.value = {
    action: 'startDragList',
    centerX: A.value ? A.value.offsetLeft + A.value.offsetWidth / 2 : 0,
    centerY: A.value ? A.value.offsetTop + A.value.offsetHeight / 2 : 0,
  }
}

/**
 * Set current action when drag ends
 */
function dragEnded() {
  currentAction.value = goalAction.value

  // Wait for current action to be emitted
  setTimeout(() => {
    if (dragList.value[2].name == 'A') {
      emit('finishedTask')
    }
  }, 100)
}
</script>
