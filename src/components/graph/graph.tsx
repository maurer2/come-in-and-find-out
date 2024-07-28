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
import { Group } from "@visx/group";

type GraphProps = {
  width: number;
  height: number;
  labelXAxis: string;
};

const data = [...Array(11).keys()].map((value) => ({ x: value, y: value }));
const smallestDataEntry = data[0];
const largestDataEntry = data[data.length - 1];

const theme: XYChartTheme = buildChartTheme({
  backgroundColor: "black",
  colors: ["red"],
  tickLength: 15,
  gridColor: "white",
  gridColorDark: "black",
  svgLabelBig: {
    fill: "white",
  },
});

const margin: Margin = {
  top: 0,
  right: 0,
  bottom: 40,
  left: 40,
};

const axisSizes = 40;
const verticalTopSpacing = 10; // prevent top number getting cut off
const horizontalRightSpacing = 8; // prevent top number getting cut off

const Graph = ({ width, height, labelXAxis }: GraphProps) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  console.log(labelXAxis);

  return (
    <XYChart
      margin={margin}
      width={innerWidth}
      height={innerHeight}
      xScale={{
        type: "linear",
        range: [0, innerWidth - axisSizes - horizontalRightSpacing],
        domain: [smallestDataEntry.x, largestDataEntry.x],
      }}
      yScale={{
        type: "linear",
        range: [0, innerHeight - axisSizes - verticalTopSpacing],
        domain: [largestDataEntry.y, smallestDataEntry.y],
      }}
      theme={theme}
    >
      <Group top={axisSizes} left={0}>
        <Axis
          orientation="left"
          numTicks={data.length}
          top={-axisSizes + verticalTopSpacing}
          tickLabelProps={{
            fill: "white",
            fontSize: 16,
            dx: -8,
            textAnchor: "end",
            verticalAnchor: "end",
          }}
          left={axisSizes}
          stroke="white"
          strokeWidth={6}
        // label="Find out"
        // labelOffset={0}
        />
        <Axis
          orientation="bottom"
          numTicks={data.length}
          top={innerHeight - axisSizes - axisSizes}
          left={axisSizes}
          tickLabelProps={{
            fill: "white",
            fontSize: 16,
            dy: 8,
            textAnchor: "middle",
            verticalAnchor: "end",
          }}
          stroke="white"
          strokeWidth={6}
        // label={labelXAxis}
        // labelOffset={0}
        />
        <Grid
          columns={true}
          numTicks={11}
          left={axisSizes}
          top={-axisSizes + verticalTopSpacing}
        />
      </Group>
      <Group top={verticalTopSpacing} left={axisSizes}>
        <LineSeries
          dataKey="line"
          data={data}
          xAccessor={(d) =>
            scaleLinear({
              range: [smallestDataEntry.x, largestDataEntry.x],
            })(d.x)
          }
          yAccessor={(d) =>
            scaleLinear({
              range: [smallestDataEntry.y, largestDataEntry.y],
            })(d.y)
          }
          strokeWidth={6}
        />
      </Group>
    </XYChart>
  );
};

export default Graph;
