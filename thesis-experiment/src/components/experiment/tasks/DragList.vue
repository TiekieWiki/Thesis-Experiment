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
        <div :ref="'elem' + element.name + 'Ref'" class="list-item">
          {{ element.name }}
        </div>
      </template>
    </draggable>
  </div>
</template>

<script setup lang="ts">
import type { Action } from '@/utils/types/measurements';
import { onMounted, ref, useTemplateRef, watch } from 'vue';
import draggable from 'vuedraggable';

defineProps<{
  interfaceOrientation: string;
  hand: string;
}>();

const emit = defineEmits(['finishedTask', 'currentAction']);

// Drag list
const ARef = useTemplateRef<HTMLElement>('elemARef');
const CRef = useTemplateRef<HTMLElement>('elemCRef');
const drag = ref<boolean>(false);
const dragList = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
]);

// Measurements
const currentAction = ref<Action>({
  action: 'startDragList',
  centerX: 0,
  centerY: 0,
});
const goalAction = ref<Action>({
  action: 'endDragList',
  centerX: 0,
  centerY: 0,
});

// Set initial action and goal
onMounted(() => {
  currentAction.value = {
    action: 'startDragList',
    centerX: ARef.value
      ? ARef.value.offsetLeft + ARef.value.offsetWidth / 2
      : 0,
    centerY: ARef.value
      ? ARef.value.offsetTop + ARef.value.offsetHeight / 2
      : 0,
  };
  goalAction.value = {
    action: 'endDragList',
    centerX: CRef.value
      ? CRef.value.offsetLeft + CRef.value.offsetWidth / 2
      : 0,
    centerY: CRef.value
      ? CRef.value.offsetTop + CRef.value.offsetHeight / 2
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
 * Set current action when drag starts
 */
function dragStarted() {
  currentAction.value = {
    action: 'startDragList',
    centerX: ARef.value
      ? ARef.value.offsetLeft + ARef.value.offsetWidth / 2
      : 0,
    centerY: ARef.value
      ? ARef.value.offsetTop + ARef.value.offsetHeight / 2
      : 0,
  };
}

/**
 * Set current action when drag ends
 */
function dragEnded() {
  currentAction.value = goalAction.value;

  // Wait for current action to be emitted
  setTimeout(() => {
    if (dragList.value[2].name == 'A') {
      emit('finishedTask');
    }
  }, 100);
}
</script>
