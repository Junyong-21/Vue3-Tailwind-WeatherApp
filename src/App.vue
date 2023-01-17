<template>

<div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <SiteNavigation></SiteNavigation>
    <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</div>

</template>

<script setup>
import { ref,reactive } from 'vue'
import SiteNavigation from './views/SiteNavigation.vue';
</script>

<style>
.page-enter-active,
.page-leave-active {
    transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
}
</style>
