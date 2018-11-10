

import eventBus, {TYPE_CHANGED} from '../../event-bus.js';
import emailFilter from './email-filter.cmp.js';
import {PAGE_CHANGED} from '../../event-bus.js';


export default {
    props: ['email'],
    template: `
        <section class="email-bar email-app-width flex">
        <div class="email-bar-head box-bar-width"><h4>Email</h4></div>
        <div class="email-bar-width">
        <email-filter @filtered="setFilter"></email-filter>
        </div>
        <div class="email-bar-func">
        <button @click="composeEmail('reply')">Reply</button>
        <button @click="composeEmail('new')">New</button>
        </div>
        </section>
        `, 
        data() {
            return {
                selectedfilter: null,
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
            this.$emit('composed', {composeClick: true, composeType});
            eventBus.$emit(PAGE_CHANGED, 'emailCompose');
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
