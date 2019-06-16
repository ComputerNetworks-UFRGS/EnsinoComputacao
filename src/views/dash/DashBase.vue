<template>
  <div class="container">
    <div class="columns">
      <div class="column is-4">
        <aside class="menu">
          <p class="menu-label" v-auth="'task.list'">Criação</p>
          <ul class="menu-list">
            <li v-auth="'task.list'">
              <router-link to="/dash/atividades">Suas atividades</router-link>
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

          <p class="menu-label" v-auth="'topics.list'">Organização</p>
          <ul class="menu-list">
            <li v-auth="'topics.list'">
              <router-link to="/dash/arvore">Objetos de ensino</router-link>
            </li>
            <li>
              <router-link to="/dash/habilidades">Habilidades</router-link>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <div class="container">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
