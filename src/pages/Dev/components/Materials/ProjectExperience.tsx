import CustomLayout from '@/components/CustomLayout'
import Header from '@/components/Header'
import { BranchesOutlined } from '@ant-design/icons'

const ProjectExperience = () => {
  return (
    <CustomLayout>
      <Header label="项目经历" icon={BranchesOutlined}></Header>
    </CustomLayout>
  )
}

export default ProjectExperience
