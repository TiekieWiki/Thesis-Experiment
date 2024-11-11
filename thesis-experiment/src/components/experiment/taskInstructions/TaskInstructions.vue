<template>
  <teleport to="body">
    <div
      class="task-instructions pop-up-background"
      @click="startTask($event, Date.now())"
    >
      <div class="pop-up">
        <h1>Instructions</h1>
        <p>{{ getTaskInstruction(task) }}</p>
        <p>Reminder: perform this task with your {{ hand }} hand</p>
        <p>
          Hold the phone in a neutral position and click this pop-up to start
          the task
        </p>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { getTaskInstruction } from '@/utils/logic/selectTask'

defineProps<{
  hand: string
  task: string
}>()

const emit = defineEmits(['finishedInstructions', 'userClicked'])
function startTask(clickEvent: MouseEvent, clickTime: number) {
  emit('finishedInstructions')
  emit('userClicked', clickEvent, clickTime)
}
</script>
