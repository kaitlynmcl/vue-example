import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import LazyLoadDirective from './directives/LazyLoadDirective';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.directive("lazyload", LazyLoadDirective);

new Vue({
  render: h => h(App),
}).$mount('#app')
