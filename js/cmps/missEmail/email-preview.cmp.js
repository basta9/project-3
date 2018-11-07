



export default {
    props: ['email'],
    template: `
        <li class="email-preview">
        <router-link :to="emailDetailsLink">
        <h4>{{email.from}}</h4>
        <h6>{{sentAt}}</h6>
        <h5>{{email.subject}}</h5>
        <h5>{{email.body.slice(0,50)}}</h5>
        </router-link>
        </li>
        `, 
    computed: {
        emailDetailsLink() {
            return `/emailApp/${this.email.id}`;
        },
        sentAt() {
            return moment(this.email.sentAt, 'MMMM Do YYYY, hh:mm:ss').startOf('day').fromNow();
        }
    }
};