


export default {
    template: `
  <nav class="email-bar flex">
      <div class="box-element" v-for="type in types" :type="type" @click="setType(type)">{{type}}</div>
  </nav>
`,
    data() {
        return {
            types: {
                inbox: 'inbox',
                sent: 'sent',
                draft: 'draft'
            }
        }
    },
    methods: {
        setType(type) {
            this.$emit('typed', type);
        }
    }

}