
import {emailService} from '../../services/missEmail/email.service.js';


import emailList from './email-list.cmp.js';
import emailDetails from './email-details.cmp.js';
// import emailStatus from './email-status.cmp.js';

export default {
    props: ['type', 'filter'],
    template: `
        <section class="email-box flex">
            <email-details :email="selectedEmail"></email-details>
            <email-list :emails="emails" @selected="selectEmail"></email-list>
        </section>
    `,
    data() {
        return {
            emails: [],
            selectedEmail: null,
        }
    },
    created() {
        this.showEmail();
    },
    watch: {
        type() {
          this.showEmail();
        },
        filter() {
          this.showEmail();
        }
      },
    methods: {
        selectEmail(email){
          this.selectedEmail = email;
      },
      showEmail() {
        emailService.query(this.type, this.filter)
        .then(emails => this.emails = emails)
      }
    },
    
    components: {
      emailList,
      emailDetails
    }
}