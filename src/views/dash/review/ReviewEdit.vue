<template>
  <div>
    <br />
    <router-link to="/dash/revisao" class="button is-white is-pulled-right">Cancelar</router-link>
    <h4 class="title is-4">Avaliação de atividade</h4>

    <div class="card">
      <div class="card-content">
        <div class="field has-addons" v-auth="'review.evaluate'">
          <div class="control">
            <button @click="createReview('approved')" class="button is-success">Aprovar publicação</button>
          </div>
          <div class="control">
            <button @click="createReview('need_fix')" class="button is-warning">Solicitar ajustes</button>
          </div>
          <div class="control">
            <button @click="createReview('denied')" class="button is-danger">Negar publicação</button>
          </div>
        </div>

        <hr />
        <review-list :title="'Comentários'" :reviews="task.reviews"></review-list>

        <b>Título:</b>
        {{ task.title }}
        <br />

        <b>Requer uso de computador?</b>
        {{ task.is_plugged ? 'Sim' : 'Não' }}
        <br />

        <b>Habilidades cadastradas:</b>
        <span v-if="task.skills && task.skills.length <= 0">
          <small>nenhuma</small>
        </span>
        <span v-else>
          <table class="table table-sm">
            <tr v-for="skill of task.skills" :key="skill.habilidade_id">
              <td>{{ skill.habilidade_nome }}</td>
            </tr>
          </table>
        </span>

        <!-- Tipo atividade criada -->
        <div v-if="task.type == 1">
          <br />
          <b>Descrição da atividade:</b>
          <div class="card">
            <div class="card-content">
              <div class="content ql-editor" v-html="task.description"></div>
            </div>
          </div>
        </div>

        <!-- Tipo atividade referência externa -->
        <div v-if="task.type == 2">
          <b>Fonte:</b>
          {{ task.source }}
        </div>
        <div v-if="task.type == 2">
          <b>Link:</b>
          <a :href="task.link">{{ task.link }}</a>
        </div>
      </div>
    </div>

    <modal-comment :show.sync="isOpenCommentModal" @comment="makeComment($event)"></modal-comment>
  </div>
</template>

<script>
import Reviews from "@/services/review";
import ModalComment from "@/components/ModalComment";
import ReviewList from "@/components/ReviewList";

export default {
  components: {
    ModalComment,
    ReviewList
  },
  data() {
    return {
      task: {},
      isOpenCommentModal: false,
      selectedStatus: false
    };
  },
  created() {
    Reviews.detail(this.$route.params.id)
      .then(res => res.data)
      .then(task => {
        this.task = task;
      });
  },
  methods: {
    createReview(status) {
      let can_comment = true;
      let status_id = 2;
      if (status == "need_fix") {
        status_id = 3;
      } else if (status == "approved") {
        status_id = 4;
        can_comment = false;
      }

      this.selectedStatus = status_id;

      if (can_comment) {
        this.isOpenCommentModal = true;
      } else {
        this.setStatus();
      }
    },
    setStatus() {
      let data = {
        status: this.selectedStatus
      };

      Reviews.setStatus(this.task.id, data).then(() => {
        this.$router.push("/dash/revisao");
      });
    },
    makeComment(comment) {
      let data = {
        comment: comment
      };

      Reviews.create(this.task.id, data).then(() => {
        this.setStatus();
      });
    }
  }
};
</script>

<style>
</style>
