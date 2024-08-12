<script setup lang="ts">
  import { ref, computed, reactive } from 'vue';

  import {
    useNonReactiveComposable1,
    useNonReactiveComposable2,
    useReactiveComposable1,
    useReactiveComposable2,
    useReactiveComposable3,
    useReactiveComposable4,
  } from './composables';

  const counter = ref(10);
  const target = 100;
  const step = 10;

  const { distance: nonReactiveOutput1 } = useNonReactiveComposable1(counter, target);
  const { distance: nonReactiveOutput2 } = useNonReactiveComposable2(counter.value, target);
  const nonReactiveOutput3 = useReactiveComposable1(counter, target);
  const { distance: reactiveOutput1 } = useReactiveComposable1(counter, target);
  const { distance: reactiveOutput2 } = useReactiveComposable2(counter, target);
  const { distance: reactiveOutput3 } = useReactiveComposable3(counter, target);

  const counterAsComputed = computed(() => counter.value + 0);
  const { distance: reactiveOutputComputed } = useReactiveComposable4(counterAsComputed, target);
  
  const counterAsPartOfReactive = reactive({ counter });
  const { distance: reactiveOutputGetter } = useReactiveComposable4(() => counterAsPartOfReactive.counter, target);

  const { distance: staticOutput } = useReactiveComposable4(1, target);

  const outputsToRender = [
    { name: 'useNonReactiveComposable1', result: nonReactiveOutput1 },
    { name: 'useNonReactiveComposable2', result: nonReactiveOutput2 },
    { name: 'useReactiveComposable1 + wrong output handling', result: nonReactiveOutput3.distance.value },
    { name: 'useReactiveComposable1', result: reactiveOutput1 },
    { name: 'useReactiveComposable2', result: reactiveOutput2 },
    { name: 'useReactiveComposable3', result: reactiveOutput3 },
    { name: 'useReactiveComposable4 + counter as computed', result: reactiveOutputComputed },
    { name: 'useReactiveComposable4 + counter as a getter', result: reactiveOutputGetter },
    { name: 'useReactiveComposable4 for one time execution', result: staticOutput },
  ];
</script>

<template>
  <div class="container">
    <div class="counter-input">
      <button @click="counter-= step">- {{ step }}</button>
      <div class="highlighted">{{ counter }}</div>
      <button @click="counter+= step">+ {{ step }}</button>
    </div>

    <div>Distance to {{ target }} from different composables:</div>

    <div class="results">
      <template
        v-for="entry in outputsToRender"
        :key="entry.name"
      >
        <span>{{ entry.name }}:</span>
        <span class="highlighted">{{ entry.result }}</span>
      </template>
    </div>
  </div>
</template>

<style scoped>
  .container {
    margin: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .counter-input {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .highlighted {
    padding: 2px;
    border-radius: 8px;
    background-color: bisque;
  }

  .results {
    display: grid;
    grid-template-columns: auto auto;
    justify-content: start;
    column-gap: 16px;
    row-gap: 4px;
  }
</style>
