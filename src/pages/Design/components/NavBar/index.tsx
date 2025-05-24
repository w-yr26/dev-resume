import Icon from '@ant-design/icons'
import redoSVG from '@/assets/svg/design/redo.svg?react'
import undoSVG from '@/assets/svg/design/undo.svg?react'
import codeSVG from '@/assets/svg/dev/code.svg?react'
import resumeSVG from '@/assets/svg/resume.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import styles from './index.module.scss'
import { Button, message, Tooltip } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { commandManager } from '../../command/commandManager'
import { useDesignStore, useUserStore } from '@/store'
import { postSaveTemplateAPI } from '@/apis/template'

const NavBar = ({
  setIsOpened,
  generateShot,
}: {
  setIsOpened: (val: boolean) => void
  generateShot: (fileName: string) => Promise<any>
}) => {
  const userId = useUserStore((state) => state.info.id)
  const currentUISchema = useDesignStore((state) => state.currentUISchema)
  const handleSaveTem = async () => {
    const fileName = '模板' + uuidv4().slice(-4) + '.jpeg'
    try {
      const imgUrl = await generateShot(fileName)
      await postSaveTemplateAPI({
        userId: Number(userId),
        name: '模板' + uuidv4().slice(-4),
        styleConfig: JSON.stringify(currentUISchema),
        fastPhoto: imgUrl,
      })
    } catch (err) {
      if (typeof err === 'string') message.error(err)
      else message.error('模板保存失败')
    }
  }

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
        <Button
          type="primary"
          icon={<Icon component={resumeSVG} />}
          onClick={handleSaveTem}
        >
          保存
        </Button>
      </div>
    </nav>
  )
}

export default NavBar
