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

                if (!permissions || permissions.indexOf(binding.value) === -1) {
                    el.remove()
                } else {
                    el.style.display = el.style.v_initial_display
                }
            }
        }

        fnCheckPermission()

    },
}