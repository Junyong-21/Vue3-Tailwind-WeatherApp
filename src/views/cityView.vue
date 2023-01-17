<template>
<div>
    <Suspense>
        <template #default>
            <asyncWeather />
        </template>
        <template #fallback>
            <CityViewSkaeleton />
        </template>
    </Suspense>
</div>
</template>

<script setup >
    import asyncWeather from '../components/asyncWeather.vue';
    import CityViewSkaeleton from '../components/cityViewSkaeleton.vue';
</script>

