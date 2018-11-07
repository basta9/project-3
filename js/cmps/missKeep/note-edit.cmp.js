'use strict';

import editHelpers from './edit-helpers.cmp.js';
import keepService from '../../services/keep.service.js';
// import eventBus, { SET_PREVIEW } from '../event-bus.js'

export default {
  template: `
   <form @submit.prevent="save">
            <component v-for="(currCmp, idx) in cmps" 
                        :is="currCmp.type" 
                        :data="currCmp.data" 
                        @setInput="setInput($event, idx)">
            </component>
            <button>Save</button>
    </form>
  `,
  data() {
    return {
      cmps: [
        {
          type: 'textBox',
          data: {
            label: 'Write your Note:'
          }
        },
        {
          type: 'color',
          data: {
            label: 'Note Color:',
          }
        },
      ],
      answers: []
    }
  },
  methods: {
    setInput(ev, inputIdx) {
      this.answers[inputIdx] = ev;
      console.log('Survey Got ev', inputIdx, ev);
      eventBus.$emit(SET_PREVIEW, this.answers);
    },
    save() {
      console.log('Survey Answers', this.answers);
      keepService.save(this.answers);
    }
  },
  components: {
    textBox: editHelpers.textBox,
    color: editHelpers.color
  }
}