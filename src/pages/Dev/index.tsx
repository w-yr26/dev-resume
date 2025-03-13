import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
const Dev = () => {
  return (
    <div className="h-screen flex justify-between">
      <LeftMenu />
      <p>this is dev</p>
      <RightMenu></RightMenu>
    </div>
  )
}

export default Dev
