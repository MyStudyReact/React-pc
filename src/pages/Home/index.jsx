import './index.scss'
import '@/assets/js/echarts.min'

/**
 * 思路：
 * 1.看官方文档 把echarts加入项目
 *   - 如何在ref中获取dom --> useRef
 *   - 在什么地方获取dom 节点 --> useEffect
 * 2.不抽离定制化参数 先把最小化的demo跑起来
 * 3.再按照需求，哪些需求需要自定义，再抽象出来
 */

import { useEffect, useRef } from 'react'

const Home = () => {
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
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
  }

  return (
    <div>
      {/* 准备一个挂载节点 */}
      <div ref={domRef} style={{ width: '500px', height: '400px' }}></div>
    </div>
  )
}

export default Home