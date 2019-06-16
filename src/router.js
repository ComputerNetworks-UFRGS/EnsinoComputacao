import Vue from "vue"
import Router from "vue-router"
import AppHeader from "./layout/AppHeader"
import AppFooter from "./layout/AppFooter"

import Home from "./views/Home.vue"
import Tasks from "./views/Tasks.vue"
import Task from "./views/Task.vue"
import Skills from "./views/Skills.vue"
import ClassificationTree from "./views/ClassificationTree.vue"
import GraphView from "./views/GraphView.vue"
import About from "./views/About.vue"
import Contact from "./views/Contact.vue"
import Login from "./views/auth/Login.vue"
import Register from "./views/auth/Register.vue"
import PasswordRecovery from "./views/auth/PasswordRecovery.vue"

import AuthService from '@/services/auth'

import DashHeader from "./layout/dash/DashHeader"
import DashBase from "./views/dash/DashBase"
import DashWelcome from "./views/dash/DashWelcome"
import DashTasks from "./views/dash/task/TaskHome"
import TaskForm from "./views/dash/task/TaskForm"
import TaskAttachment from './views/dash/task/TaskAttachment'
import RoleList from "./views/dash/role/RoleList"
import RoleEdit from "./views/dash/role/RoleEdit"
import RoleForm from "./views/dash/role/RoleForm"
import UserList from "./views/dash/user/UserList"
import UserForm from "./views/dash/user/UserForm"
import ReviewList from "./views/dash/review/ReviewList"
import ReviewEdit from "./views/dash/review/ReviewEdit"
import TreeList from "./views/dash/tree/TreeList"
import SkillList from "./views/dash/skill/SkillList"
import SkillForm from "./views/dash/skill/SkillForm"

Vue.use(Router);

let router = new Router({
  linkActiveClass: "is-active",
  routes: [
    {
      path: "/",
      name: "home",
      components: {
        header: AppHeader,
        default: Home,
        footer: AppFooter
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        header: AppHeader,
        default: Login,
        footer: AppFooter
      }
    },
    {
      path: "/cadastro",
      name: "register",
      components: {
        header: AppHeader,
        default: Register,
        footer: AppFooter
      }
    },
    {
      path: "/atividades",
      name: "tasks",
      components: {
        header: AppHeader,
        default: Tasks,
        footer: AppFooter
      }
    },
    {
      path: "/habilidades",
      name: "skills",
      components: {
        header: AppHeader,
        default: Skills,
        footer: AppFooter
      }
    },
    {
      path: "/classificacao",
      name: "classification",
      components: {
        header: AppHeader,
        default: ClassificationTree,
        footer: AppFooter
      }
    },
    {
      path: "/grafo",
      name: "graph",
      components: {
        header: AppHeader,
        default: GraphView,
        footer: AppFooter
      }
    },
    {
      path: "/atividades/:id",
      name: "task",
      components: {
        header: AppHeader,
        default: Task,
        footer: AppFooter
      }
    },
    {
      path: "/sobre",
      name: "about",
      components: {
        header: AppHeader,
        default: About,
        footer: AppFooter
      }
    },
    {
      path: "/contato",
      name: "contact",
      components: {
        header: AppHeader,
        default: Contact,
        footer: AppFooter
      }
    },
    {
      path: "/recuperar-senha",
      name: "password-recovery",
      components: {
        header: AppHeader,
        default: PasswordRecovery,
        footer: AppFooter
      }
    },
    {
      path: "/dash",
      components: {
        header: DashHeader,
        default: DashBase,
        footer: AppFooter
      },
      props: {
        footer: { isBasic: true, }
      },
      meta: { requiresAuth: true, },
      children: [
        {
          path: 'welcome',
          component: DashWelcome,
        },
        {
          path: 'atividades',
          component: DashTasks,
        },
        {
          path: 'atividades/criar',
          component: TaskForm,
        },
        {
          path: 'atividades/editar/:id',
          component: TaskForm,
          props: true
        },
        {
          path: 'atividades/anexos/:id',
          component: TaskAttachment
        },
        {
          path: 'papeis',
          component: RoleList,
        },
        {
          path: 'papeis/criar',
          component: RoleForm,
        },
        {
          path: 'papeis/:id',
          component: RoleEdit,
        },
        {
          path: 'usuarios',
          component: UserList,
        },
        {
          path: 'usuarios/:id/:role_id',
          component: UserForm,
        },
        {
          path: 'revisao',
          component: ReviewList,
        },
        {
          path: 'revisao/:id',
          component: ReviewEdit,
        },
        {
          path: 'arvore',
          component: TreeList,
        },
        {
          path: 'habilidades',
          component: SkillList,
        },
        {
          path: 'habilidades/criar',
          component: SkillForm,
        },
        {
          path: 'habilidades/editar/:id',
          component: SkillForm,
          props: true
        },
      ]
    },
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