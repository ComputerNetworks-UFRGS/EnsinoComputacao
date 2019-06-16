<template>
  <div>
    <br>
    <router-link
      v-auth="'task.create'"
      to="/dash/habilidades/criar"
      class="button is-success is-pulled-right"
    >Criar nova habilidade</router-link>
    <h4 class="title is-4">Habilidades</h4>

    <div class="card">
      <div class="card-content">
        <div class="columns skill-list" v-for="skill of skills" :key="skill.id">
          <div class="column is-10 nowrap-text">
            <!-- <span class="tag is-small is-light">{{ skill.code }}</span> -->
            {{ skill.name }}
          </div>
          <div class="column">
            <div class="field has-addons is-pulled-right">
              <p class="control">
                <router-link
                  :to="'/dash/habilidades/editar/' + skill.id"
                  class="button is-small"
                >Editar</router-link>
              </p>
            </div>
            <div class="btn-group"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Skills from "@/services/skill";
import _ from "lodash";

export default {
  data() {
    return {
      skills: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      Skills.list()
        .then(res => res.data)
        .then(skills => {
          this.skills = skills;
        });
    }
  },
  computed: {}
};
</script>

<style scoped>
/* .nowrap-text { */
  /* white-space: nowrap; */
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
/* } */
.skill-list .column {
  padding: 0.5rem 0.2rem;
}
.skill-list:hover {
    background: rgba(0,0,0,0.06);
}
</style>
