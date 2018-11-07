
import {emailService} from '../../services/missEmail/email.service.js';


import emailFilter from './email-filter.cmp.js';
import emailList from './email-list.cmp.js';
import emailDetails from './email-details.cmp.js';
// import emailStatus from './email-status.cmp.js';

export default {
    props: ['type'],
    template: `
        <section class="email-box">
            <h1>{{type}}</h1>
            <email-details :email="selectedEmail"></email-details>
            <email-filter @filtered="setFilter"></email-filter>
            <email-list :emails="emails" @selected="selectEmail"></email-list>
        </section>
    `,
    data() {
        return {
            emails: [],
            selectedEmail: null,
            filter: null
        }
    },
    created() {
      emailService.query(this.type)
            .then(emails => this.emails = emails)
    },
    methods: {
        setFilter(filter) {
          emailService.query(this.type, filter)
            .then(emails => this.emails = emails)
        },
        selectEmail(email){
          this.selectedEmail = email;
      }
    },
    
    components: {
      emailList,
      emailFilter,
      emailDetails
    }
}