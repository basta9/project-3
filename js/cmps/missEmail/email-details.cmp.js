

import {emailService} from '../../services/missEmail/email.service.js';


export default {
    template: `
 <section class="email-deatails" v-if="email">
     {{email}}
 <router-link to="/emailApp">Return</router-link>
 </section>
 `, 
 data() {
    return {
        email: null,
    }
},
    methods: {

    },
    created() {
        emailService.getEmailById(this.$route.params.emailId)
            .then(email => this.email = email);
    },
    computed: {
     
    }
}