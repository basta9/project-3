


export default {
    template: `
   <h2> Note:</h2>
   <form @submit.prevent="save">
            <component v-for="(currCmp, idx) in cmps" 
                        :is="currCmp.type" 
                        :data="currCmp.data" 
                        @setInput="setInput($event, idx)">
            </component>
            <button type="submit">Save</button>
    </form>
  `
}