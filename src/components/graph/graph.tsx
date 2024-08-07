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
import { Line } from "@visx/shape";

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
const axisHeightX = 130;

const verticalTopSpacing = 8; // prevent top number getting cut off
const horizontalRightSpacing = 8; // prevent right number getting cut off
const horizontalSpacingLabel = 20; // space between label and y-axis

const strokeWidth = 5;

const Graph = ({ width, height, labelXAxis, labelYAxis }: GraphProps) => {
  const labelYWidth = 71; // getStringWidth is slightly off
  const labelXWidth = getStringWidth(labelXAxis) ?? 0;

  const margin: Margin = {
    top: verticalTopSpacing,
    right: horizontalRightSpacing,
    bottom: axisHeightX,
    left: horizontalSpacingLabel + labelYWidth,
  };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const scaleFunction = scaleLinear<number>({
    // prettier-ignore
    range: [0, innerWidth - axisWidthY - labelYWidth - horizontalSpacingLabel - horizontalRightSpacing],
    domain: [smallestDataEntry.x, largestDataEntry.x],
  });

  return (
    <XYChart
      margin={margin}
      width={innerWidth}
      height={innerHeight}
      xScale={{
        type: "linear",
        // prettier-ignore
        range: [0, innerWidth - axisWidthY - labelYWidth - horizontalSpacingLabel - horizontalRightSpacing],
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
      <Group top={0} left={margin.left}>
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
          strokeWidth={strokeWidth}
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
          lineHeight="36"
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
          strokeWidth={strokeWidth}
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
          lineHeight="36"
        >
          {labelXAxis}
        </Text>
      </Group>

      <Group
        top={verticalTopSpacing - strokeWidth}
        left={margin.left + axisWidthY + strokeWidth}
      >
        <Line
          from={{ x: 0, y: scaleFunction(2) }}
          to={{ x: scaleFunction(8), y: scaleFunction(2) }}
          stroke={"black"}
          strokeWidth={strokeWidth}
        />
        <Line
          from={{ x: scaleFunction(8), y: scaleFunction(10) }}
          to={{ x: scaleFunction(8), y: scaleFunction(2) }}
          stroke={"black"}
          strokeWidth={strokeWidth}
        />

        <Line
          from={{ x: 0, y: scaleFunction(0) }}
          to={{ x: scaleFunction(10), y: scaleFunction(0) }}
          stroke={"black"}
          strokeWidth={strokeWidth}
        />
        <Line
          from={{ x: scaleFunction(10), y: scaleFunction(0) }}
          to={{ x: scaleFunction(10), y: scaleFunction(10) }}
          stroke={"black"}
          strokeWidth={strokeWidth}
        />

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
          strokeWidth={strokeWidth}
        />
      </Group>
    </XYChart>
  );
};

export default Graph;
