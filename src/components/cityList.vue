<template>

<div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
</div>

<p v-if="savedCities.length === 0">未添加位置。要开始跟踪位置，请在上面的搜索框中搜索。</p>

</template>

<script setup>
import { ref} from 'vue'
import CityCard from './cityCard.vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

const savedCities = ref([]);

const getCities = async () => {
    if (localStorage.getItem('savedCities')) {
        savedCities.value = JSON.parse(
            localStorage.getItem('savedCities')
        );
        
        let requests = [];
        savedCities.value.forEach((city) => {
            requests.push(
                axios.get(
                    `https://devapi.qweather.com/v7/weather/now?location=${ city.coords.lng },${city.coords.lat}&key=c64bebdc3d8047d29bb483594207ce62`
                )
            );
        })

        const weatherData = await Promise.all(requests);
        await new Promise((res) => setTimeout(res, 1000));


        weatherData.forEach((value, index) => {
            savedCities.value[index].weather = value.data;
        })
    }
}

await getCities();

const router = useRouter();
const goToCityView = (city) => {
    router.push({
        name: 'CityView',
        params: { state: city.state, city: city.city },
        query: {
            id: city.id,
            lat: city.coords.lat,
            lon: city.coords.lng,
        },
    })
}
</script>
