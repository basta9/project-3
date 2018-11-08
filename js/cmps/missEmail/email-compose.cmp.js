import { utilService } from '../../services/util.service.js';

export default {
    props: ['email'],
    template: `
            <form class="email-compose email-list-width flex" @submit.prevent>
                <div class="compose-info flex">
            <input type="email" @input="" placeholder="To:" v-bind:value="currEmail.to"/>
                </div>
                <div class="compose-info flex">
                <input type="email" @input="" placeholder="Cc:" v-bind:value="currEmail.cc"/>
            </div>
                <div class="compose-info flex">
                <input type="text" @input="" placeholder="Subject:" v-bind:value="currEmail.subject"/>
            </div>
                <div class="compose-info flex">
                <input type="email" @input="" placeholder="From:" v-bind:value="currEmail.from"/>
            </div>
            <div class="compose-text-box flex">
            <textarea v-bind:value="currEmail.body"> </textarea >
            </div>
            <button class="send-button" type="submit" @click="">Send</button>
            </form>
        `,
    data() {
        return {
            currEmail: null
        }
    },
    created() {
        this.setCurrEmail()
    },
    methods: {
        setCurrEmail() {
            this.currEmail = {
                id: (this.email.id) ? this.email.id : utilService.makeId(),
                from: (this.email.form) ? this.email.form : '',
                to: (this.email.to) ? this.email.to : '',
                cc: (this.email.cc) ? this.email.cc : '',
                type: (this.email.type) ? this.email.type : 'draft',
                subject: (this.email.subject) ? this.email.subject : '',
                body: (this.email.body) ? this.email.body : '',
                isRead: (this.email.isRead) ? this.email.isRead : false,
                sentAt: (this.email.sentAt) ? this.email.sentAt : moment().format('MMMM Do YYYY, hh:mm:ss')
            }
        }
    },
    watch: {
        email() {
            this.setCurrEmail()
        }
    },

    computed: {

    }
};