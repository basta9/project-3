'use strict';

export default {
    props: [],
    template: `
    <section v-if="cmp" class="notes-preview">
            <component v-for="(currCmp, idx) in cmps" 
                        :is="currCmp.type" 
                        :data="currCmp.data" 
                        @setInput="setInput($event, idx)">
            </component>
    </section>
  `,
    data() {
        return {
            cmp: null
        }
    },
    created() {
        eventBus.$on(SET_PREVIEW, preview => {
            this.cmp = preview;


        })
    }
}