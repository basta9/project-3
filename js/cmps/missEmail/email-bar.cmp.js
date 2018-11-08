

import eventBus, {TYPE_CHANGED} from '../../event-bus.js';
import emailFilter from './email-filter.cmp.js';


export default {
    props: ['email'],
    template: `
        <section class="email-bar email-app-width flex">
        <div class="box-bar-width"><h4>Email</h4></div>
        <div class="email-list-width">
        <email-filter @filtered="setFilter"></email-filter>
        </div>
        <div class="email-details-width">
        <button @click="composeEmail('reply')">Reply</button>
        <button @click="composeEmail('new')">New</button>
        </div>
        </section>
        `, 
        data() {
            return {
                selectedfilter: null,
                // compEmail: {
                //     composeClick: false,
                //     composeType: ''
                // }
            }
        },
    computed: {
     
    },
    methods: {
        setType(type) {
            this.$emit('typed', type);
            eventBus.$emit(TYPE_CHANGED, {...type});
        },
        composeEmail(composeType){
            // console.log({composeClick: !this.compEmail.composeClick, composeType})
            this.$emit('composed', {composeClick: true, composeType});
            // eventBus.$emit(COMPOSE_CHANGED, {...{composeClick: !this.compEmail.composeClick, composeType}});
        },
        setFilter(filter) {
            this.selectedfilter = filter;
            this.$emit('filtered', {...this.selectedfilter});
          }
    },
    components: {
      emailFilter
    }

}