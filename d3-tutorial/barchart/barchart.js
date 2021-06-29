const data = [
  {
    name: 'veg soup',
    orders: 200,
  },
  {
    name: 'veg curry',
    orders: 600,
  },
  {
    name: 'veg pasta',
    orders: 300,
  },
  {
    name: 'veg surprise',
    orders: 900,
  },
  {
    name: 'veg burger',
    orders: 1500,
  },
];

const svg = d3
  .select('.canvas')
  .append('svg')
  .attr('width', 600)
  .attr('height', 600);

// 차트에 여백 만들기
const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100,
};
const graphWidth = 600 - margin.left - margin.right;
const graphHeight = 600 - margin.top - margin.bottom;

const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`); // x축 아래로 translate

const yAxisGroup = graph.append('g');

const y = d3
  .scaleLinear()
  .domain([0, d3.max(data, d => d.orders)]) // (내가 이해하기로는) 기준이 되는 가장 큰 막대
  .range([graphHeight, 0]);

const x = d3
  .scaleBand()
  .domain(data.map(item => item.name)) // data 각각의 이름 설정, map으로 배열 반환
  .range([0, 500])
  .paddingInner(0.2) // 0.2 padding
  .paddingOuter(0.2);

const min = d3.min(data, d => d.orders); // 가장 작은 수 반환
const max = d3.max(data, d => d.orders); // 가장 큰 수 반환
const extent = d3.extent(data, d => d.orders); // [min, max] 반환

const rects = graph.selectAll('rect').data(data);
rects
  .attr('width', x.bandwidth)
  .attr('height', d => graphHeight - y(d.orders)) // data의 orders 값 적용, 기준이 되는 막대에 비한 비율
  .attr('fill', 'orange')
  .attr('x', d => x(d.name)) // data index 값 * 70
  .attr('y', d => y(d.orders));

console.log(rects);

// 반환되지 못한 나머지 data 가상 DOM으로 생성 (원래 텅비어있는데 왜 두번해주는건지 모르겠음)
rects
  .enter()
  .append('rect')
  .attr('width', x.bandwidth)
  .attr('height', d => graphHeight - y(d.orders))
  .attr('fill', 'orange')
  .attr('x', d => x(d.name))
  .attr('y', d => y(d.orders)); // 위에 있는 그래프 뒤집기 (?)

// x축 y축 (axis) 생성
const xAxis = d3.axisBottom(x);
const yAxis = d3
  .axisLeft(y)
  .ticks(3) //ticks 는 y축 눈금 갯수
  .tickFormat(d => d + ' orders'); // 눈금 값 설정

// 축 적용
xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);

xAxisGroup
  .selectAll('text') // x축 눈금 값. text 선택
  .attr('transform', 'rotate(-40)')
  .attr('text-anchor', 'end')
  .attr('fill', 'orange');
