'use strict';

import editHelpers from './edit-helpers.cmp.js';
import keepService from '../../services/missKeep/keep.service.js';
import { utilService } from "../../services/util.service.js";

export default {
  template: `
    <section class="edit-container">
      <h2>{{(note.id)? 'Edit Note': 'Add Note'}}</h2>
      <form @submit="save" class="note-editor " :style="'background-color: ' + bg ">
          <!-- PIN -->
          <div v-if="isPined" class="note-pin">📌</div>
          <!-- textarea -->
          <text-Box @setInput="setInput($event, 'txt')" :text="txt"></text-Box> <br>
          <!-- todo -->
          <div v-for="(todo,idx) in todos" v-if="todo" class="note-todo">
            <input type="checkbox" v-model="todo.isDone">
            <input type="text" title="Add To-Do" v-model="todo.text" placeholder="To do.."/>
            <span @click="delteTodo(idx)">X</span>
          </div>
         <!-- img -->
          <div v-for="(img,idx) in images" v-if="img" class="note-img">
            <div @click="delteImg(idx)">X</div>
            <img :src="img" width="200px">
          </div>
          
          
      
          
          
              <component  v-for="(currCmp, idx) in cmps" 
                        :is="currCmp.type" 
                        :data="currCmp.data" 
                        @setInput="setInput($event, idx)"
                        @setPin="isPined = !isPined"
                        class="editor-input">
              </component>
              <button>{{(note.id)? 'Save': 'Add'}}</button>
      
          </form>
          <button type="button" @click="goToList">Note List</button>
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
          type: 'color',
        },
        {
          type: 'todo',
        },
        {
          type: 'imgLink',
        },
        {
          type: 'pin',
        },
      ],
      bg: '',
      txt: '',
      images: [],
      todos: [],
      isPined: false
    }
  },
  methods: {
    setInput(ev, idx) {
      console.log(ev, idx);

      if (idx === 'txt') this.txt = ev;
      if (idx === 0) this.bg = ev;
      if (idx === 1) {
        var todo = { text: '', isDone: false };
        this.todos.push(todo);
      }
      if (idx === 2) this.images.push(ev);

    },
    // IMG
    delteImg(idx) {
      this.images.splice(idx, 1);
      console.log('images', this.images);
    },
    // TODO
    delteTodo(idx) {
      this.todos.splice(idx, 1);
      console.log('todos', this.todos);
    },
    save() {
      var newNote = {
        isPined: this.isPined,
        text: this.txt,
        bgColor: this.bg,
        img: this.images,
        todos: this.todos,
        audio: '',
        map: ''
      };
      //set new note id according to add/update
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