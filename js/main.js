import appSus from './pages/app-sus.cmp.js';
import myRoutes from './routes.js';
import navBar from './pages/nav-bar.cmp.js';
// import userMsg from './cmps/user-msg.cmp.js';
// import eventBus from './event-bus.js';


Vue.use(VueRouter);
const myRouter = new VueRouter({routes: myRoutes})


new Vue({
    el: '#app',
    router: myRouter,
    components: {
        appSus,
        navBar
    }
})
