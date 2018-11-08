

import eventBus, {TYPE_CHANGED} from '../../event-bus.js';
import emailFilter from './email-filter.cmp.js';


export default {
    props: ['email'],
    template: `
        <section class="email-bar flex">
        <h4>Email</h4>
        <email-filter @filtered="setFilter"></email-filter>
        <button @click="composeEmail('reply')">Reply</button>
        <button @click="composeEmail('new')">New</button>
        </section>
        `, 
        data() {
            return {
                selectedfilter: null,
                composed: {
                    isComposed: false,
                    composeType: 'new'
                }
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
            this.$emit('composed', {isComposed: !this.isComposed, composeType});
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