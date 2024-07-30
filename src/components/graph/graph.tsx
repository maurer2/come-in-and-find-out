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
import { Text, getStringWidth } from "@visx/text";

type GraphProps = {
  width: number;
  height: number;
  labelXAxis: string;
  labelYAxis: string;
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
const verticalBottomSpacing = 20; // space between custom label and x-axis
const horizontalRightSpacing = 8; // prevent right number getting cut off
const horizontalLeftSpacing = 20; // space between custom label and y-axis

const Graph = ({ width, height, labelXAxis, labelYAxis }: GraphProps) => {
  const labelYWidth = getStringWidth(labelYAxis) ?? 0;
  const labelXWidth = getStringWidth(labelXAxis) ?? 0;

  const innerWidth = width + -margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return (
    <XYChart
      margin={margin}
      width={innerWidth}
      height={innerHeight}
      xScale={{
        type: "linear",
        // prettier-ignore
        range: [0, innerWidth - axisSizes - horizontalRightSpacing - labelYWidth - horizontalLeftSpacing,
        ],
        domain: [smallestDataEntry.x, largestDataEntry.x],
      }}
      yScale={{
        type: "linear",
        // prettier-ignore
        range: [0, innerHeight - axisSizes - verticalTopSpacing],
        domain: [largestDataEntry.y, smallestDataEntry.y],
      }}
      theme={theme}
    >
      <Group top={axisSizes} left={labelYWidth + horizontalLeftSpacing}>
        <Group>
          <Text
            width={labelYWidth}
            fontSize={40}
            x={-labelYWidth - horizontalLeftSpacing}
            y={"16%"}
            fill="white"
            fontWeight={300}
            verticalAnchor="start"
            fontVariant="all-small-caps"
          >
            {labelYAxis}
          </Text>
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
          />
        </Group>
        <Group>
          <Text
            fontSize={40}
            x={(innerWidth - axisSizes) / 2 - axisSizes - labelXWidth / 2}
            width={labelXWidth}
            y={innerHeight - axisSizes - axisSizes + verticalBottomSpacing - 50}
            fill="white"
            fontWeight={300}
            textAnchor="start"
            fontVariant="all-small-caps"
          >
            {labelXAxis}
          </Text>
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
          />
        </Group>
        <Grid
          columns={true}
          numTicks={11}
          left={axisSizes}
          top={-axisSizes + verticalTopSpacing}
        />
      </Group>
      <Group
        top={verticalTopSpacing}
        left={axisSizes + labelYWidth + horizontalLeftSpacing}
      >
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
