import './index.scss'

/**
 * 思路：
 * 1.看官方文档 把echarts加入项目
 *   - 如何在ref中获取dom --> useRef
 *   - 在什么地方获取dom 节点 --> useEffect
 * 2.不抽离定制化参数 先把最小化的demo跑起来
 * 3.再按照需求，哪些需求需要自定义，再抽象出来
 */
import Bar from '@/components/Bar'

const Home = () => {
  return (
    <div>
      {/* 渲染Bar组件 */}
      <Bar
        title='主流框架使用满意度'
        xDate={['react', 'vue', 'angular']}
        yDate={['30', '40', '50']}
        style={{ width: '500px', height: '400px' }}
      ></Bar>

      <Bar
        title='主流框架使用满意度2'
        xDate={['react', 'vue', 'angular']}
        yDate={['60', '70', '80']}
        style={{ width: '300px', height: '200px' }}
      ></Bar>
    </div>
  )
}

export default Home