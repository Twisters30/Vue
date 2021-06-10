var app = {
    el:'#app',
    data() {
      return {
        message: "vue",
        btnType: "submit",
        btnDiss: "disabled",
        tasks: [
          'Развернуть окружение в Codepen',
          'Пройти курс по Vue',
          'Сделать интернет-магазин на Vue'
        ],
        tasksDone: [
          'попил кофе',
          'cходил в душ',
          'поел',
          'поспал'
        ]
      }
    }
  }
  
  Vue.createApp(app).mount('#app');