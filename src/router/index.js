import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CastSpells from '../views/CastSpells.vue'
import EditCharacter from '../views/CreateCharacterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/character/:id',
      name: 'character',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Character.vue'),
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'cast-spells',
          name: 'castspells',
          component: CastSpells,
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'edit-stats',
          name: 'editstats',
          component: EditCharacter,
        },
      ],
    }
  ]
})

export default router
