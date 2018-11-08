
import eventBus, {TYPE_CHANGED} from '../../event-bus.js';
import { emailService } from '../../services/missEmail/email.service.js';


export default {
    props: ['email'],
    template: `
 <section class="email-deatails flex" >
     <div v-if="email">
         {{email.subject}}
         </div>
         <div class="empty-list" v-else></div>
        </section>
 `,
    created() {
        eventBus.$on(TYPE_CHANGED, type =>{
            // if (this.email.type !== type)
            // this.$emit('selected', type);
        })
    },
    methods: {

    }
}