'use strict';

import editHelpers from './edit-helpers.cmp.js';
import keepService from '../../services/missKeep/keep.service.js';
import { utilService } from "../../services/util.service.js";
// import eventBus, { SET_PREVIEW } from '../event-bus.js'

export default {
  template: `
    <section class="edit-container">
      <h2>{{(note.id)? 'Edit Note': 'Add Note'}}</h2>
        <form @submit="save" class="note-editor">
            <component v-for="(currCmp, idx) in cmps" 
                        :is="currCmp.type" 
                        :data="currCmp.data" 
                        @setInput="setInput($event, idx)"
                        @addToDo="addToDo($event, idx)"
                        class="editor-input">
            </component>
            <button>{{(note.id)? 'Save': 'Add'}}</button>
        </form>
    </section>
  `,
  created() {
    const noteId = this.$route.params.noteId;
    if (noteId) {
      keepService.getNoteById(noteId)
        .then(note => {
          this.note = note;
        })
    }
  },
  data() {
    return {
      note: {},
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
      answers: [],
    }
  },
  methods: {
    setInput(ev, idx) {
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
      console.log('note', this.note);
      var newNote = {
        text: { input: this.answers[0], fontSize: '25px' },
        bgColor: (this.answers[1]) ? this.answers[1] : 'rgb(226, 223, 63)',
        img: (this.answers[3]) ? this.answers[3] : '',
        todos: (this.answers[2]) ? this.answers[2] : '',
        audio: '',
        map: ''
      };
      //set note id according to add/update
      (this.note) ? newNote.id = this.note.id : newNote.id = utilService.makeId();
      keepService.save(newNote)
        .then(() => {
          this.$router.push('/keepApp');
        })
    },
  },
  components: {
    textBox: editHelpers.textBox,
    color: editHelpers.color,
    todo: editHelpers.todos,
    imgLink: editHelpers.img,
  }
}