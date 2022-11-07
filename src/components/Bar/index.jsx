// 封装图表Bar组件
import { useEffect, useRef } from 'react'

import '@/assets/js/echarts.min'

const Bar = ({ title, xDate, yDate, style }) => {
  const domRef = useRef(null)

  // 执行初始化函数
  useEffect(() => {
    chartInit()
  }, [])

  const chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current)
    // 绘制图表
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xDate
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yDate
        }
      ]
    })
  }

  return (
    <div>
      {/* 准备一个挂载节点 */}
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Bar