<template>
    <main class="container text-white">
        <div class="pt-4 mb-8 relative">
            <input 
                type="text" 
                v-model="searchQuery"
                @input="cityLookUp"
                placeholder="搜索城市或者省份" 
                class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
            />
            <ul 
                class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
                v-if="citySearch"
            >
                <p v-if="searchError">出现了点问题，请再试一次</p>
                <li 
                    v-for="district in citySearch" 
                    :key="district.id"
                    class="py-2 cursor-pointer"
                    @click="previewCity(district)"
                >
                    {{ district.name }}
                </li>
            </ul>
        </div>
        <div class="flex flex-col gap-4">
            <Suspense>
                <CityList />
                <template #fallback>
                    <div>
                        <CityCardSkeleton />
                    </div>
                </template>
            </Suspense>
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import CityList from '../components/cityList.vue';
import CityCardSkeleton from '../components/cityCardSkeleton.vue';

const router = useRouter();
const searchQuery = ref("");
const queryTimeout = ref(null);
const citySearch = ref(null);
const searchError = ref(null);
//  转换城市代码，以实现天气查询功能
const cityLookUp = () => {
    clearTimeout(queryTimeout.value);
    queryTimeout.value = setTimeout(() => {
        if (searchQuery.value != '') {
            try {
                fetch(`https://geoapi.qweather.com/v2/city/lookup?location=${ searchQuery.value }&key=c64bebdc3d8047d29bb483594207ce62`)
                .then(function(data) {
                    return data.json();
                })
                .then(function(data) {
                    citySearch.value = data.location;
                    return;
                });
            } catch {
                searchError.value = true;
            }
        }
            citySearch.value = null;
    }, 300)
}

const previewCity = (district) => {
    const city = district.adm2;
    const state = district.name;
    router.push({
        name: 'CityView',
        params: { state: state, city: city },
        query: {
            lat: district.lat,
            lon: district.lon,
            locationID: district.id,
            preview: true,
        }
    })
}
</script>
<style scoped>

</style>