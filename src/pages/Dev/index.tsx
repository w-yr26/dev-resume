import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
import Materials from './components/Materials'
const Dev = () => {
  return (
    <div className="h-screen flex justify-between">
      <LeftMenu />
      <main className="main-container flex-1 bg-[#fafafa]">
        <Materials></Materials>
      </main>
      <RightMenu></RightMenu>
    </div>
  )
}

export default Dev
