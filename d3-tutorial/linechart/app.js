const data = [
  { value: 3, time: new Date('2019-03-22T03:00:00') },
  { value: 1, time: new Date('2019-03-22T03:05:00') },
  { value: 9, time: new Date('2019-03-22T03:10:00') },
  { value: 6, time: new Date('2019-03-22T03:15:00') },
  { value: 2, time: new Date('2019-03-22T03:20:00') },
  { value: 6, time: new Date('2019-03-22T03:25:00') },
];

const margin = {
  top: 20,
  right: 20,
  bottom: 100,
  left: 100,
};
const graphWidth = 500 - margin.left - margin.right;
const graphHeight = 500 - margin.top - margin.bottom;

const minT = d3.min(data, d => d.time);
const maxT = d3.max(data, d => d.time);
const minV = d3.min(data, d => d.value);
const maxV = d3.max(data, d => d.value);

const svg = d3
  .select('#canvas')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);

const graph = svg
  .append('g')
  .attr('width', graphWidth)
  .attr('height', graphHeight)
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

const xAxisGroup = graph
  .append('g')
  .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

const xScale = d3.scaleTime().domain([minT, maxT]).range([0, graphWidth]);
const yScale = d3.scaleLinear().domain([minV, maxV]).range([graphHeight, 0]);

const xAxis = d3.axisBottom(xScale).tickSize(10);
const yAxis = d3.axisLeft(yScale).tickSize(10);

xAxisGroup.call(xAxis);
yAxisGroup.call(yAxis);
// <-- 축 생성 end -->

graph
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
  .attr('r', 5)
  .attr('cx', d => xScale(d.time))
  .attr('cy', d => yScale(d.value))
  .attr('fill', 'black');
// <-- 점 생성 end -->

const linearGenerator = d3
  .line()
  .x(d => xScale(d.time))
  .y(d => yScale(d.value));

graph
  .append('path')
  .attr('d', linearGenerator(data))
  .attr('fill', 'none')
  .attr('stroke-width', 2)
  .attr('stroke', 'black');
// <-- 선 생성 end -->

graph
  .selectAll('circle')
  .on('mouseover', function () {
    d3.select(this)
      .transition()
      .duration(100)
      .attr('r', 12)
      .attr('fill', 'grey');
  })
  .on('mouseleave', function () {
    d3.select(this)
      .transition()
      .duration(100)
      .attr('r', 5)
      .attr('fill', 'black');
  });
