<template>
  <div>
    <div class="columns">
      <div class="column is-1">Ano de ensino</div>
      <div class="column is-11">Objeto de aprendizado</div>
    </div>
    <div class="columns year-wrapper" v-for="(age, year) of years" :key="year">
      <div class="column is-2 year center-vertical-text">{{ age.idade.idade_nome }}</div>
      <div class="column is-10">
        <div class="columns objects" v-for="(skills, object) of age.objects" :key="object">
          <div class="column is-4 px-0 center-vertical-text object">
            <b>{{ object }}</b>
          </div>
          <div class="column is-8 px-0">
            <!-- {{ skills.length }} -->
            <div
              v-for="skill of skills"
              :key="skill.habilidade_id"
              class="skill"
              :class="'skill-'+skill.eixo_code"
              @click="$emit('click', skill)"
            >
              {{ skill.eixo_nome }}
            <!-- {{ skill.habilidade_nome }} -->
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
    years: Object
  }
};
</script>

<style scoped>
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
  background: #ddd;
  justify-content: center;
  font-size: 20px;
}
.objects .skill:hover {
  background: rgba(0, 0, 0, 0.1);
}
.px-0 {
  padding: 0px;
}
</style>
