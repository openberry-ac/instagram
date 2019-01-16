import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'babel-polyfill';
import
{
  Nav, Image, Card, Layout, Button, Modal, FormFile,
}
  from 'bootstrap-vue/es/components';
import App from './App.vue';
import web3 from './contracts/web3';
import contract from './contracts/contractInstance';


/**
 * injects bootstrap libraries
 * in Vue instance.
 */
Vue.use(BootstrapVue);
Vue.use(Nav);
Vue.use(Image);
Vue.use(Card);
Vue.use(FormFile);
Vue.use(Layout);
Vue.use(Button);
Vue.use(Modal);

// Vue instance
new Vue({
  el: '#app',
  data: {
    currentPosts: [],
    currentAccount: '',
    loading: false,
  },
  /**
   * calls functions for getting
   * account & current posts.
   */
  async created() {
    await this.updateAccount();
    await this.getPosts();
  },
  transformToRequire: {
    img: 'src',
    image: 'xlink:href',
  },
  methods: {
    /**
     * gets current account on web3 and
     * store it on currentAccount variable.
     */
    async updateAccount() {

    },
    /**
     * using the Smart Contract instance:
     * getCounter() - gets the length of total posts
     * getHash() - gets the image & text hashes using an index
     *
     * index is from the iteration of the retrieved total
     * post count. every loop gets the hashes and fetches
     * text & image using the IPFS gateway URL.
     */
    async getPosts() {

    },
  },
  render: h => h(App),
});