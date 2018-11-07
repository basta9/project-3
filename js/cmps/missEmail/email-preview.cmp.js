



export default {
    props: ['email'],
    template: `
        <li class="email-preview">
        <router-link :to="emailDetailsLink">
        <h2>{{email}}</h2>
        </router-link>
        </li>
        `, 
    computed: {
        emailDetailsLink() {
            return `/emailApp/${this.email.id}`;
        }
    }
};