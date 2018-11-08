
import { emailService } from '../../services/missEmail/email.service.js';
import eventBus, {COMPOSE_CHANGED} from '../../event-bus.js';

import emailList from './email-list.cmp.js';
import emailDetails from './email-details.cmp.js';
import emailCompose from './email-compose.cmp.js';
// import emailStatus from './email-status.cmp.js';

export default {
    props: ['type', 'filter', 'compose'],
    template: `
        <section class="email-box box-bar-width flex">
            <email-list :emails="emails" @selected="selectEmail" @composed="$emit('composed', $event)"></email-list>
            <email-compose v-if="compose.composeClick" :email="compose.composeType === 'new' ? {} : selectedEmail"></email-compose>
            <email-details v-else :email="selectedEmail" @selected="selectEmail" ></email-details>
        </section>
    `,
    data() {
        return {
            emails: [],
            selectedEmail: {},
            selectedType: null,
            composeEmail: {
                composeClick: false,
                composeType: 'new'
            }
        }
    },
    created() {
        this.showEmail();
            eventBus.$on(COMPOSE_CHANGED, compose =>{
                this.composeEmail = compose;
                this.$emit('composed', compose);
            })
    },
    watch: {
        type() {
            this.showEmail();
        },
        filter() {
            this.showEmail();
        },
        // compose() {
        //     this.setCompose(this.compose);
        // },
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
            // console.log(compose)
            // this.composeEmail.composeClick = compose.composeClick;
            // this.composeEmail.composeType = compose.composeType;
        }
    },

    components: {
        emailList,
        emailDetails,
        emailCompose
    }
}