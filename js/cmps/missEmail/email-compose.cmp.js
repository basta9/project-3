

export default {
    props: ['email'],
    template: `
        <section class="email-compose flex">
        <label>To: <input type="email" @input="" />
        </label>
        <label>Cc: <input type="email" @input="" />
        </label>
        <label> Subject: <input type="text" @input="" />
        </label>
        <label> From: <input type="email" @input="" />
        </label>
        <input type="textbox"/>
        </section>
        `, 
    computed: {
        sentAt() {
            return moment(this.email.sentAt, 'MMMM Do YYYY, hh:mm:ss').startOf('day').fromNow();
        }
    }
};