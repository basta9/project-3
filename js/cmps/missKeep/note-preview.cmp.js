'use strict';
import noteTodo from './note-todo.cmp.js';
// import eventBus from '../../event-bus.js';
import eventBus, { PIN_SET, DELETE_NOTE } from '../../event-bus.js';
import keepService from '../../services/missKeep/keep.service.js';


export default {
  props: ['note'],
  template: `
    <section class="notes-preview" :style="'background:' + note.bgColor">
            <div @click="setPin" :class="'pin ' +pined">📌</div>
            <p v-if="note.text.input">{{note.text.input}}</p>
            <img v-if="note.img" :src="note.img" alt="couldnt load you img">
            <note-todo v-if="note.todos" v-for="(todo,key) in note.todos" @setDone="setDone($event,key)" :todo="todo"></note-todo>
            <router-link class="edit-note" :to="'/keepApp/noteEdit/'+note.id">Edit Note</router-link>
            <button @click="deleteNote">Delete</button>
   </section>
  `,
  data() {
    return {
      pined: (this.note.isPined) ? 'pined' : null,
      isPined: this.note.isPined
    }
  },
  methods: {
    deleteNote() {
      eventBus.$emit(DELETE_NOTE, this.note.id);
    },
    setDone(isDone, todoIdx) {
      console.log('todo', isDone, todoIdx);
      keepService.updateTodo(this.note.id, todoIdx, isDone)
    },
    setPin() {
      this.isPined = !this.isPined;
      if (!this.pined) this.pined = 'pined';
      else this.pined = null;
      // eventBus.$emit(PIN_SET, 'hello');
      keepService.setPin(this.note.id, this.isPined);
      // { id: this.note.id, isPined: this.isPined }
    }
  },
  components: {
    noteTodo
  }
}