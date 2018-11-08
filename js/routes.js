
import appSus from './pages/app-sus.cmp.js';
import emailApp from './cmps/missEmail/email-app.cmp.js';
import keepApp from './cmps/missKeep/keep-app.cmp.js';
// import toolBar from './cmps/missEmail/email-details.cmp.js';
import noteEdit from './cmps/missKeep/note-edit.cmp.js';


var myRoutes = [
    { path: '/', component: appSus },
    { path: '/emailApp', component: emailApp },
    { path: '/keepApp', component: keepApp },
    { path: '/keepApp/noteEdit/:noteId?', component: noteEdit },
    // { path: '/emailApp/:emailId', component: emailId }

]


export default myRoutes;