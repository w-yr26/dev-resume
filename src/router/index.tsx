import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Loading from '@/pages/Loading'
import App from '../App'
import Layout from '@/pages/Layout'
import Home from '../pages/Home'
// import Setting from '@/pages/Setting'
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const ThirdPart = lazy(() => import('@/pages/ThirdPart'))
const Dev = lazy(() => import('@/pages/Dev'))
const Templates = lazy(() => import('@/pages/Templates'))
const Design = lazy(() => import('@/pages/Design'))

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
      <Route
        path="/templates"
        element={
          <Suspense fallback={<Loading />}>
            <Templates />
          </Suspense>
        }
      />
    </Route>
    <Route
      path="/dev/:randomId"
      element={
        <Suspense fallback={<Loading />}>
          <Dev />
        </Suspense>
      }
    ></Route>
    <Route
      path="/share/:randomId"
      element={
        <Suspense fallback={<Loading />}>
          <Dev />
        </Suspense>
      }
    ></Route>
    <Route
      path="login"
      element={
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      }
    ></Route>
    <Route
      path="register"
      element={
        <Suspense fallback={<Loading />}>
          <Register />
        </Suspense>
      }
    ></Route>
    <Route
      path="/third/login"
      element={
        <Suspense fallback={<Loading />}>
          <ThirdPart />
        </Suspense>
      }
    ></Route>
    <Route
      path="/design"
      element={
        <Suspense fallback={<Loading />}>
          <Design />
        </Suspense>
      }
    ></Route>
  </Route>
)

const router = createBrowserRouter(routes)

export default router
