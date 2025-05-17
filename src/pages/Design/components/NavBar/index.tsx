import Icon from '@ant-design/icons'
import redoSVG from '@/assets/svg/design/redo.svg?react'
import undoSVG from '@/assets/svg/design/undo.svg?react'
import codeSVG from '@/assets/svg/dev/code.svg?react'
import resumeSVG from '@/assets/svg/resume.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import styles from './index.module.scss'
import { Button, Tooltip } from 'antd'
import { commandManager } from '../../command/commandManager'

const NavBar = ({ setIsOpened }: { setIsOpened: (val: boolean) => void }) => {
  return (
    <nav className={styles['design-nav']}>
      <div className={styles['nav-left']}>
        <Icon component={SettingSVG} />
        <span>模板设计器</span>
      </div>
      <div className={styles['nav-right']}>
        <Tooltip title="撤销">
          <Button
            variant="text"
            icon={<Icon component={undoSVG} />}
            onClick={() => commandManager.undo()}
          />
        </Tooltip>
        <Tooltip title="撤销">
          <Button
            variant="text"
            icon={<Icon component={redoSVG} />}
            onClick={() => commandManager.redo()}
          />
        </Tooltip>
        <Button
          variant="text"
          icon={<Icon component={codeSVG} />}
          onClick={() => setIsOpened(true)}
        />
        <Button type="primary" icon={<Icon component={resumeSVG} />}>
          保存
        </Button>
      </div>
    </nav>
  )
}

export default NavBar
