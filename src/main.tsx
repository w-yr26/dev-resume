import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router/index.tsx'
import '@/pages/Design/command/index.ts'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}></RouterProvider>
)
