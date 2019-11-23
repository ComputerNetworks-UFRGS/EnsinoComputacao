<template>
  <section class="classificacao pd">
    <div class="container">
      <iframe
        style="width: 560px; height: 315px"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/HOx6cpnsbpw"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>

      <br />
      <br />
      <br />
      <br />

      <div class="columns year-wrapper is-hidden-mobile">
        <div class="column is-2 year center-vertical-text"></div>
        <div
          class="column is-3 year center-vertical-text"
          v-for="a of axis"
          :key="'header' + a.id"
          :style="{'background-color': a.color}"
        >{{ a.name }}</div>
      </div>

      <div class="columns year-wrapper" v-for="year of years" :key="year.ageGroup.id">
        <div class="column is-2 year center-vertical-text">{{ year.ageGroup.name }}</div>
        <div
          class="column is-3"
          v-for="a of year.axis"
          :key="year.ageGroup.id+'?'+a.axis.id"
          :style="{'backgroundColor': a.axis.color}"
        >
          <div class="year center-vertical-text is-hidden-tablet">{{ a.axis.name }}</div>
          <div v-for="object of a.objects" :key="'object-'+object.id" class="card">
            <header class="card-header" @click.prevent="object.isOpen = !object.isOpen">
              <p class="card-header-title">{{ object.name }}</p>
              <a href="#!" class="card-header-icon">
                <span class="icon">
                  <i
                    class="fas"
                    :class="{
                        'fa-angle-down': object.isOpen,
                        'fa-angle-right': !object.isOpen,
                    }"
                  ></i>
                </span>
              </a>
            </header>

            <div class :class="{'is-hidden': !object.isOpen}">
              <div class="content">
                <div class="has-text-centered">
                  <br />
                  <b>Habilidades</b>
                </div>
                <div
                  class="column is-12 is-12-widescreen"
                  v-for="skill of object.skills"
                  :key="'skill'+skill.id"
                  @click="listTasks(skill)"
                >
                  {{ skill.name }}
                  <button
                    class="button is-info is-small is-fullwidth"
                  >Ver atividades relacionadas</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <b-modal :active="selectedSkill !== false" @close="selectedSkill = false">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">{{ selectedSkill.habilidade_nome }}</p>
          </header>
          <div class="card-content">
            <div class="content">
              <task-list :tasks="tasks"></task-list>
            </div>
          </div>
          <footer class="card-footer">
            <a href="#!" class="card-footer-item" @click.prevent="closeListTasks">
              <span class="icon">
                <i class="fas fa-times"></i>
              </span>
              <span>Voltar</span>
            </a>
          </footer>
        </div>
      </b-modal>
    </div>
  </section>
</template>

<script>
import Skills from "@/services/skill";
import Axis from "@/services/axis";
import Tasks from "@/services/task";
import TaskList from "@/components/TaskList";

export default {
  components: {
    TaskList
  },
  data() {
    return {
      years: [],
      axis: [],
      tasks: [],
      selectedSkill: false
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      Axis.list()
        .then(res => res.data)
        .then(axis => {
          this.axis = axis;
        });
      Skills.axis()
        .then(res => res.data)
        .then(years => {
          for (let i in years) {
            for (let j in years[i].axis) {
              for (let k in years[i].axis[j].objects) {
                years[i].axis[j].objects[k]["isOpen"] = false;
              }
            }
          }
          this.years = years;
        });
    },
    listTasks(skill) {
      this.selectedSkill = skill;
      Tasks.list({
        skills: [skill.id]
      })
        .then(res => res.data)
        .then(tasks => (this.tasks = tasks));
    },
    closeListTasks() {
      this.selectedSkill = false;
      this.tasks = [];
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