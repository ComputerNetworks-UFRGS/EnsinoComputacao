<template>
    <div>
        <div class="container">
            <ul>
                <li v-auth="'task.list'">
                    <router-link class="nav-link mb-sm-3 mb-md-0" to="/dash">
                        Suas atividades
                    </router-link>
                </li>
                <li v-auth="'review.list'">
                    <router-link class="nav-link mb-sm-3 mb-md-0" to="/dash/revisao">
                        Revisão de atividades
                    </router-link>
                </li>
                <li v-auth="'role.list'">
                    <router-link class="nav-link mb-sm-3 mb-md-0" to="/dash/papeis">
                        Perfis de usuários
                    </router-link>
                </li>
                <li v-auth="'users.list'">
                    <router-link class="nav-link mb-sm-3 mb-md-0" to="/dash/usuarios">
                        Usuários
                    </router-link>
                </li>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style></style>
