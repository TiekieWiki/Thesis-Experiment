import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Start',
      component: () => import('../views/StartView.vue'),
    },
    {
      path: '/experiment',
      name: 'Experiment',
      component: () => import('../views/ExperimentView.vue'),
    },
    {
      path: '/finishing-up',
      name: 'End',
      component: () => import('../views/EndView.vue'),
    },
    {
      path: '/example',
      name: 'Example',
      component: () => import('../views/ExampleView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'Start' },
    },
  ],
});

export default router;
