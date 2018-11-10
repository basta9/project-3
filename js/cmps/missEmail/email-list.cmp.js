
import eventBus, {COMPOSE_CHANGED} from '../../event-bus.js';
import {PAGE_CHANGED} from '../../event-bus.js';
import emailPreview from './email-preview.cmp.js';

export default {
    props: ['emails'],
    template: `
        <section v-if="emails" class="email-list email-list-width">
            <ul>
            <email-preview  v-for="email in emails" :email="email" @click.native="selectEmail(email)">
             </email-preview>
            </ul>
        </section>
        <div v-else="!emails" class="email-list"></div>
    `,
    methods: {
        selectEmail(email){
            this.$emit('selected', {...email});
            this.$emit('composed', {
                composeClick: false,
                composeType: email.type
            });
            eventBus.$emit(PAGE_CHANGED, 'emailDetails');
        }
    },
    components: {
        emailPreview
    }
   
}
