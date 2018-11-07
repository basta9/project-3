'use strict';

import editHelpers from './edit-helpers.cmp.js';
import keepService from '../../services/missKeep/keep.service.js';
import { utilService } from "../../services/util.service.js";
// import eventBus, { SET_PREVIEW } from '../event-bus.js'

export default {
  template: `
   <form @submit="save" class="note-editor">
            <component v-for="(currCmp, idx) in cmps" 
                        :is="currCmp.type" 
                        :data="currCmp.data" 
                        @setInput="setInput($event, idx)"
                        @addToDo="addToDo($event, idx)"
                        class="editor-input">
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
        {
          type: 'todo',
          data: {
            label: 'Add a To-Do:',
          }
        },
        {
          type: 'imgLink',
          data: {
            label: 'Link for Image:',
          }
        },
      ],
      answers: []
    }
  },
  methods: {
    setInput(ev, idx) {
      console.log('Survey Got ev', idx, ev);
      this.answers[idx] = ev;
    },
    addToDo(todo, idx) {
      if (!this.answers[idx]) {
        this.answers[idx] = [todo];
      } else {
        this.answers[idx].push(todo);
      }
      console.log('todo-add', idx, todo);
    },
    save() {
      var newNote = {
        id: utilService.makeId(),
        text: { input: this.answers[0], fontSize: '25px' },
        bgColor: this.answers[1],
        img: this.answers[3],
        todos: this.answers[2],
        audio: '',
        map: ''
      };

      this.$emit('newNote', newNote);
    }
  },
  components: {
    textBox: editHelpers.textBox,
    color: editHelpers.color,
    todo: editHelpers.todos,
    imgLink: editHelpers.img,
  }
}