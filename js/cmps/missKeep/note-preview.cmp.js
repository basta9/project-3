'use strict';
import eventBus, { PIN_SET, DELETE_NOTE } from '../../event-bus.js';
import keepService from '../../services/missKeep/keep.service.js';
import editHelpers from './edit-helpers.cmp.js';


export default {
  props: ['note'],
  template: `<section id="note.id" @click="SetEditor" class="notes-preview" :style="'background:' + note.bgColor">
         <div class="screen"></div>
         <!-- PIN -->
          <div v-if="note.isPined" class="note-pin">📌</div>
          <!-- textarea -->
          <p v-show="!isEditMode">{{note.text}}</p>
          <text-Box v-show="isEditMode" :text="note.text" @setInput="setInput($event, 'txt')"></text-Box> <br>
          <!-- todo -->
          <div v-for="(todo,idx) in note.todos" v-if="todo" class="note-todo">
            <input type="checkbox" v-model="todo.isDone">
            <span v-show="!isEditMode">{{todo.text}}</span>
            <input v-show="isEditMode" type="text" title="Add To-Do" v-model="todo.text" placeholder="To do.."/>
            <span v-show="isEditMode" @click="delteTodo(idx)">X</span>
          </div>
         <!-- img -->
          <div v-for="(img,idx) in note.img" v-if="img" class="note-img">
            <div v-show="isEditMode" @click="delteImg(idx)">X</div>
            <img :src="img" width="200px">
          </div>
            <div v-show="isEditMode">
           <component  v-for="(currCmp, idx) in cmps" 
                        :is="currCmp.type" 
                        :data="currCmp.data" 
                        @setInput="setInput($event, idx)"
                        @setPin="isPined = !isPined"
                        class="editor-input">
              </component>
              <button>Save</button>
              </div>
          </form>
          </section>
    <!-- <section class="notes-preview" :style="'background:' + note.bgColor">
            <div @click="setPin" :class="'pin ' +pined">📌</div>
            <p v-if="note.text.input">{{note.text.input}}</p>
            <img v-if="note.img" :src="note.img" alt="couldnt load you img">
            <note-todo v-if="note.todos" v-for="(todo,key) in note.todos" @setDone="setDone($event,key)" :todo="todo"></note-todo>
            <router-link class="edit-note" :to="'/keepApp/noteEdit/'+note.id">Edit Note</router-link>
            <button @click="deleteNote">Delete</button>
   </section> -->
  `,
  data() {
    return {
      isEditMode: false,
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
    }
  },
  methods: {
    SetEditor(){
      this.isEditMode = true;
      document.body.classList.toggle('editor');
      // document.querySelector() .toggle('editor');
      // document.querySelector('body').style.minHeight = '650px';
    },
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
    textBox: editHelpers.textBox,
    color: editHelpers.color,
    todo: editHelpers.todos,
    imgLink: editHelpers.img,
    pin: editHelpers.pin,
  }
}