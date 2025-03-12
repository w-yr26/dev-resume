import { Outlet } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle'
const Layout = () => {
  return (
    <div className="m-2">
      <ThemeToggle></ThemeToggle>
      <p className="text-[red] dark:text-[green]">this is Layout</p>
      {/* <button className='p-4'></button> */}
      <Outlet></Outlet>
    </div>
  )
}

export default Layout
