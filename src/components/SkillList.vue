<template>
  <div class="classificacao-years">
    <div class="columns year-wrapper" v-for="(age, year) of years" :key="year">
      <div class="column is-2 year center-vertical-text">{{ age.idade.idade_nome }}</div>
      <div class="column is-10">
        <div v-for="(skills, object) of age.objects" :key="object" class="card">
          <header class="card-header" @click.prevent="skills.isOpen = !skills.isOpen">
            <p class="card-header-title">{{ object }}</p>
            <a href="#!" class="card-header-icon">
              <span class="icon">
                <i
                  class="fas"
                  :class="{
                    'fa-angle-down': skills.isOpen,
                    'fa-angle-right': !skills.isOpen,
                  }"
                ></i>
              </span>
            </a>
          </header>

          <div class="card-content" :class="{'is-hidden': !skills.isOpen}">
            <div class="content">
              <div class="columns is-multiline">
                <div
                  class="column is-6 is-4-widescreen"
                  v-for="skill of skills.skills"
                  :key="skill.habilidade_id"
                >
                  <div class="box" @click="$emit('click', skill)" :class="'skill-'+skill.eixo_code">
                    {{ skill.habilidade_nome }}
                    <div class="flex-spacing"></div>
                    <button class="button is-light is-small is-fullwidth">
                      <span v-if="edit">Ver atividades</span>
                      <span v-else>Selecionar atividade</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "skill-List",
  props: {
    years: Object,
    edit: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    for (let i in this.years) {
      for (let j in this.years[i].objects) {
        this.$set(this.years[i].objects, j, {
          isOpen: false,
          skills: this.years[i].objects[j]
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.skill {
  text-align: justify;
  border-bottom: 1px solid #ddd;
  padding: 8px !important;
  font-size: 15px;
  line-height: 17px;
  cursor: pointer;
}
.skill:last-child {
  border: none;
}
.skill-PC {
  background: #94f35b33;
}
.skill-MD {
  background: #8c9dd71a;
}
.center-vertical-text {
  display: flex;
  align-items: center;
}
.objects .col-lg-4,
.objects .col-lg-8 {
  border-top: 1px solid #ddd;
  border-right: 1px solid #ddd;
}
.object {
  padding-left: 6px !important;
}
.year-wrapper {
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
}
.year {
  background: #f2f2f2;
  justify-content: center;
  font-size: 20px;
}
.objects .skill:hover {
  background: rgba(0, 0, 0, 0.1);
}
.px-0 {
  padding: 0px;
}
.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  .flex-spacing {
    display: flex;
    flex-grow: 1;
  }
}
</style>
