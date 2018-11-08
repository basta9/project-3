

import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    template: `
        <section class="emails-list">
            <ul>
            <email-preview  v-for="email in emails" :email="email" @click.native="selectEmail(email)">
             </email-preview>
            </ul>
        </section>
    `,
    methods: {
        selectEmail(email){
            this.$emit('selected', {...email});
            this.$emit('composed', false);
        }
    },
    components: {
        emailPreview
    }
   
}