import Vue from "vue"
import Router from "vue-router"
import AuthService from '@/services/auth'
import publicRoutes from './publicRoutes'
import privateRoutes from './privateRoutes'

Vue.use(Router);

let router = new Router({
  linkActiveClass: "is-active",
  routes: [
    ...publicRoutes,
    privateRoutes,
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (AuthService.loggedIn()) {
      next()
    } else {
      next({
        path: '/login',
        // query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router