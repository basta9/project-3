
import { emailService } from '../../services/missEmail/email.service.js';


import emailList from './email-list.cmp.js';
import emailDetails from './email-details.cmp.js';
import emailCompose from './email-compose.cmp.js';
// import emailStatus from './email-status.cmp.js';

export default {
    props: ['type', 'filter', 'compose'],
    template: `
        <section class="email-box flex">
            <email-list :emails="emails" @selected="selectEmail" @composed="setCompose"></email-list>
            <email-compose v-if="composeEmail.isComposed"></email-compose>
            <email-details v-else :email="selectedEmail" @selected="selectEmail" ></email-details>
        </section>
    `,
    data() {
        return {
            emails: [],
            selectedEmail: null,
            selectedType: null,
            composeEmail: {
                isComposed: false,
                composeType: 'new'
            }
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
        },
        compose() {
            this.composeEmail = this.compose;
            this.setCompose(this.composeEmail)
        }
    },
    methods: {
        selectEmail(email) {
            this.selectedEmail = email;
        },
        showEmail() {
            emailService.query(this.type, this.filter)
                .then(emails => this.emails = emails)
        },
        setType(type) {
            this.selectedType = type;
        },
        setCompose(compose) {
            this.composeEmail = compose;
        }
    },

    components: {
        emailList,
        emailDetails,
        emailCompose
    }
}