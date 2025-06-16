import Icon from '@ant-design/icons'
import redoSVG from '@/assets/svg/design/redo.svg?react'
import undoSVG from '@/assets/svg/design/undo.svg?react'
import codeSVG from '@/assets/svg/dev/code.svg?react'
import resumeSVG from '@/assets/svg/resume.svg?react'
import SettingSVG from '@/assets/svg/setting.svg?react'
import HeartSVG from '@/assets/svg/dev/heart.svg?react'
import styles from './index.module.scss'
import { Button, Input, message, notification, Tooltip } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { commandManager } from '../../command/commandManager'
import { useDesignStore, useUserStore } from '@/store'
import {
  postSaveTemplateAPI,
  putDiyTemplatesNameAPI,
  putUpdateDiyTemplatesAPI,
} from '@/apis/template'
import { useEffect, useState } from 'react'

const NavBar = ({
  temId,
  updateTime,
  setIsOpened,
  generateShot,
}: {
  temId: string
  updateTime: string
  setIsOpened: (val: boolean) => void
  generateShot: (fileName: string) => Promise<any>
}) => {
  const userId = useUserStore((state) => state.info.id)
  const currentUISchema = useDesignStore((state) => state.currentUISchema)
  const templateName = useDesignStore((state) => state.templateName)
  const [isInputShow, setIsInputShow] = useState(false)
  const [title, setTitle] = useState(templateName)
  useEffect(() => {
    setTitle(templateName)
  }, [templateName])

  const handleBlue = async () => {
    if (title === templateName) return setIsInputShow(false)
    await putDiyTemplatesNameAPI({
      id: temId,
      newName: title,
    })
    notification.success({
      message: '重命名成功',
      duration: 1.5,
    })
    setIsInputShow(false)
  }

  const handleTemplate = async () => {
    try {
      const fileName = templateName + '.jpeg'
      const imgUrl = await generateShot(fileName)
      if (temId) {
        // 模板更新
        await putUpdateDiyTemplatesAPI({
          id: Number(temId),
          name: templateName,
          styleConfig: JSON.stringify(currentUISchema),
          userId: Number(userId),
          fastPhoto: imgUrl,
        })
      } else {
        // 模板创建
        await postSaveTemplateAPI({
          userId: Number(userId),
          name: '模板' + uuidv4().slice(-4),
          styleConfig: JSON.stringify(currentUISchema),
          fastPhoto: imgUrl,
          isDefault: false,
        })
      }

      // 更新sw
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'INVALIDATE_TEMPLATE_CACHE',
          userId: userId, // 传递当前用户ID
        })
      }

      message.success(`模板${temId ? '更新' : '创建'}成功`)
    } catch (err) {
      if (typeof err === 'string') message.error(err)
      else message.error(`模板${temId ? '更新' : '保存'}失败`)
    }
  }

  return (
    <nav className={styles['design-nav']}>
      <div className={styles['nav-left']}>
        <div className={styles['module-title']}>
          <Icon component={SettingSVG} />
          <span className={styles['label']}>模板设计器</span>
        </div>
        <div className={styles['template-title']}>
          {isInputShow ? (
            <Input
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleBlue}
            />
          ) : (
            <span className={styles['label']}>{title}</span>
          )}
          {title ? (
            <Icon
              className={styles['icon']}
              component={HeartSVG}
              onClick={() => setIsInputShow(true)}
            />
          ) : null}
        </div>
        <div className={styles['update-time']}>
          {updateTime ? `最后更新于${updateTime}` : null}
        </div>
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
          onClick={handleTemplate}
        >
          {temId ? '更新' : '保存'}
        </Button>
      </div>
    </nav>
  )
}

export default NavBar
