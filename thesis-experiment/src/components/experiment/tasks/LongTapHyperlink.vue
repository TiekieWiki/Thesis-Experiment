<template>
  <div class="long-tap-hyperlink">
    <a href="#">Test</a>
    <button @click="popUpOpen = true">Open pop-up</button>
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

const popUpOpen = ref<boolean>(false)
</script>
