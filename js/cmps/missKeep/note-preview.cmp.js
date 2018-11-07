'use strict';
import noteTodo from './note-todo.cmp.js';
import eventBus, { DELETE_NOTE } from '../../event-bus.js';

export default {
  props: ['note'],
  template: `
    <section class="notes-preview" :style="'background:' + note.bgColor">
            <p v-if="note.text.input">{{note.text.input}}</p>
            <img v-if="note.img" :src="note.img" alt="couldnt load you img">
            <note-todo v-if="note.todos" v-for="todo in note.todos" :todo="todo"></note-todo>
            <router-link class="edit-note" :to="'/keepApp/noteEdit/'+note.id">Edit Note</router-link>
            <button @click="deleteNote">Delete</button>
   </section>
  `,
  methods: {
    deleteNote() {
      eventBus.$emit(DELETE_NOTE, this.note.id);
    }
  },
  components: {
    noteTodo
  }
}