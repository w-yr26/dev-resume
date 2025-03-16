import LeftMenu from './components/LeftMenu'
import RightMenu from './components/RightMenu'
import Materials from './components/Materials'
import { useAppDispatch, useAppSelector } from '@/hooks'
import { addNum } from '@/store/slices/devSlice'
import { Button } from 'antd'
const Dev = () => {
  const count = useAppSelector((state) => state.dev.num)
  const dispatch = useAppDispatch()

  return (
    <div className="h-screen flex justify-between">
      <LeftMenu />
      <main className="main-container flex-1 bg-[#fafafa] flex">
        <Materials></Materials>
        <div className="flex-1 preview-container relative w-full h-full">
          <div className="resume-container absolute w-[476px] h-[673px] top-0 bottom-0 left-0 right-0 m-auto border-1 border-[red]">
            {count}
            <Button onClick={() => dispatch(addNum(10))}>click</Button>
          </div>
        </div>
      </main>
      <RightMenu></RightMenu>
    </div>
  )
}

export default Dev
