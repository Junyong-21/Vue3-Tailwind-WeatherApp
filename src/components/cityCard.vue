<template>

<div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
        <h2 class="text-3xl">{{ props.city.city }}</h2>
        <h3>{{ props.city.state }}</h3>
    </div>

    <div class="flex flex-col gap-2">
        <p class="text-3xl self-end">
            {{ props.city.weather.now.temp }}&#8451;
        </p>
        <div class="flex gap-2">
            <span class="text-xs">
                体感温度：
                {{ props.city.weather.now.feelsLike }}&#8451;
            </span>
        </div>
    </div>
</div>

</template>

<script setup>
import { ref,reactive } from 'vue'
const props = defineProps({
    city: {
        type: Object,
        default: () => {},
    }
})

console.log(props.city);
</script>
