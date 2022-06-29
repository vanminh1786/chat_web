import Login from '~/pages/Login';
import Signup from '~/pages/Signup';
import Home from '~/pages/Home';

const publicRoutes = [
  { path: '/', component: Login },
  { path: '/signup', component: Signup },
  { path: '/home', component: Home },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }