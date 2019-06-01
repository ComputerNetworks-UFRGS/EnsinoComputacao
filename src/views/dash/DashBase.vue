<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4">
        <aside class="menu">
          <p class="menu-label" v-auth="'task.list'">Criação</p>
          <ul class="menu-list">
            <li v-auth="'task.list'">
              <router-link to="/dash">Suas atividades</router-link>
            </li>
          </ul>

          <p class="menu-label" v-auth="'review.list'">Gerência</p>
          <ul class="menu-list">
            <li v-auth="'review.list'">
              <router-link to="/dash/revisao">Revisão de atividades</router-link>
            </li>
          </ul>


          <p class="menu-label" v-auth="'role.list|users.list'">Administração</p>
          <ul class="menu-list">
            <li v-auth="'role.list'">
              <router-link to="/dash/papeis">Perfis de acesso</router-link>
            </li>
            <li v-auth="'users.list'">
              <router-link to="/dash/usuarios">Usuários</router-link>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
