import './index.scss'

import Bar from '@/components/Bar'

function Home() {

  return (
    <div>
      {/* 渲染Bar组件 */}
      <Bar
        title='主流框架使用满意度'
        xData={['react', 'vue', 'angular']}
        yData={[30, 40, 50]}
        style={{width: '500px', height: '400px'}} />
      <Bar
        title='主流框架使用满意度2'
        xData={['react', 'vue', 'angular', 'jquery']}
        yData={[60,70,80, 90]}
        style={{width: '300px', height: '200px'}} />
    </div>
  )
}

export default Home