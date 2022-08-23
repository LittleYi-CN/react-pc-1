// 封装图表bar

// 思路
// 1. 看官方文档 把echarts加入项目
//    如何在react获取dom -> useRef
//    在什么地方获取dom节点 -> useEffect
// 2. 不抽离定制化的参数 先把最小化的demo跑起来
// 3. 按照需求 哪些参数需要自定义 抽象出来

import * as echarts from 'echarts'
import { useEffect, useRef } from 'react';

function Bar({title, xData, yData, style}) {
  const domRef = useRef()
  const chartInit = () => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(domRef.current);
    // 绘制图表
    myChart.setOption({
      title: {
        text: title
      },
      tooltip: {},
      xAxis: {
        data: xData
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: yData
        }
      ]
    });
  }
  // 执行初始化的函数
  useEffect(() => {
    chartInit()
  }, [])
  return (
    <div>
      {/* 准备一个挂载节点 */}
      <div ref={domRef} style={style}></div>
    </div>
  )
}

export default Bar