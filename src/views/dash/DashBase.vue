<template>
  <div class="container pd">
    <button
      @click="isMenuOpen = !isMenuOpen"
      class="is-hidden-tablet button button is-light"
      :class="{'is-menu-open': isMenuOpen}"
    >
      <span class="icon">
        <i class="fas" :class="'fa-bars'"></i>
      </span>
      <span>Menu</span>
      <span class="icon">
        <font-awesome-icon v-if="isMenuOpen" icon="angle-down" />
        <font-awesome-icon v-if="!isMenuOpen" icon="angle-right" />
      </span>
    </button>

    <div class="columns">
      <div class="column is-4" :class="{'is-hidden-mobile': !isMenuOpen}">
        <aside class="menu">
          <p class="menu-label" v-auth="'task.list'">Criação</p>
          <ul class="menu-list">
            <li v-auth="'task.list'">
              <a href="#!" @click.prevent="goTo('/dash/atividades')">Suas atividades</a>
            </li>
          </ul>

          <p class="menu-label" v-auth="'review.list'">Gerência</p>
          <ul class="menu-list">
            <li v-auth="'review.list'">
              <a href="#!" @click.prevent="goTo('/dash/revisao')">Revisão de atividades</a>
            </li>
            <li v-auth="'tag.list'">
              <a href="#!" @click.prevent="goTo('/dash/tags')">TAGs das atividades</a>
            </li>
          </ul>

          <p class="menu-label" v-auth="'role.list|users.list'">Administração</p>
          <ul class="menu-list">
            <li v-auth="'role.list'">
              <a href="#!" @click.prevent="goTo('/dash/papeis')">Perfis de acesso</a>
            </li>
            <li v-auth="'users.list'">
              <a href="#!" @click.prevent="goTo('/dash/usuarios')">Usuários</a>
            </li>
          </ul>

          <p class="menu-label" v-auth="'topics.list|skill.list|curri.list'">Organização</p>
          <ul class="menu-list">
            <li v-auth="'topics.list'">
              <a href="#!" @click.prevent="goTo('/dash/objetos')">Objetos de ensino</a>
            </li>
            <li v-auth="'skill.list'">
              <a href="#!" @click.prevent="goTo('/dash/habilidades')">Habilidades</a>
            </li>
            <li v-auth="'curri.list'">
              <a href="#!" @click.prevent="goTo('/dash/curriculos')">Currículos</a>
            </li>
          </ul>
        </aside>
      </div>
      <div class="column">
        <div class="container">
          <router-view></router-view>
          <br>
          <br>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    goTo(path) {
      this.$router.push(path);
      this.isMenuOpen = false;
    }
  }
};
</script>

<style scoped>
@media (max-width: 768px) {
  .menu {
    padding: 6px;
    background: #f5f5f5;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  .is-menu-open {
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 0px;
  }
}
</style>
