import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/DefaultLayout.vue'),
      children: [
        {
          path: '',
          redirect: '/employees',
        },
        {
          path: 'employees',
          component: () => import('@/modules/employee/pages/EmployeeList.vue'),
        },
        {
          path: 'employees/new',
          component: () => import('@/modules/employee/pages/EmployeeForm.vue'),
        },
        {
          path: '/employees/:id',
          component: () => import('@/modules/employee/pages/EmployeeProfile.vue'),
        },
        {
          path: 'employees/:id/edit',
          component: () => import('@/modules/employee/pages/EmployeeProfile.vue'),
        },
      ],
    },
  ],
})

export default router
