import { forwardRef, memo } from 'react'
import Award from './Award'
import BaseInfo from './BaseInfo'
import EduBg from './EduBg'
// import Heart from './Heart'
import ProjectExperience from './ProjectExperience'
import Skill from './Skill'
import WorkExperience from './WorkExperience'
import styles from './index.module.scss'
const Materials = forwardRef<
  HTMLDivElement,
  {
    isLeftUnExpand: boolean
  }
>(({ isLeftUnExpand }, ref) => {
  return (
    <div
      className={`${styles['materials-contaienr']} ${
        isLeftUnExpand && styles['active-translate']
      }`}
      ref={ref}
    >
      <BaseInfo />
      <EduBg />
      <WorkExperience />
      <ProjectExperience />
      <Award />
      <Skill />
      {/* <Heart /> */}
    </div>
  )
})

Materials.displayName = 'Materials'
export default memo(Materials)
