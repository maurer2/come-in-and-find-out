import {
  Axis,
  Grid,
  LineSeries,
  XYChart,
} from '@visx/xychart';
// import { scaleLinear } from '@visx/scale';

type GraphProps = {
  width: number;
  height: number;
}

const data =
  [...Array(1000).keys()].map((value) => ({ x: value, y: value }))

const accessors = {
  xAccessor: (d) => d.x,
  yAccessor: (d) => d.y,
};

const Graph = ({ width, height }: GraphProps) => (
  <XYChart width={width} height={height} xScale={{ type: 'linear', 'range': [0, 1000] }} yScale={{ type: 'linear', 'range': [0, 1000] }}>
    <Axis orientation="left" numTicks={12} top={0} />
    <Axis orientation="bottom" numTicks={12} />
    <Grid columns={true} numTicks={50} />
    <LineSeries dataKey="Line" data={data} {...accessors} />
  </XYChart>
);

export default Graph;
