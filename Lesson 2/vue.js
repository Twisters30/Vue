var app = {
    el:'#app',
    data() {
      return {
        message: "",
        btnType: "submit",
        btnDiss: true,
        tasks: [
          {text: 'Развернуть окружение в Codepen', done: false},
          {text: 'Пройти курс по Vue', done: false},
          {text: 'Сделать интернет-магазин на Vue', done :false}
        ],
        tasksDone: [
          {text: 'попил кофе', done:true},
          {text: 'cходил в душ', done:true},
          {text:'поел', done:true},
          {text:'поспал', done:true},
        ]
      }
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
      addTask: function() {
        this.tasks.push({text: this.message, done: false})
        this.btnDiss = true
        this.message = ''
      },
      taskUncheck: function(task) {
        this.tasks.push(this.tasksDone[task])
        this.tasksDone.splice(task, 1)
      },
      taskCheck: function(task) {
        this.tasksDone.push(this.tasks[task])
        this.tasks.splice(task, 1)
      },
      count: function() {
        return this.tasks.filter(task => task.done == false).length;
      }
    },
  }
  
  Vue.createApp(app).mount('#app');