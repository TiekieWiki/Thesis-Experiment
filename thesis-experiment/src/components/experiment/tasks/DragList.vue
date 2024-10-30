<template>
  <div class="drag-list">
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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const drag = ref<boolean>(false)
const dragList = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
])
</script>
