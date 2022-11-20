import { createRouter, createWebHistory } from 'vue-router'
import { errorRoutes, staticRoutes } from '@/router/module/staticRoutes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...staticRoutes, ...errorRoutes]
})

export default router
