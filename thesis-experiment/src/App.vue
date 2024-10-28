<template>
  <main>
    <!-- <a href="#">Test</a
    ><img
      src="./assets/images/Test.jpg"
      alt="Photo by Greg Becker on Unsplash"
    /> -->
    <div class="menu">
      <transition name="switch" mode="out-in">
        <button v-if="!menuOpen" @click="menuOpen = true">
          <font-awesome-icon :icon="['fas', 'bars']" />
          <p>Menu</p>
        </button>
        <button v-else>
          <font-awesome-icon
            @click="menuOpen = false"
            :icon="['fas', 'xmark']"
          />
          <p>Menu</p>
        </button>
      </transition>
      <ul v-if="menuOpen">
        <li v-for="item in menuItems" :key="item">
          <a href="#">{{ item }}</a>
        </li>
      </ul>
    </div>
    <p class="select-text">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro suscipit
      explicabo sapiente similique expedita culpa beatae magni eveniet alias ad!
      Corrupti modi atque eos, optio dolorem aspernatur rem molestiae animi.
    </p>
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
    <form>
      <label for="">Test <input type="text" placeholder="test" /> </label>
      <div class="label-group">
        <label for=""><input type="radio" name="" id="" />Test</label>
      </div>
      <div class="select">
        <select name="" id="">
          <option value="">Test</option>
        </select>
      </div>
      <p class="error">Test</p>
      <p class="success">Test</p>
    </form>
    <div class="slider">
      <input type="range" min="1" max="100" value="1" />
    </div>
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
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

const menuOpen = ref<boolean>(false)
const menuItems: string[] = ['A', 'B', 'C']
const popUpOpen = ref<boolean>(false)
const drag = ref<boolean>(false)
const dragList = ref<{ id: number; name: string }[]>([
  { id: 1, name: 'A' },
  { id: 2, name: 'B' },
  { id: 3, name: 'C' },
])
</script>
