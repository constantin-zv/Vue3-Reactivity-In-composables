import type { MaybeRefOrGetter, ComputedRef, Ref } from 'vue';
import { ref, computed, toValue, watch, watchEffect, isRef } from 'vue';

export const useNonReactiveComposable1 = (counter: Ref<number>, target: number) => {
    const counterValue = counter.value; // this will only run once and counterValue will remain the same forever
    const distance = computed(() => Math.abs(target - counterValue));
    return {
        distance,
    }
};

export const useNonReactiveComposable2 = (counter: number, target: number) => {
    const counterValue = computed(() => counter); // value of counter will never change after initialization
    const distance = computed(() => Math.abs(target - counterValue.value));
    return {
        distance,
    }
};


export const useReactiveComposable1 = (counter: Ref<number>, target: number) => {
    const reactiveCounterValue = computed(() => counter.value);
    const distance = computed(() => Math.abs(target - reactiveCounterValue.value));
    return {
        distance,
    }
};

export const useReactiveComposable2 = (counter: Ref<number>, target: number) => {
    const distance = ref(0);

    watchEffect(() => {
        const reactiveCounterValue = counter.value;
        distance.value = Math.abs(target - reactiveCounterValue);
    });

    return {
        distance,
    }
};

export const useReactiveComposable3 = (counter: Ref<number>, target: number) => {
    const distance = ref(0);

    watch(counter, () => {
        const reactiveCounterValue = counter.value;
        distance.value = Math.abs(target - reactiveCounterValue);
    }, { immediate: true });

    return {
        distance,
    }
};

type MaybeRefOrComputed<T> = MaybeRefOrGetter<T> | ComputedRef<T>;
export const useReactiveComposable4 = (counter: MaybeRefOrComputed<number>, target: number) => {
    const reactiveCounterValue = computed(() => toValue(counter));
    const distance = computed(() => Math.abs(target - reactiveCounterValue.value));
    return {
        distance,
    }
};

