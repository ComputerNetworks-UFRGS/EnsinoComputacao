import AppHeader from "./../layout/AppHeader"
import AppFooter from "./../layout/AppFooter"

import Home from "./../views/Home.vue"
import Axis from './../views/Axis.vue'
import Tasks from "./../views/Tasks.vue"
import Task from "./../views/Task.vue"
import About from './../views/About.vue'
import Contact from "./../views/Contact.vue"
import Login from "./../views/auth/Login.vue"
import Register from "./../views/auth/Register.vue"
import PasswordRecovery from "./../views/auth/PasswordRecovery.vue"

let routes = [
    ['home', '/', Home],
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
    ['login', '/login', Login],
    ['register', '/cadastro', Register],
    ['password-recovery', '/recuperar-senha', PasswordRecovery],

    ['tasks', '/atividades', Tasks],
    ['about', '/diretrizes-para-ensino-de-computacao-na-educacao-basica', About],
    ['task', '/atividades/:id', Task],
    ['contact', '/contato', Contact],
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