
import emailBox from './email-box.cmp.js';
import emailBar from './email-bar.cmp.js';
import emailFilter from './email-filter.cmp.js';


export default {
  template: `
        <section class="email-app flex">
            <h1>Email App</h1>
            <email-filter @filtered="setFilter"></email-filter>
            <section class="email-app-container flex">
            <email-bar @typed="setType"></email-bar>
            <email-box v-if="selectedType" :type="selectedType" :filter="selecterfilter"></email-box>
            <div class="empty-list" v-else></div>
            </section>
        </section>
    `,
  data() {
    return {
      selectedType: null,
      selecterfilter: null
    }
  },
  methods: {
    setType(type) {
      this.selectedType = type;
    },
    setFilter(filter) {
      this.selecterfilter = filter;
    },
  },
  components: {
    emailBox,
    emailBar,
    emailFilter
  }
}