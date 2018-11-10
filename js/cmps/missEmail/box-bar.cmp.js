import eventBus, {TYPE_CHANGED} from '../../event-bus.js';
import { PAGE_CHANGED } from '../../event-bus.js';


export default {
    template: `
  <nav class="box-bar flex">
      <div class="box-element" v-for="type in types" :type="type" @click="setType(type, null)">{{type}}</div>
  </nav>
`,
    data() {
        return {
            types: {
                inbox: 'inbox',
                sent: 'sent',
                draft: 'draft'
            }
        }
    },
    methods: {
        setType(type) {
            this.$emit('typed', type);
            eventBus.$emit(TYPE_CHANGED, {...type});
            eventBus.$emit(PAGE_CHANGED, 'emailList');
        }
    }

}