import {
  Axis,
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

const axisWidthY = 40;
const axisHeightX = 120;

const verticalTopSpacing = 8; // prevent top number getting cut off
const horizontalRightSpacing = 8; // prevent right number getting cut off
const horizontalSpacingLabel = 20; // space between label and y-axis

const margin: Margin = {
  top: verticalTopSpacing,
  right: horizontalRightSpacing,
  bottom: axisHeightX,
  left: axisWidthY + horizontalSpacingLabel,
};

const Graph = ({ width, height, labelXAxis, labelYAxis }: GraphProps) => {
  const labelYWidth = 71;
  const labelXWidth = getStringWidth(labelXAxis) ?? 0;

  console.log(labelYAxis, labelYWidth)

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  return (
    <XYChart
      margin={margin}
      width={innerWidth}
      height={innerHeight}
      xScale={{
        type: "linear",
        // prettier-ignore
        range: [0, innerWidth - axisWidthY - labelYWidth - horizontalSpacingLabel - horizontalRightSpacing,
        ],
        domain: [smallestDataEntry.x, largestDataEntry.x],
      }}
      yScale={{
        type: "linear",
        // prettier-ignore
        range: [0, innerHeight - axisHeightX - verticalTopSpacing],
        domain: [largestDataEntry.y, smallestDataEntry.y],
      }}
      theme={theme}
      accessibilityLabel="Graph"
    >
      <Group top={0} left={margin.left + horizontalSpacingLabel + 12}>
        <Axis
          orientation="left"
          numTicks={data.length}
          top={verticalTopSpacing}
          tickLabelProps={{
            fill: "white",
            fontSize: 16,
            dx: -8,
            textAnchor: "end",
            verticalAnchor: "end",
          }}
          left={axisWidthY}
          stroke="white"
          strokeWidth={6}
        />
        <Text
          width={50}
          fontSize={40}
          x={-labelYWidth - horizontalSpacingLabel}
          y={"16%"}
          fill="white"
          fontWeight={300}
          verticalAnchor="start"
          fontVariant="all-small-caps"
        >
          {labelYAxis}
        </Text>

        <Axis
          orientation="bottom"
          numTicks={data.length}
          left={axisWidthY}
          top={innerHeight - axisHeightX}
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
        <Text
          fontSize={40}
          x={innerWidth - (innerWidth * 2) / 3}
          y={innerHeight - verticalTopSpacing}
          width={labelXWidth}
          fill="white"
          fontWeight={300}
          textAnchor="start"
          verticalAnchor="end"
          fontVariant="all-small-caps"
          lineHeight="38"
        >
          {labelXAxis}
        </Text>
      </Group>

      <Group top={0} left={margin.left + axisWidthY + horizontalSpacingLabel + 18}>
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
    </XYChart >
  );
};

export default Graph;
