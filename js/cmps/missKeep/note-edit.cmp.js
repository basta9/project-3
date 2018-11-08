'use strict';

import editHelpers from './edit-helpers.cmp.js';
import keepService from '../../services/missKeep/keep.service.js';
import { utilService } from "../../services/util.service.js";
// import eventBus from '../../event-bus.js';
// import eventBus, { PIN_SET } from '../../event-bus.js'

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
                        @setPin="setIfPined($event, idx)"
                        class="editor-input">
            </component>
            <button>{{(note.id)? 'Save': 'Add'}}</button>
            <button type="button" @click="goToList">Note List</button>
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
  mounted() {
    document.querySelector('body').style.backgroundImage = 'url(../../img/notebook-bg.jpg)';
    document.querySelector('body').style.height = '100vh';
    document.querySelector('body').style.backgroundRepeat = 'no-repeat';
    document.querySelector('body').style.backgroundSize = 'cover';
    document.querySelector('body').style.minHeight = '650px';
  },
  destroyed() {
    document.querySelector('body').style.backgroundImage = '';
    document.querySelector('body').style.height = '';
    document.querySelector('body').style.backgroundRepeat = '';
    document.querySelector('body').style.backgroundSize = '';
    document.querySelector('body').style.minHeight = '';
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
        {
          type: 'pin',
          data: {
            label: 'Pin Note:',
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
    setIfPined(isPined, idx) {
      this.answers[idx] = isPined;
    },
    addToDo(todo, idx) {
      if (!this.answers[idx]) {
        this.answers[idx] = [{ text: todo, isDone: false }];
      } else {
        this.answers[idx].push({ text: todo, isDone: false });
      }
      console.log('todo-add', idx, todo);
    },
    save() {
      console.log('note', this.note);
      var newNote = {
        isPined: this.answers[4],
        text: { input: this.answers[0], fontSize: '25px' },
        bgColor: (this.answers[1]) ? this.answers[1] : '',
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
    goToList() {
      this.$router.push('/keepApp');
    }
  },
  components: {
    textBox: editHelpers.textBox,
    color: editHelpers.color,
    todo: editHelpers.todos,
    imgLink: editHelpers.img,
    pin: editHelpers.pin,
  }
}