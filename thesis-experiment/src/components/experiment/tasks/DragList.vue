<template>
  <div :class="['drag-list', interfaceOrientation]">
    <draggable
      v-model="dragList"
      @start="drag = true"
      @end="drag = false"
      item-key="id"
      class="list"
    >
      <template #item="{ element }">
        <div class="list-item">{{ element.name }}</div>
      </template>
    </draggable>
  </div>
  <button @click="next">Next</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

defineProps<{
  interfaceOrientation: string
  hand: string
}>()

const emit = defineEmits(['finishedTask'])
function next() {
  emit('finishedTask')
}

const drag = ref<boolean>(false)
const dragList = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
])
</script>
