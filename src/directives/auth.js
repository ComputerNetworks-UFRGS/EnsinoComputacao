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
                let required_permissions = binding.value.split('|') // or
                
                let has_some_permission = false
                for(let p of required_permissions) {
                    if(permissions && permissions.indexOf(p) > -1) {
                        has_some_permission = true
                    }
                }

                if (has_some_permission) {
                    el.style.display = el.style.v_initial_display
                } else {
                    el.remove()
                }
            }
        }

        fnCheckPermission()

    },
}