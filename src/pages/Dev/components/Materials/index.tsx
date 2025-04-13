import { forwardRef } from 'react'
import Award from './Award'
import BaseInfo from './BaseInfo'
import EduBg from './EduBg'
import Heart from './Heart'
import ProjectExperience from './ProjectExperience'
import Skill from './Skill'
import WorkExperience from './WorkExperience'
import styles from './index.module.scss'
const Materials = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div className={styles['materials-contaienr']} ref={ref}>
      <BaseInfo />
      <EduBg />
      <WorkExperience />
      <ProjectExperience />
      <Award />
      <Skill />
      <Heart />
    </div>
  )
})

export default Materials
