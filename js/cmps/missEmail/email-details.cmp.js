
import eventBus, { TYPE_CHANGED } from '../../event-bus.js';
import { WINDOW_WIDTH_CHANGED } from '../../event-bus.js';
import { PAGE_CHANGED } from '../../event-bus.js';
import { emailService } from '../../services/missEmail/email.service.js';


export default {
    props: ['email'],
    template: `
 <section class="email-deatails email-list-width flex" >
     <div v-if="email">
         {{email.subject}}
         <button @click="deleteEmail">Delete</button>
         <button v-if="windowWidth < 800" @click="backToList">Back To List</button>
         </div>
         <div class="empty-list email-list-width" v-else></div>
        </section>
 `,
 data() {
     return {
        windowWidth: null
     }
 },
    created() {
        eventBus.$on(TYPE_CHANGED, type => {
            if (this.email.type !== type) {
                this.$emit('selected', type);
            }
        });
        eventBus.$on(WINDOW_WIDTH_CHANGED, width => {
            this.windowWidth = width;
            });
    },
    watch: {
        windowWidth() {
        eventBus.$on(WINDOW_WIDTH_CHANGED, width => {
            this.windowWidth = width;
            });
        }
    },
    methods: {
        backToList() {
            eventBus.$emit(PAGE_CHANGED, 'emailList');
        },
            deleteEmail() {
                emailService.deleteEmail(this.email.id);
            }
    }
}