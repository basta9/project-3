

import emailBox from './email-box.cmp.js';


export default {
    template: `
        <section class="email-app">
            <h1>Email App</h1>
            <email-box :type="type.inbox"></email-box>
            <email-box :type="type.sent"></email-box>
            <email-box :type="type.draft"></email-box>
        </section>
    `,
    data() {
        return {
            type: {
              inbox: 'inbox',
              sent: 'sent',
              draft: 'draft'
            }
        }
    },
    components: {
      emailBox
    }
}