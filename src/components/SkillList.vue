<template>
  <div class="classificacao-years">
    <ul>
      <li v-for="(age, year) of years" :key="year">
        {{ age.idade.idade_nome }}
        <ul>
          <li v-for="(skills, object) of age.objects" :key="object">
            {{ object }}
            <ul>
              <li v-for="skill of skills" :key="skill.habilidade_id" @click="$emit('click', skill)">
                {{ skill.habilidade_nome }}
                <button class="button is-link is-small">
                  <span v-if="edit">Ver atividades</span>
                  <span v-else>Selecionar atividade</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
    <div class="columns year-wrapper">
      <div class="column is-2 year center-vertical-text"></div>
      <!-- <div class="column is-10">
        <div v-for="(skills, object) of age.objects" :key="object" class="card">
          <header class="card-header" @click.prevent="skills.isOpen = !skills.isOpen">
            <p class="card-header-title">{{ object }}</p>
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
      </div>-->
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
