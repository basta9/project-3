'use strict';
import noteTodo from './note-todo.cmp.js';


export default {
  props: ['note'],
  template: `
    <section class="notes-preview" :style="'background:' + note.bgColor">
            <p v-if="note.text.input">{{note.text.input}}</p>
            <img v-if="note.img" :src="note.img" alt="couldnt load you img">
            <note-todo v-if="note.todos" v-for="todo in note.todos" :todo="todo"></note-todo>
    </section>
  `,
  components: {
    noteTodo
  }

}