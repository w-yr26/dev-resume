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

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
    </Route>
    <Route path="/dev/:id" element={<Dev />}></Route>
    <Route path="login" element={<Login />}></Route>
    <Route path="register" element={<Register />}></Route>
  </Route>
)

const router = createBrowserRouter(routes)

export default router
