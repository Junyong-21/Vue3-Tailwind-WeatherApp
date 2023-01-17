<template>

<header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav class="container flex-col flex sm:flex-row items-center gap-4 text-white py-6">
        <!--  -->
        <router-link :to="{ name: 'home' }">
            <div class="flex items-center gap-3">
                <i class="fa-solid fa-sun text-2xl"></i>
                <p class="text-2xl">当 地 天 气</p>
            </div>
        </router-link>

        <div class="flex gap-3 flex-1 justify-end">
            <i class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer" @click="toggleModel"></i>
            <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer" @click="addCity" v-if="router.currentRoute.value.query.preview"></i>
        </div>
        
        <BaseModel :modalActive="modalActive" @close-modal="toggleModel">
            <div class="text-black">
                <h1 class="text-2xl mb-1">关于:</h1>
                <p class="mb-4">
                    本地天气允许您跟踪您选择的城市的当前和未来天气。
                </p>
                <h2 class="text-2xl">如何使用：</h2>
                <ol class="list-decimal list-inside mb-4">
                    <li>
                        本地天气允许您跟踪您选择的城市的当前和未来天气。
                    </li>
                    <li>
                        在结果中选择一个城市，这将带您到当前天气供您选择。
                    </li>
                    <li>
                        单击右上角的“+”图标跟踪城市。这将保存该城市，以便稍后在主页上查看。
                    </li>
                </ol>

                <h2 class="text-2xl">删除城市：</h2>
                <p>
                    如果您不想再跟踪某个城市，只需在主页中选择该城市即可。在页面底部，会有删除城市的选项。
                </p>
                </div>
        </BaseModel>
    </nav>
</header>

</template>

<script setup>
import { ref,reactive,onMounted } from 'vue'
import BaseModel from './BaseModel.vue';
import {uid} from 'uid';
import { useRoute, useRouter } from 'vue-router';

const modalActive = ref(null);
const searchQuery = ref(null);
const savedCities = ref([]);
const route = useRoute;
const router = useRouter();
const toggleModel = () => {
    modalActive.value = !modalActive.value;
}

// 获取经纬度
const getLocaltion = () => {
    navigator.geolocation.getCurrentPosition(show);
}

// 将经纬度存入数组
const show = (position) => {
    searchQuery.value =  [position.coords.longitude, position.coords.latitude]
    console.log(searchQuery.value);
}

// 将经纬度转换为城市
const getSearchResults = () => {
    fetch(`https://restapi.amap.com/v3/geocode/regeo?location=${ searchQuery.value[0]}, ${searchQuery.value[1] }&key=9b865d5265bf8233677a3a875c5af624`)
    .then(function(data) {
        return data.json();
    })
    .then(function(data) {
        searchQuery.value = data.regeocode.formatted_address;
    })
}

const addCity = () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
    }

    const locationObj = {
        id: uid(),
        state: router.currentRoute.value.params.state,
        city: router.currentRoute.value.params.city,
        coords: {
            lat: router.currentRoute.value.query.lat,
            lng: router.currentRoute.value.query.lon,
        }
    }

    savedCities.value.push(locationObj);
    localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

    let query = Object.assign({}, route.query);
    delete query.preview;
    query.id = locationObj.id;
    router.replace({query});
}
</script>