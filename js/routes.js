
import appSus from './pages/app-sus.cmp.js';
import emailApp from './cmps/missEmail/email-app.cmp.js';
import keepApp from './cmps/missKeep/keep-app.cmp.js';
import emailId from './cmps/missEmail/email-details.cmp.js';


var myRoutes = [
    {path: '/', component: appSus },
    {path: '/emailApp', component: emailApp },
    {path: '/keepApp', component: keepApp },
    {path: '/emailApp/:emailId', component: emailId }
    
]


export default myRoutes;