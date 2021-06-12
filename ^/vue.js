
Vue.component('like-btn', {
	data: function() {
		return {
			counter: 0
		}
	},
	template: `<button type="button" @click="counter++">
								&#9829; {{counter}}
						</button>`
})

var app = {
	el:'#app',
	data() {
		return {
			message: "vue",
			tasks: [
				{text: 'Развернуть окружение в Codepen', done: true},
				{text: 'Пройти курс по Vue', done: false},
				{text: 'Сделать интернет-магазин на Vue', done :false}
			],
		}
	},
	methods: {
		addTask() {
			this.tasks.push({text: this.message, done: false});
			this.message = '';
	
		},
		count: function() {
			return this.tasks.filter(task => task.done == false).length;
		}
 }
}

Vue.createApp(app).mount('#app');