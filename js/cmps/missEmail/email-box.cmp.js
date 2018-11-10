
import { emailService } from '../../services/missEmail/email.service.js';
import eventBus, {COMPOSE_CHANGED} from '../../event-bus.js';
import { PAGE_CHANGED } from '../../event-bus.js';
import {WINDOW_WIDTH_CHANGED} from '../../event-bus.js';

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
            <email-details v-else :email="selectedEmail" @selected="selectEmail" ></email-details>
        </section>
        <section class="email-box box-bar-width flex" v-else-if="windowWidth < 800">
            <email-list  v-if="currentPage === 'emailList'" :emails="emails" @selected="selectEmail" @composed="$emit('composed', $event)"></email-list>
            <email-compose v-else-if="currentPage === 'emailCompose'" :email="compose.composeType === 'new' ? {} : selectedEmail"></email-compose>
            <email-details v-else-if="currentPage === 'emailDetails'" :email="selectedEmail" @selected="selectEmail" ></email-details>
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
    },
      mounted() {
        this.$nextTick(() => {
          window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        });
    })
    eventBus.$emit(WINDOW_WIDTH_CHANGED, {...this.windowWidth});
      },
    watch: {
        type() {
            this.showEmail();
        },
        filter() {
            this.showEmail();
        },
        compose(){
        eventBus.$emit(WINDOW_WIDTH_CHANGED, {...this.windowWidth});
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
        }
    },

    components: {
        emailList,
        emailDetails,
        emailCompose
    }
}