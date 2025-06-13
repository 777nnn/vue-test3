import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'  // 今のパスに合わせてください

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  // 他のページのルートも追加してください（例: /add, /page1など）
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router