<template>
    <div>
        <router-link v-auth="'role.create'" to="/dash/papeis/criar" >
            Novo perfil de usuário
        </router-link>
        <ul>
            <li v-for="role of roles" :key="role.id">
                <b>{{ role.title }}</b>
                <br>
                <p>
                    {{ role.description }}
                </p>
                <router-link 
                    v-auth="'role.detail'"
                    :to="'/dash/papeis/' + role.id" 
                    class="btn btn-sm btn-light"> 
                    Editar
                </router-link>
                <button 
                    v-auth="'role.delete'"
                    @click="removeRole(role.id)" 
                    class="btn btn-sm btn-white"> 
                    Remover
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import Roles from '@/services/role'

export default {
    data() {
        return {
            roles: []
        }
    },
    created() {
        this.fetchRoles()
    },
    methods: {
        removeRole(role_id) {
            Roles.remove(role_id)
                .then(res => {
                    this.fetchRoles()
                })
        },
        fetchRoles() {
            Roles.list()
                .then(res => res.data)
                .then(roles => {
                    this.roles = roles
                })
        }
    }
}
</script>

<style>

</style>
