import { utilService } from '../../services/util.service.js';
import { emailService } from '../../services/missEmail/email.service.js';
import eventBus ,{PAGE_CHANGED} from '../../event-bus.js';
import { WINDOW_WIDTH_CHANGED } from '../../event-bus.js';

export default {
    props: ['email'],
    template: `
            <form class="email-compose email-list-width flex" @submit.prevent>
                <div class="compose-info flex">
            <input type="email" @input="" placeholder="To:" v-model:value="currEmail.to" required/>
                </div>
                <div class="compose-info flex">
                <input type="email" @input="" placeholder="Cc:" v-model:value="currEmail.cc"/>
            </div>
                <div class="compose-info flex">
                <input type="text" @input="" placeholder="Subject:" v-model:value="currEmail.subject"/>
            </div>
                <div class="compose-info flex">
                <input type="email" @input="" placeholder="From:" v-model:value="currEmail.from"/>
            </div>
            <div class="compose-text-box flex">
            <textarea v-model:value="currEmail.body"> </textarea >
            </div>
            <div class="compose-text-button flex">
            <button type="submit" @click="composeClick('sent')">Send</button>
            <button type="submit" @click="composeClick('draft')">Save For Later</button>
            <button v-if="windowWidth < 800" type="submit" @click="composeClick('back')">Back To List</button>
            </div>
            </form>
        `,
    data() {
        return {
            currEmail: {
                id: '',
                from: '',
                to: '',
                cc: '',
                type: 'draft',
                subject: '',
                body: '',
                isRead: null,
                sentAt: ''
            },
            windowWidth: window.innerWidth,
        }
    },
    created() {
        this.setCurrEmail();
        eventBus.$on(WINDOW_WIDTH_CHANGED, width => {
            this.windowWidth = width;
            });
    },
    mounted() {
        this.$nextTick(() => {
          window.addEventListener('resize', () => {
            this.windowWidth = window.innerWidth;
        })
    });
    },
    methods: {
        setCurrEmail() {
            this.currEmail = {
                id: (this.email.id) ? this.email.id : '',
                from: (this.email.form) ? this.email.from : 'me@gmail.com',
                to: (this.email.to) ? this.email.to : '',
                cc: (this.email.cc) ? this.email.cc : '',
                type: (this.email.type) ? this.email.type : '',
                subject: (this.email.subject) ? this.email.subject : '',
                body: (this.email.body) ? this.email.body : '',
                isRead: (this.email.isRead) ? this.email.isRead : false,
                sentAt: (this.email.sentAt) ? this.email.sentAt : ''
            }
        },
        composeClick(box){
            if (box === 'back') eventBus.$emit(PAGE_CHANGED, 'emailList');
            else {
                this.currEmail.type = box;
                this.currEmail.sentAt = moment().format('MMMM Do YYYY, hh:mm:ss');
                this.currEmail.id = utilService.makeId();
                emailService.createEmail({...this.currEmail})
            }
        }
    }
};