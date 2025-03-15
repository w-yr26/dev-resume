import Award from './Award'
import BaseInfo from './BaseInfo'
import EduBg from './EduBg'
import Heart from './Heart'
import ProjectExperience from './ProjectExperience'
import Skill from './Skill'
import WorkExperience from './WorkExperience'
const Materials = () => {
  return (
    <div className="min-w-1/4 w-2/5 h-full px-4 bg-[#fff] overflow-y-scroll custom-scrollbar">
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
