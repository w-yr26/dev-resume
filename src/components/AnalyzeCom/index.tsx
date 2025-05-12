import { Profiler } from 'react'

const TimeAnalyze = ({ children }: { children: React.ReactNode }) => {
  const onRender = (id: string, phase: any, actualTime: any, baseTime: any) => {
    console.log(`${id} 渲染耗时:`, {
      phase, // "mount" 或 "update"
      actualTime, // 本次渲染耗时（ms）
      baseTime, // 无优化情况下预计耗时
    })
  }

  return (
    <Profiler id="ExpensiveComponent" onRender={onRender}>
      {children}
    </Profiler>
  )
}

export default TimeAnalyze
