
import eventBus, { TYPE_CHANGED } from '../../event-bus.js';
import { WINDOW_WIDTH_CHANGED } from '../../event-bus.js';
import { LIST_CHANGED } from '../../event-bus.js';
import { PAGE_CHANGED } from '../../event-bus.js';
import { emailService } from '../../services/missEmail/email.service.js';


export default {
    props: ['email'],
    template: `
 <section v-if="email" class="email-deatails email-list-width flex" >
         {{email.subject}}
         <button class="send-button flex" @click="deleteEmail">Delete</button>
         <button v-if="windowWidth < 800" class="send-button flex" @click="backToList">Back To List</button>
        </section>
        <div v-else class="empty-list"></div>
 `,
    data() {
        return {
            windowWidth: window.innerWidth
        }
    },
    mounted() {
        this.$nextTick(() => {
            window.addEventListener('resize', () => {
                this.windowWidth = window.innerWidth;
            })
        });
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
    methods: {
        backToList() {
            eventBus.$emit(PAGE_CHANGED, 'emailList');
        },
        deleteEmail() {
            emailService.deleteEmail(this.email.id);
            eventBus.$emit(LIST_CHANGED);
        }
    }
}