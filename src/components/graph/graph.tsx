import {
  Axis,
  Grid,
  LineSeries,
  XYChart,
} from '@visx/xychart';

type GraphProps = {
  width: number;
  height: number;
}

const data1 = [
  { x: '2020-01-01', y: 50 },
  { x: '2020-01-02', y: 10 },
  { x: '2020-01-03', y: 20 },
];

const data2 = [
  { x: '2020-01-01', y: 30 },
  { x: '2020-01-02', y: 40 },
  { x: '2020-01-03', y: 80 },
];

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};


const Graph = ({ width, height }: GraphProps) => (
  <XYChart width={width} height={height} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
    <Axis orientation="left" numTicks={10} />
    <Axis orientation="bottom" numTicks={10} />
    <Grid columns={false} numTicks={10} />
    <LineSeries dataKey="Line 1" data={data1} {...accessors} />
    <LineSeries dataKey="Line 2" data={data2} {...accessors} />
  </XYChart>
);

export default Graph;
