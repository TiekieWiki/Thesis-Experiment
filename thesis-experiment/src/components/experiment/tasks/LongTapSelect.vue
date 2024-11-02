<template>
  <div :class="['long-tap-select', interfaceOrientation]">
    <p class="select-text">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro suscipit
      explicabo sapiente similique expedita culpa beatae magni eveniet alias ad!
      Corrupti modi atque eos, optio dolorem aspernatur rem molestiae animi.
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  interfaceOrientation: string
  hand: string
}>()
</script>
