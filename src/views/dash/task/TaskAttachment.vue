<template>
  <div>
    <br>
    <router-link to="/dash/atividades" class="button is-white is-pulled-right">Voltar</router-link>
    <h4 class="title is-4">Anexos da atividade</h4>

    <br>
    <div class="card">
      <div class="card-content">
        <button class="button is-success" @click="isOpenAttachmentModal = true">Adicionar anexo</button>
        <div v-if="attachments && attachments.length > 0">
          <br>
          <table class="table is-striped is-hoverable is-fullwidth">
            <tbody>
              <tr v-for="attachment of attachments" :key="attachment.id">
                <td>
                  <div class="field has-addons is-pulled-right">
                    <div class="control">
                      <a
                        class="button is-small is-info"
                        target="_blank"
                        :href="getPublicUrl(attachment)"
                      >Ver</a>
                    </div>
                    <div class="control">
                      <button
                        class="button is-small is-light"
                        @click="removeAttachment(attachment.id)"
                      >Remover</button>
                    </div>
                  </div>
                  <b>{{ attachment.title }}</b>
                  <br>
                  {{ attachment.description }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>Nenhum anexo.</div>
      </div>
    </div>

    <modal-attachment
      :show.sync="isOpenAttachmentModal"
      @close="isOpenAttachmentModal = false"
      @add="addAttachment"
    ></modal-attachment>
  </div>
</template>

<script>
import ModalAttachment from "@/components/ModalAttachment";
import AttachmentService from "@/services/attachment";

export default {
  components: {
    ModalAttachment
  },
  data() {
    return {
      taskId: false,
      isOpenAttachmentModal: false,
      attachments: []
    };
  },
  created() {
    this.taskId = this.$route.params.id;

    if (this.taskId) {
      this.fetch();
    } else {
      this.$router.push("/dash/atividades");
    }
  },
  methods: {
    fetch() {
      AttachmentService.list(this.taskId)
        .then(res => res.data)
        .then(attachments => {
          this.attachments = attachments;
          console.log("atta", attachments);
        });
    },
    addAttachment(attachment) {
      AttachmentService.create(this.taskId, attachment).then(() => {
        this.isOpenAttachmentModal = false;
        this.fetch();
      });
    },
    removeAttachment(attachment_id) {
      this.$dialog.confirm({
        message: "Confirma exclusão de anexo?",
        onConfirm: () => {
          AttachmentService.remove(this.taskId, attachment_id).then(() => {
            this.fetch();
          });
        }
      });
    },
    getPublicUrl(attachment) {
      return process.env.VUE_APP_FILE_URL + attachment.path;
    }
  }
};
</script>

<style scoped>
</style>
