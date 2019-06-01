<template>
    <div>
        <div v-for="category of categories" :key="category.id">
            <b>{{ category.title }}</b> 
            <ul>
                <li v-for="permission of category.permissions" :key="permission.id">
                    <label>
                        <input 
                            type="checkbox" 
                            v-model="permission.checked"
                            :checked="permission.checked">
                        {{ permission.description }}
                    </label>
                </li>
            </ul>
        </div>
        <button 
            v-auth="'role.edit'"
            class="btn btn-sm btn-light" 
            @click="teste">
            Atualizar
        </button>
    </div>
</template>

<script>
import Roles from '@/services/role'
import Permissions from '@/services/permission'
import _ from 'lodash'

export default {
    data () {
        return {
            role: {},
            categories: {},
        }
    },
    created() {
        Roles.detail(this.$route.params.id)
            .then(res => res.data)
            .then(role => {
                this.role = role
                return Permissions.list().then(res => res.data)
            })
            .then(permissions => {

                this.categories = {}
                
                for(let permission of permissions) {
                
                    let inRole = _.find(this.role.permissions, p => {
                        return p.id == permission.id
                    }) !== undefined
                    
                    this.$set(permission, 'checked', inRole)

                    let cat_id = permission.category_id
                    if(this.categories[cat_id] == undefined) {
                        this.categories[cat_id] = {
                            id: cat_id,
                            title: permission.category.title,
                            permissions: []
                        }
                    }
                    this.categories[cat_id].permissions.push(permission)

                }
                
            })
    },
    methods: {
        teste() {
            let permissions = _.map(this.categories, c => {
                return c.permissions
            })
            let permissions_checked = _.filter(_.flatten(permissions), p => p.checked)
            let ids = _.map(permissions_checked, p => p.id)
            
            Roles.update(this.role.id, ids)
                .then(res => {
                    if(res.status == 200) {
                        this.$router.push('/dash/papeis')
                    } else {
                        console.log('atualizado?', res)
                    }
                })
        }
    }
}
</script>

<style>

</style>
