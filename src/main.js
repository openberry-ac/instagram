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
    loading: true,
    contract,
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
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      this.currentAccount = account;
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
      this.loading = false;
      const posts = [];
      const counter = await contract.methods.getCounter().call({
        from: this.currentAccount,
      });

      if (counter !== null) {
        const hashes = [];
        const captions = [];
        for (let i = counter; i >= 1; i -= 1) {
          hashes.push(contract.methods.getHash(i).call({
            from: this.currentAccount,
          }));
        }

        const postHashes = await Promise.all(hashes);

        for (let i = 0; i < postHashes.length; i += 1) {
          captions.push(fetch(`https://gateway.ipfs.io/ipfs/${postHashes[i].text}`)
            .then(res => res.text()));
        }

        const postCaptions = await Promise.all(captions);

        for (let i = 0; i < postHashes.length; i += 1) {
          posts.push({
            id: i,
            key: `key${i}`,
            caption: postCaptions[i],
            src: `https://gateway.ipfs.io/ipfs/${postHashes[i].img}`,
          });
        }

        this.currentPosts = posts;
        this.loading = false;
      }
    },
  },
  render: h => h(App),
});
