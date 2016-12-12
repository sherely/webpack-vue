import Vue from 'Vue'
import Child from '../components/a.vue'
new Vue({
	el: '#app',
	components: {
		'my-component': Child
	}
});