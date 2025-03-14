import BaseInfo from './BaseInfo'
import EduBg from './EduBg'
import WorkExperience from './WorkExperience'
const Materials = () => {
  return (
    <div className="min-w-1/4 w-1/2 h-full px-4 bg-[#f8f8f9] border-r-1 border-r-[#e4e4e7] overflow-y-scroll">
      <BaseInfo></BaseInfo>
      <EduBg></EduBg>
      <WorkExperience></WorkExperience>
    </div>
  )
}

export default Materials
