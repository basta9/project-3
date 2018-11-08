
import boxBar from './box-bar.cmp.js';
import emailBox from './email-box.cmp.js';
import emailBar from './email-bar.cmp.js';


export default {
  template: `
        <section class="email-app flex">
        <h1>Email App</h1>
            <email-bar @filtered="setFilter" @composed="setCompose"></email-bar>
            <section class="email-app-container flex">
            <box-bar @typed="setType"></box-bar>
            <email-box :type="selectedType" :filter="selectedfilter" :compose="composedClicked"></email-box>
            </section>
        </section>
    `,
  data() {
    return {
      selectedType: null,
      selectedfilter: null,
      composedClicked: null
    }
  },
  methods: {
    setType(type) {
      this.selectedType = type;
    },
    setFilter(filter) {
      this.selectedfilter = filter;
    },
    setEmail(email) {
      this.selectedEmail = email;
    },
    setCompose(compose) {
      this.composedClicked = compose;
    }
  },
  components: {
    boxBar,
    emailBox,
    emailBar
  }
}