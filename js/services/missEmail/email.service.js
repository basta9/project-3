import { storageService } from '../storage.service.js';
import { utilService } from '../util.service.js';


const EMAILS_KEY = 'emails';


function query(type ,filter = null) {
    return storageService.load(EMAILS_KEY)
        .then(emails => {
            if (!emails) {
                emails = createEmails();
                storageService.store(EMAILS_KEY, emails)
            } if (filter === null) return emails.filter(email => email.type === type);
            else return emails.filter(email => email.type === type)
                .filter(email => email.subject.toUpperCase().includes(filter.bySubject.toUpperCase()))
        });
}

export const emailService = {
    query,
    getEmailById,
    createEmail,
    deleteEmail
}

function createEmails() {
    return [
        {
            id: utilService.makeId(),
            type: 'inbox',
            subject: 'Hey',
            body: `What's up?`,
            isRead: false,
            sentAt: moment().format('MMMM Do YYYY, hh:mm:ss')
        }, {
            id: utilService.makeId(),
            type: 'draft',
            subject: '???',
            body: 'BO',
            isRead: true,
            sentAt: 'November 1st 2018, 08:23:32'
        }, {
            id: utilService.makeId(),
            type: 'inbox',
            subject: 'Lorem ipsum',
            body: `Lorem ipsum dolor sit amet, mea at summo scribentur, 
            illud velit interpretaris ne vix. 
            Duo suas blandit accusata at, liber saperet appareat ius ne, 
            eu vel tale ocurreret. Eam ei fuisset indoctum suavitate. 
            Et sed idque soluta.`,
            isRead: false,
            sentAt: moment().format('MMMM Do YYYY, hh:mm:ss')
        }, {
            id: utilService.makeId(),
            type: 'sent',
            subject: 'Brute instructior',
            body: `In usu brute instructior, mei te ocurreret theophrastus. 
            Vim aperiam suavitate id, vim mandamus iracundia id. 
            Vel quod nostrud cu. 
            Dicunt adipiscing instructior at vis, ad minim essent fabellas his. 
            Has te lorem efficiendi definitionem.

            Eu probo soleat praesent sit, inimicus iudicabit ocurreret his id. 
            Ius et vide sententiae. Ne duo habeo argumentum, nec an esse animal nusquam, 
            nostro instructior contentiones no duo. Pri eu vitae doctus mnesarchum.`,
            isRead: true,
            sentAt: 'November 5th 2018, 10:05:08'
        }
    ]
}


function createEmail(newEmail) {
    return storageService.load(EMAILS_KEY)
        .then( emails => {
            if (email.id) {
                var emailIdx = emails.findIndex(currEmail => currEmail.id === newEmail.id)
                emails.splice(emailIdx, 1, newEmail);
            } else {
                email.id = utilService.makeId();
                emails.push(newEmail);
            }
            return storageService.store(EMAILS_KEY, emails);
        });
}

function getEmailById(emailId) {
    return storageService.load(EMAILS_KEY)
    .then(emails => {
        try {
        return emails.find( email => email.id === emailId);
        } catch (error) {
            console.log('COOL')
        }
    });
}


function deleteEmail(emailId) {
    return storageService.load(EMAILS_KEY)
    .then(emails => {
        var emailIdx = emails.findIndex( email => email.id === emailId);
        emails.splice(emailId, 1);
        return storageService.store(EMAILS_KEY, emails);
    });
}


