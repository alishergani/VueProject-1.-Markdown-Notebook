new Vue({
	el: '#app', 
	data() {
		return {
			content: ""
		}
	},
	computed: {
		notePreview() {
			return marked(this.content)
		}
	}
})