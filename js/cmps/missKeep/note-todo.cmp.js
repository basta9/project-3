'use strict';

export default {
  props: ['todo'],
  template: `
    <section class="todo-preview">
           <input type="checkbox"> <span>{{todo}}</span>           
    </section>
  `,


}