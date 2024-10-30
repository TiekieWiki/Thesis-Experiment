<template>
  <div class="tap-type">
    <textarea placeholder="Test"></textarea>
    <div class="keyboard">
      <div class="row-1">
        <div>Q</div>
        <div>W</div>
        <div>E</div>
        <div>R</div>
        <div>T</div>
        <div>Y</div>
        <div>U</div>
        <div>I</div>
        <div>O</div>
        <div>P</div>
      </div>
      <div class="row-2">
        <div>A</div>
        <div>S</div>
        <div>D</div>
        <div>F</div>
        <div>G</div>
        <div>H</div>
        <div>J</div>
        <div>K</div>
        <div>L</div>
      </div>
      <div class="row-3">
        <div class="key-medium">
          <font-awesome-icon :icon="['fas', 'up-long']" />
        </div>
        <div>Z</div>
        <div>X</div>
        <div>C</div>
        <div>V</div>
        <div>B</div>
        <div>N</div>
        <div>M</div>
        <div class="key-medium">
          <font-awesome-icon :icon="['fas', 'left-long']" />
        </div>
      </div>
      <div class="row-4">
        <div class="key-medium">123</div>
        <div class="spacebar"></div>
        <div>.</div>
        <div class="key-medium">
          <font-awesome-icon :icon="['fas', 'arrow-left']" />
        </div>
      </div>
    </div>
  </div>
</template>
