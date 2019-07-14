import UseService from '@/services/user'

export default {
    bind: function (el, binding, vnode) {

        el.style.v_initial_display = el.style.display
        el.style.display = 'none'

        let fnCheckPermission = function () {

            let permissions = vnode.context.$store.state.user.permissions
            if (permissions == undefined) {
                setTimeout(fnCheckPermission, 100)
            } else {

                let permissions = vnode.context.$store.state.user.permissions
                
                if (UseService.hasPermission(permissions, binding.value)) {
                    el.style.display = el.style.v_initial_display
                } else {
                    el.remove()
                }
            }
        }

        fnCheckPermission()

    },
}