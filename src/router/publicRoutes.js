import AppHeader from "./../layout/AppHeader"
import AppFooter from "./../layout/AppFooter"

import About from './../views/About.vue'
import Axis from './../views/Axis.vue'
import Contact from "./../views/Contact.vue"
import Home from "./../views/Home.vue"
import Task from "./../views/Task.vue"
import Tasks from "./../views/Tasks.vue"

import Login from "./../views/auth/Login.vue"
import PasswordRecovery from "./../views/auth/PasswordRecovery.vue"
import Register from "./../views/auth/Register.vue"

let routes = [
    ['about', '/diretrizes-para-ensino-de-computacao-na-educacao-basica', About],
    ['axis', '/eixos-de-ensino', Axis],
    ['axis-pc', '/eixos-de-ensino/pensamento-computacional', Axis, {
        default: { startAxis: 1 }
    }],
    ['axis-md', '/eixos-de-ensino/mundo-digital', Axis, {
        default: { startAxis: 2 }
    }],
    ['axis-cd', '/eixos-de-ensino/cultura-digital', Axis, {
        default: { startAxis: 3 }
    }],
    ['contact', '/contato', Contact],
    ['home', '/', Home],
    ['tasks', '/atividades', Tasks],
    ['task', '/atividades/:id', Task],

    // auth
    ['login', '/login', Login],
    ['password-recovery', '/recuperar-senha', PasswordRecovery],
    ['register', '/cadastro', Register],
]

export default routes.map(i => {
    return {
        name: i[0],
        path: i[1],
        components: {
            header: AppHeader,
            default: i[2],
            footer: AppFooter
        },
        props: i[3] || {}
    }
})