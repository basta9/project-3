



export default {
    props: ['email'],
    template: `
        <li class="email-preview">
            <div class="first-row flex">
        <h4>{{email.from}}</h4>
        <h6>{{sentAt}}</h6>
        </div>
        <h5>{{email.subject}}</h5>
        <h5>{{email.body.slice(0,90)}}<span v-if="email.body.length > 90"> ...</span></h5>
        </li>
        `, 
    computed: {
        sentAt() {
            return moment(this.email.sentAt, 'MMMM Do YYYY, hh:mm:ss').startOf('day').fromNow();
        }
    }
};