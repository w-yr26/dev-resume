import Award from './Award'
import BaseInfo from './BaseInfo'
import EduBg from './EduBg'
import Heart from './Heart'
import ProjectExperience from './ProjectExperience'
import Skill from './Skill'
import WorkExperience from './WorkExperience'
import styles from './index.module.scss'
const Materials = () => {
  return (
    <div className={styles['materials-contaienr']}>
      <BaseInfo></BaseInfo>
      <EduBg></EduBg>
      <WorkExperience></WorkExperience>
      <ProjectExperience></ProjectExperience>
      <Award></Award>
      <Skill></Skill>
      <Heart></Heart>
    </div>
  )
}

export default Materials
