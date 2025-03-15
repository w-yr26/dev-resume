import BaseInfo from './BaseInfo'
import EduBg from './EduBg'
import ProjectExperience from './ProjectExperience'
import WorkExperience from './WorkExperience'
const Materials = () => {
  return (
    <div className="min-w-1/4 w-1/3 h-full px-4 bg-[#fff] overflow-y-scroll custom-scrollbar">
      <BaseInfo></BaseInfo>
      <EduBg></EduBg>
      <WorkExperience></WorkExperience>
      <ProjectExperience></ProjectExperience>
    </div>
  )
}

export default Materials
