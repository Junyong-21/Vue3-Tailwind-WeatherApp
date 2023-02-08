import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import cityView from '../views/cityView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component:()=>import(/*webpackChunkName:"name"*/"@/views/HomeView.vue"),
            meta: {
                title: 'Home',
            }
		},
		{
			path: '/weather/:state/:city',
			name: 'CityView',
			component:()=>import(/*webpackChunkName:"name"*/"@/views/cityView.vue"),
            props: true,
            meta: {
                title: 'Weather'
            }
		},
	],
});

router.beforeEach((to, from, next) => {
    document.title = `${to.params.state ? `${to.params.city} - ${to.params.state}` : to.meta.title} | 当地天气`;
    next();
})

export default router
