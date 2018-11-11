
import { emailService } from '../../services/missEmail/email.service.js';
import eventBus, {COMPOSE_CHANGED} from '../../event-bus.js';
import { PAGE_CHANGED } from '../../event-bus.js';
import { LIST_CHANGED } from '../../event-bus.js';

import emailList from './email-list.cmp.js';
import emailDetails from './email-details.cmp.js';
import emailCompose from './email-compose.cmp.js';
// import emailStatus from './email-status.cmp.js';

export default {
    props: ['type', 'filter', 'compose'],
    template: `
        <section v-if="windowWidth >= 800" class="email-box box-bar-width flex">
            <email-list :emails="emails" @selected="selectEmail" @composed="$emit('composed', $event)"></email-list>
            <email-compose v-if="compose.composeClick" :email="compose.composeType === 'new' ? {} : selectedEmail"></email-compose>
            <email-details v-if="selectedEmail" :email="selectedEmail" @selected="selectEmail" ></email-details>
        </section>
        <section class="email-box flex" v-else-if="windowWidth < 800">
            <email-list  v-if="currentPage === 'emailList'" :emails="emails" @selected="selectEmail" @composed="$emit('composed', $event)"></email-list>
            <email-compose v-else-if="currentPage === 'emailCompose' && compose.composeClick" :email="compose.composeType === 'new' ? {} : selectedEmail"></email-compose>
            <email-details v-else-if="currentPage === 'emailDetails' && selectedEmail " :email="selectedEmail" @selected="selectEmail" ></email-details>
        </section>
    `,
    data() {
        return {
            emails: this.showEmail(),
            selectedEmail: {},
            selectedType: null,
            composeEmail: {
                composeClick: false,
                composeType: 'new'
            },
            windowWidth: window.innerWidth,
            currentPage: 'emailList'
        }
    },
    created() {
        this.showEmail();
            eventBus.$on(COMPOSE_CHANGED, compose =>{
                this.composeEmail = compose;
                this.$emit('composed', compose);
            });
            eventBus.$on(PAGE_CHANGED, page =>{
                this.currentPage = page;
            });
            eventBus.$on(LIST_CHANGED, () =>{
                console.log('list changed')
            });
    },
      mounted() {
        this.$nextTick(() => {
          window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        });
        this.showEmail();
    })
      },
    watch: {
        type() {
            this.showEmail();
        },
        filter() {
            this.showEmail();
        },
        compose(){
            this.showEmail();
            eventBus.$emit(COMPOSE_CHANGED, {...this.composeEmail});
        }
    },
    methods: {
        selectEmail(email) {
            this.selectedEmail = email;
        },
        showEmail() {
         this.emails = emailService.query(this.type, this.filter)
                .then(emails => this.emails = emails)
                console.log(this.emails)
        },
        setType(type) {
            this.selectedType = type;
        }
    },

    components: {
        emailList,
        emailDetails,
        emailCompose
    }
}