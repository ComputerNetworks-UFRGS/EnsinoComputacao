<template>
  <div>
    <br />
    <router-link
      v-auth="'topics.add'"
      to="/dash/objetos/criar"
      class="button is-success is-pulled-right"
    >Adicionar objeto</router-link>
    <h4 class="title is-4">Objetos de ensino</h4>

    <div class="card">
      <div class="card-content">
        <div v-if="isLoading">
          <br />
          <br />
        </div>
        <div v-else>
          <div class="columns skill-list" v-for="object of objects" :key="object.id">
            <div class="column is-10 nowrap-text">{{ object.name }}</div>
            <div class="column">
              <div class="field has-addons is-pulled-right">
                <p class="control">
                  <router-link
                    v-auth="'topics.edit'"
                    :to="'/dash/objetos/editar/' + object.id"
                    class="button is-small"
                  >Editar</router-link>
                </p>
              </div>
              <div class="btn-group"></div>
            </div>
          </div>
        </div>
        <b-loading :is-full-page="false" :active.sync="isLoading"></b-loading>
      </div>
    </div>
  </div>
</template>

<script>
import Objects from "@/services/object";

export default {
  data() {
    return {
      isLoading: false,
      objects: []
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.isLoading = true;
      Objects.list()
        .then(res => res.data)
        .then(objects => {
          this.objects = objects;
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.skill-list .column {
  padding: 0.5rem 0.2rem;
}
.skill-list:hover {
  background: rgba(0, 0, 0, 0.06);
}
</style>
