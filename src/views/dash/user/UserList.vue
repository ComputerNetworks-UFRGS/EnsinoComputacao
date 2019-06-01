<template>
    <div>
        <ul>
            <li v-for="user of users" :key="user.id">
                {{ user.name }}
                <small>{{ user.email }}</small>
                <br>
                <span v-if="user.role">
                    <span class="badge badge-success">
                        {{ user.role.title }}
                    </span>
                </span>
                <span v-else>
                    <span class="badge badge-light">
                        comum
                    </span>
                </span>
                <router-link 
                    v-auth="'users.edit'"
                    :to="'usuarios/' + user.id + '/' + user.role_id" 
                    class="btn btn-sm btn-light">
                    Editar
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import Users from '@/services/user'

export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        Users.list()
            .then(res => res.data)
            .then(users => {
                this.users = users
            })
    }
}
</script>

<style>

</style>
