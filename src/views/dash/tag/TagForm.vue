<template>
  <div>
    <br />
    <router-link to="/dash/tags" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4" v-if="tagId">Editar: {{ form.value }}</h4>
    <h4 class="title is-4" v-else>Nova TAG</h4>

    <button
      v-auth="'tag.delete'"
      v-if="tagId"
      @click="removeTag"
      class="button is-small is-light"
    >Excluir TAG</button>
    <hr />

    <div>
        <div class="columns">
            <div class="column">
                <div class="field">
                    <label class="label">Conteúdo</label>
                    <div class="control">
                    <input v-model="form.value" class="input" placeholder="Conteúdo" />
                    </div>
                    <div class="help is-danger" v-if="errors.value.length > 0">
                    <div v-for="error in errors.value" :key="error">{{ error }}</div>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="field">
                        <label class="label">Publicada?</label>
                        <b-switch v-model="form.published"
                            :true-value="1"
                            :false-value="0">
                            {{ form.published ? 'Sim' : 'Não' }}
                        </b-switch>
                        <div class="help is-danger" v-if="errors.published.length > 0">
                            <div v-for="error in errors.published" :key="error">{{ error }}</div>
                        </div>
                </div>
            </div>
        </div>


      <button
        v-if="tagId"
        v-auth="'tag.edit'"
        class="button is-primary is-success"
        @click="create"
      >Atualizar TAG</button>
      <button
        v-else
        v-auth="'tag.create'"
        class="button is-primary is-success"
        @click="create"
      >Criar TAG</button>
    </div>
  </div>
</template>

<script>
import Tags from '@/services/tag';

export default {
  data() {
    return {
      tagId: false,
      form: {
        value: "",
        published: ""
      },
      errors: {
        value: [],
        published: []
      },
    };
  },
  created() {
    this.tagId = this.$route.params.id;

    if (this.tagId) {
        Tags.detail(this.tagId)
            .then(res => res.data)
            .then(object => {
              this.form = object;
            });
    }
  },
  methods: {
    create() {
      for (let k in this.errors) {
        this.errors[k] = [];
      }

      let data = {
        value: this.form.value,
        published: this.form.published,
      };

      let request = "";
      if (this.tagId) {
        request = Tags.update(this.tagId, data);
      } else {
        request = Tags.create(data);
      }

      request.then(res => {
        if (res.status == 200) {
          this.$router.push("/dash/tags/");
        } else {
          for (let k in res.data) {
            this.errors[k] = res.data[k];
          }
        }
      });
    },
    removeTag() {
      this.$dialog.confirm({
        message: "Confirma exclusão de TAG?",
        onConfirm: () => {
          Tags.remove(this.tagId)
            .finally(() => {
              this.$router.push("/dash/tags");
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.box {
  background: #eeeeee;
  padding: 30px;
  border-radius: 8px;
}
.cursor {
  cursor: pointer;
}
</style>
