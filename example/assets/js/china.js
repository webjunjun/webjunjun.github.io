const randomColor = function (len) {
  let random = null;
  const colorArr = [];
  for (let m = 0; m < len; m++) {
    random = '#';
    for (let i = 0; i < 6; i++) {
      random += parseInt(Math.random() * 15).toString(16);
    }
    colorArr.push(random);
  }
  return colorArr;
}
// 设置路径规则 墨卡托投影 缩放750倍 中心点是(东经101度, 北纬42度)
const projection = d3.geoMercator().scale(600).center([119, 38]);
// 创建地理路径生成器
const path = d3.geoPath(projection);
// 创建挂载的svg节点
const chart = d3.select('#app').append('svg').attr('class', 'map-svg').attr('width', 660).attr('height', 500);
const map = chart.append('g');// 将挂载的地图放置在一个容器里
let colors = randomColor(35);
const mapColor = {};
// 获取geojson格式数据绘制形状
d3.json('/example/assets/json/china.json').then(data => {
  map.selectAll('path')
      .data(data.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('stroke', function (d, i) {
        if (d.properties.name === '南海诸岛') {
          return 'none';
        }
        return 'rgba(255, 255, 255, .5)';
      })
      .attr('fill', function (d, i) {
        mapColor[d.properties.name] = colors[i];
        return colors[i];
      })
      .on('mouseover', function(d, i) {
        d3.select(this).attr('fill', 'yellow');
      })
      .on('mouseout', function(d, i) {
        d3.select(this).attr('fill', mapColor[i.properties.name])
      });
  
  // 设置标题
  chart.append('g')
        .append('text')
        .attr('fill', '#333')
        .attr('font-size', '16px')
        .attr('font-weight', '700')
        .attr('text-anchor', 'middle')
        .attr('x', 330)
        .attr('y', 20)
        .text('中国地图')
})