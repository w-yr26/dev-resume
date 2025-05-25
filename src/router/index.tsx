import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from '../App'
import Layout from '@/pages/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dev from '@/pages/Dev'
import Register from '@/pages/Register'
import ThirdPart from '@/pages/ThirdPart'
import Design from '@/pages/Design'
import Setting from '@/pages/Setting'
import Templates from '@/pages/Templates'

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route path="/setting" element={<Setting />}></Route>
      <Route path="/templates" element={<Templates />}></Route>
    </Route>
    <Route path="/dev/:randomId" element={<Dev />}></Route>
    <Route path="login" element={<Login />}></Route>
    <Route path="register" element={<Register />}></Route>
    <Route path="/third/login" element={<ThirdPart />}></Route>
    <Route path="/design/:temId" element={<Design />}></Route>
  </Route>
)

const router = createBrowserRouter(routes)

export default router
