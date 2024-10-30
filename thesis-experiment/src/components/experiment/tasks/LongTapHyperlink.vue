<template>
  <div :class="['long-tap-hyperlink', interfaceOrientation]">
    <a href="#" v-on-long-press.prevent="openPopUp">Test</a>
    <teleport to="body" v-if="popUpOpen">
      <div class="pop-up-background">
        <div class="pop-up">
          <button @click="popUpOpen = false">
            <font-awesome-icon :icon="['fas', 'times']" />
          </button>
          <p>Content</p>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { vOnLongPress } from '@vueuse/components'

defineProps<{
  interfaceOrientation: string
}>()

const popUpOpen = ref<boolean>(false)
function openPopUp() {
  popUpOpen.value = true
}
</script>
