import IpManager from '@/components/IpManager.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: IpManager
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/create',
      name: 'createIp',
      component: () => import('../views/IpAddressForm.vue')
    },
    {
      path: '/update/:id',
      name: 'updateIp',
      component: () => import('../views/IpAddressForm.vue')
    },
    {
      path: '/audit-logs/:id',
      name: 'auditLogs',
      component: () => import('../views/AuditLogs.vue')
    }
  ]
})

export default router
