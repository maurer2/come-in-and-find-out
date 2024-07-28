import {
  Axis,
  Grid,
  LineSeries,
  XYChart,
  buildChartTheme,
  type Margin,
  type XYChartTheme,
} from "@visx/xychart";
import { scaleLinear } from "@visx/scale";

type GraphProps = {
  width: number;
  height: number;
};

const data = [...Array(12).keys()].map((value) => ({ x: value, y: value }));
const smallestDataEntry = data[0];
const largestDataEntry = data.at(-1);

const theme: XYChartTheme = buildChartTheme({
  backgroundColor: "black",
  colors: ["red"],
  tickLength: 15,
  gridColor: "white",
  gridColorDark: "black",
});

const margin: Margin = {
  top: 0,
  right: 0,
  bottom: 100,
  left: 150,
};

const Graph = ({ width, height }: GraphProps) => (
  <XYChart
    margin={margin}
    width={width + margin.left + margin.right}
    height={height + margin.top + margin.bottom}
    xScale={{
      type: "linear",
      range: [0, width],
      domain: [smallestDataEntry.x, largestDataEntry?.x ?? 0],
    }}
    yScale={{
      type: "linear",
      range: [0, height],
      domain: [largestDataEntry?.y ?? 0, smallestDataEntry.y],
    }}
    theme={theme}
  >
    <Axis
      orientation="left"
      numTicks={12}
      top={-100}
      left={50}
      stroke="white"
      tickLabelProps={{
        fill: "white",
        fontSize: 12,
      }}
    />

    <Axis
      orientation="bottom"
      numTicks={12}
      stroke="white"
      top={500}
      left={50}
      tickLabelProps={{
        fill: "white",
        fontSize: 12,
      }}
    />

    {/* <Grid columns={true} numTicks={12} /> */}

    <LineSeries
      dataKey="line"
      data={data}
      xAccessor={(d) =>
        scaleLinear({
          range: [0, 12],
        })(d.x)
      }
      yAccessor={(d) =>
        scaleLinear({
          range: [0, 12],
        })(d.y)
      }
      stroke="red"
    />
  </XYChart>
);

export default Graph;
