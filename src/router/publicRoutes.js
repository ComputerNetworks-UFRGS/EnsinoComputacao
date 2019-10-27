import AppHeader from "./../layout/AppHeader"
import AppFooter from "./../layout/AppFooter"

import Home from "./../views/Home.vue"
import Tasks from "./../views/Tasks.vue"
import Task from "./../views/Task.vue"
import ClassificationAxis from './../views/ClassificationAxis.vue'
import Graphs from "./../views/Graphs.vue"
import Graph from "./../views/Graph.vue"
import About from "./../views/About.vue"
import Contact from "./../views/Contact.vue"
import Login from "./../views/auth/Login.vue"
import Register from "./../views/auth/Register.vue"
import PasswordRecovery from "./../views/auth/PasswordRecovery.vue"

export default [
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
        path: "/classificacao",
        components: {
            header: AppHeader,
            default: ClassificationAxis,
            footer: AppFooter
        },
    },
    {
        path: "/planos-de-ensino",
        name: "graph",
        components: {
            header: AppHeader,
            default: Graphs,
            footer: AppFooter
        }
    },
    {
        path: "/planos-de-ensino/:id",
        name: "graph-view",
        components: {
            header: AppHeader,
            default: Graph,
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
]