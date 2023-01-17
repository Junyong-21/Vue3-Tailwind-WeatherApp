<template>
<Suspense>
    <div class="flex flex-col flex-1 items-center ">
    <!-- 横幅 -->
    <div
        v-if="router.currentRoute.value.query.preview"
        class="text-white p-4 bg-weather-secondary w-full text-center"
    >
        <p>你正在预览城市：{{ router.currentRoute.value.params.city }}，点击 “ + ”号开始追踪这个城市</p>
    </div>
    <!-- 天气数据预览 -->
    <div class="flex flex-col items-center text-white py-12">
        <h1 class="text-4xl mb-2">{{ router.currentRoute.value.params.city }}&nbsp{{ router.currentRoute.value.params.state }}</h1>
        <p class="text-sm mb-12">数据观测时间:
            {{ 
                new Date(weatherData.now.obsTime).toLocaleTimeString(
                    "cn-zh",
                    {
                        weekday: "short",
                        day: "2-digit",
                        month: "long",
                    }
                ) 
            }}
        </p>
        <p class="text-8xl mb-8">
            {{ Math.round(weatherData.now.temp) }}&#8451;
        </p>
        <div class="text-center text-2xl">
            <p class="capitalize">
                {{ weatherData.now.text }}
            </p>
            <p class="w-[150px] h-auto text-8xl my-5">
                <i :class="`qi-${weatherData.now.icon}`"></i>
            </p>
        </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full">

    <!-- 小时预报 -->
    <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
            <h2 class="mb-4">逐小时天气预报</h2>
            <div class="flex gap-10 overflow-x-scroll">
                <div 
                v-for="hourData in weatherHourlyData.hourly" 
                :key="hourData.id"
                class="flex flex-col gap-4 items-center"
                >
                    <!-- 时间 -->
                    <p class="whitespace-nowrap text-md">
                        {{ hourData.fxTime.substring(11,16) }}
                    </p>
                    <!-- 天气图标 -->
                    <p class="w-auto h-[50px] object-cove text-2xl">
                        <i :class="`qi-${hourData.icon}`"></i>
                    </p>
                    <!-- 温度 -->
                    <p class="pb-4 text-xl" style="user-select: none;">
                        {{ hourData.temp }}&#8451;
                    </p>
                </div>
            </div>
        </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full">

    <!-- 每日天气预报 -->
    <div class="max-w-screen-md w-full py-12">
        <div class="mx-8 text-white">
            <h2 class="mb-4">   
                每日天气预报
            </h2>
            <div 
                v-for="dailyData in weatherDailyData.daily" 
                :key="dailyData.id"
                class="flex items-center "
                >
                <p class="flex-1">{{ dailyData.fxDate.substring(5) }}</p>
                <p
                    class="w-[55px] h-[50px] "
                >
                    <i :class="`qi-${dailyData.iconDay}`" class="pr-4"></i>
                </p>
                <div class="flex gap-2 flex-1 justify-end ">
                    <p>H:  {{ dailyData.tempMax.padStart(2, '0') }} &#8451;</p>
                    <p>L:  {{ dailyData.tempMin.padStart(2, '0') }} &#8451;</p>
                </div>
            </div>
        </div>
    </div>

    <!-- 删除城市 -->
    <div class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover::text-red-500" @click="removeCity">
        <i class="fa-solid fa-trash"></i>
        <p>删除城市</p>
    </div>
</div>
</Suspense>


</template>

<script setup >
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();

// 获实时天气
const getWeather = async () => {
    try {
        // fetch(`https://devapi.qweather.com/v7/weather/now?location=${ router.currentRoute.value.query.locationID }&key=c64bebdc3d8047d29bb483594207ce62`)
        // .then((data) => {
        //     return data.json();
        // })
        // .then((data) => {
        //     weatherData.value = data;
        //     console.log(weatherData.value);
        // })
        const weatherData = await axios.get(`https://devapi.qweather.com/v7/weather/now?location=${ router.currentRoute.value.query.lon },${router.currentRoute.value.query.lat}&key=c64bebdc3d8047d29bb483594207ce62`);
        return weatherData.data;
    } catch (err) {
        console.log(err);
    }
}

const weatherData =await getWeather();

// 获取逐小时天气预报
const getHourlyWeather = async () => {
    try {
        // fetch(`https://devapi.qweather.com/v7/weather/24h?location=${ router.currentRoute.value.query.locationID }&key=c64bebdc3d8047d29bb483594207ce62`)
        // .then((data) => {
        //     return data.json();
        // })
        // .then((data) => {
        //     weatherHourlyData.value = data;
        //     console.log(weatherHourlyData.value);
        // })
        const weatherHourlyData = await axios.get(`https://devapi.qweather.com/v7/weather/24h?location=${ router.currentRoute.value.query.lon },${router.currentRoute.value.query.lat}&key=c64bebdc3d8047d29bb483594207ce62`);
        return weatherHourlyData.data;
    } catch (err) {
        console.log(err);
    }
}

const weatherHourlyData = await getHourlyWeather();

const getDailyWeather = async () => {
    try {
        // fetch(`https://devapi.qweather.com/v7/weather/7d?location=${ router.currentRoute.value.query.locationID }&key=c64bebdc3d8047d29bb483594207ce62`)
        // .then((data) => {
        //     return data.json();
        // })
        // .then ((data) => {
        //     weatherDailyData.value = data;
        //     console.log(weatherDailyData);
        // })
        const weatherDailyData = await axios.get(`https://devapi.qweather.com/v7/weather/7d?location=${ router.currentRoute.value.query.lon },${router.currentRoute.value.query.lat}&key=c64bebdc3d8047d29bb483594207ce62`);
        return weatherDailyData.data;
    } catch (err) {
        console.log(err);
    }
}

const weatherDailyData = await getDailyWeather();
await new Promise((res) => {setTimeout(res, 1000)})

const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem('savedCities'))
    const updatedCities = cities.filter((city) => city.id !== router.currentRoute.value.query.id)
    localStorage.setItem('savedCities', JSON.stringify(updatedCities));
    router.push({
        name: 'home',
    })
}
</script>

<style>
    /* 整个滚动条 */
::-webkit-scrollbar {
    /* 对应纵向滚动条的宽度 */
    width: 10px;
    /* 对应横向滚动条的宽度 */
    height: 10px;
}

/* 滚动条上的滚动滑块 */
::-webkit-scrollbar-thumb {
    background-color: #49b1f5;
    border-radius: 32px;
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
    background-color: #dbeffd;
    border-radius: 32px;
}
</style>