'use strict';

export default {
  props: ['todo'],
  template: `
    <section class="todo-preview">
           <input type="checkbox" v-model="isMarked" @change="setTodo"> <span>{{todo.text}}</span>           
    </section>
  `,
  data() {
    return {
      isMarked: this.todo.isDone,
    }
  },
  methods: {
    setTodo() {
      this.$emit('setDone', this.isMarked);
    }
  }

}