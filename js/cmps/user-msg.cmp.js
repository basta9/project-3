import eventBus, {REVIEW_ADDED} from '../event-bus.js';
import {BOOK_ADDED} from '../event-bus.js';


export default {
    template: `
        <section class="user-msg" v-if="msg">
            <h6>{{msg.txt}}</h6>
        </section>
    
    `,
    data() {
        return {
            msg: null
        }
    },
    created() {
        eventBus.$on(REVIEW_ADDED, msg=>{
            this.msg = msg;
            var delay = 3000;
            setTimeout(()=>{
                this.msg = null;
            }, delay)
        })
        eventBus.$on(BOOK_ADDED, msg=>{
            this.msg = msg;
            var delay = 3000;
            setTimeout(()=>{
                this.msg = null;
            }, delay)
        })
    }
}