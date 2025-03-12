import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'
import App from '../App'
import Layout from '@/pages/Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         // path: 'home',
//         index: true,
//         element: <Home />,
//         // loader:
//       },
//     ],
//   },
// ])

const routes = createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />}></Route>
    </Route>
    <Route path="login" element={<Login />}></Route>
  </Route>
)

const router = createBrowserRouter(routes)

export default router
