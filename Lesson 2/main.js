Vue.component('like-buttons',{
  template: `
  <div style="margin-left:auto;">
    <button @click="likeCounter++" type="button">▲{{ likeCounter }}</button>
    <button @click="disLikeCouner++" type="button">▼{{ disLikeCouner }}</button>
  </div>
  `,
  data() {
    return {
      likeCounter:0,
      disLikeCouner:0
    }
  },
})
Vue.component('task-list', {
  props: {
    tasks:{
      type:Array,
      default:() => []
    },
    title: {
      type:Boolean,
      default: () => false,
    }
},
  template: `
  <div>
    <h2 v-if="title">Завершённые задачи</h2>
    <ul class="list">
      <li class="item d-flex"v-for="(task, i) of tasks"  :class="{ done: task.done }">
        <input type="checkbox" v-model="task.done" :key="task.text" @change="taskCheck(i)">
          {{ task.text }}<like-buttons/>
      </li>
    </ul>
  </div>
  `,
})
var app = new Vue ({
  el:'#app',
  data: {
      message: "",
      btnType: "submit",
      btnDiss: true,
      tasks: [
        {text: 'Развернуть окружение в Codepen', done: false},
        {text: 'Пройти курс по Vue', done: false},
        {text: 'Сделать интернет-магазин на Vue', done :false},
        {text: 'попил кофе', done: true},
        {text: 'cходил в душ', done: true},
        {text: 'поел', done: true},
        {text: 'поспал', done: true},
      ],

  },
  methods: {
    inputCheck: function(event) {
      this.message = event.target.value
      if(event.target.value.length) {
        this.btnDiss = false
      } else {
        this.btnDiss = true
      }
    },
    countSymbol(str,char) {
      let result = 0
      for(let i = 0; i< str.length; i++) {
        if(str[i] === char) {
          ++result
        }
      }
      return result
    },
    addTask: function() {
      this.tasks.push({text: this.message, done: false})
      this.btnDiss = true
      this.message = ''

    },
    taskUncheck() {
      return this.tasks.filter(task => !task.done)
    },
    taskCheck(){
      return this.tasks.filter(task => task.done)
    },
    count: function() {
      return this.tasks.filter(task => task.done == false).length;
    }
  }
  })