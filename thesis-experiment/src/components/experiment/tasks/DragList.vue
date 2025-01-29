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
import {
  useEmitCurrentAction,
  useOnMountedCurrentAction,
} from '@/composables/useTasks';
import { emitTimer } from '@/utils/logic/timers';
import type { Action } from '@/utils/types/measurements';
import { ref, useTemplateRef } from 'vue';
import draggable from 'vuedraggable';

defineProps<{
  interfaceOrientation: string;
}>();

const emit = defineEmits<{
  finishedTask: [];
  currentAction: [value: Action];
}>();

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
useOnMountedCurrentAction(currentAction, 'startDragList', ARef);
useOnMountedCurrentAction(goalAction, 'endDragList', CRef);

// Emit current action
useEmitCurrentAction(currentAction, emit);

/**
 * Set current action when drag starts
 */
function dragStarted(): void {
  currentAction.value = {
    action: 'startDragList',
    centerX: ARef.value
      ? window.screenX + ARef.value.offsetLeft + ARef.value.offsetWidth / 2
      : 0,
    centerY: ARef.value
      ? window.screenY + ARef.value.offsetTop + ARef.value.offsetHeight / 2
      : 0,
  };
}

/**
 * Set current action when drag ends
 */
function dragEnded(): void {
  currentAction.value = goalAction.value;

  // Wait for current action to be emitted
  setTimeout(() => {
    if (dragList.value[2].name == 'A') {
      emit('finishedTask');
    }
  }, emitTimer);
}
</script>
