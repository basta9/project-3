
import appSus from './pages/app-sus.cmp.js';
import emailApp from '../missEmail/cmps/email-app.cmp.js';
import keepApp from '../missKeep/cmps/keep-app.cmp.js';



var myRoutes = [
    {path: '/', component: appSus },
    {path: '/emailApp', component: emailApp },
    {path: '/keepApp', component: keepApp }
]


export default myRoutes;