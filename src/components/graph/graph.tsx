import {
  Axis,
  LineSeries,
  XYChart,
  buildChartTheme,
  type Margin,
  type XYChartTheme,
} from '@visx/xychart';
import { scaleLinear } from '@visx/scale';
import { Group } from '@visx/group';
import { Text, getStringWidth } from '@visx/text';
import { Line } from '@visx/shape';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../../tailwind.config';

type GraphProps = {
  width: number;
  height: number;
  labelXAxis: string;
  labelYAxis: string;
};

const data = [...Array(11).keys()].map((value) => ({ x: value, y: value }));
const smallestDataEntry = data[0];
const largestDataEntry = data[data.length - 1];

const tailwindConfigResolved = resolveConfig(tailwindConfig);
const theme: XYChartTheme = buildChartTheme({
  backgroundColor: tailwindConfigResolved.theme.colors.slate[500], // not page background
  colors: [tailwindConfigResolved.theme.colors.red[500]],
  tickLength: 15,
  gridColor: tailwindConfigResolved.theme.colors.white,
  gridColorDark: tailwindConfigResolved.theme.colors.black,
  xAxisLineStyles: { stroke: tailwindConfigResolved.theme.colors.white },
  yAxisLineStyles: { stroke: tailwindConfigResolved.theme.colors.white },
});

const axisWidthY = 40;
const axisHeightX = 130;

const verticalTopSpacing = 8; // prevent top number getting cut off
const horizontalRightSpacing = 8; // prevent right number getting cut off
const horizontalSpacingLabel = 20; // space between label and y-axis

const strokeWidth = 6;

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

  // prettier-ignore
  const rangeX = [0, innerWidth - axisWidthY - labelYWidth - horizontalSpacingLabel - horizontalRightSpacing];
  const domainX = [smallestDataEntry.x, largestDataEntry.x];
  const rangeY = [0, innerHeight - axisHeightX - verticalTopSpacing];
  const domainY = [largestDataEntry.y, smallestDataEntry.y];

  const scaleFunctionX = scaleLinear<number>({
    range: rangeX,
    domain: domainX,
  });
  const scaleFunctionY = scaleLinear<number>({
    range: rangeY,
    domain: domainY,
  });

  return (
    <XYChart
      margin={margin}
      width={innerWidth}
      height={innerHeight}
      xScale={{
        type: 'linear',
        range: rangeX,
        domain: domainX,
      }}
      yScale={{
        type: 'linear',
        range: rangeY,
        domain: domainY,
      }}
      theme={theme}
      accessibilityLabel="Graph"
    >
      <Group top={0} left={margin.left}>
        {/* left axis with label */}
        <Group>
          <Axis
            orientation="left"
            numTicks={data.length}
            top={verticalTopSpacing}
            left={axisWidthY}
            tickLabelProps={{
              fill: 'white',
              fontSize: 16,
              dx: -8,
              textAnchor: 'end',
              verticalAnchor: 'end',
            }}
            strokeWidth={strokeWidth} // size of ticks
          />
          <Text
            width={50}
            fontSize={40}
            x={-labelYWidth - horizontalSpacingLabel}
            y="13%"
            fill="white"
            fontWeight={300}
            verticalAnchor="start"
            fontVariant="all-small-caps"
          >
            {labelYAxis}
          </Text>
        </Group>

        {/* bottom axis with label */}
        <Group>
          <Axis
            orientation="bottom"
            numTicks={data.length}
            top={innerHeight - axisHeightX}
            left={axisWidthY}
            tickLabelProps={{
              fill: 'white',
              fontSize: 16,
              dy: 8,
              textAnchor: 'middle',
              verticalAnchor: 'end',
            }}
            strokeWidth={strokeWidth} // size of ticks
          />
          <Text
            width={labelXWidth - 10}
            fontSize={40}
            x={innerWidth - (innerWidth * 2) / 3}
            y={innerHeight - verticalTopSpacing}
            fill="white"
            fontWeight={300}
            textAnchor="start"
            verticalAnchor="end"
            fontVariant="all-small-caps"
          >
            {labelXAxis}
          </Text>
        </Group>
      </Group>

      <Group top={verticalTopSpacing} left={margin.left + axisWidthY}>
        {/* lines at number 8 */}
        <Group>
          {/* horizontal */}
          <Line
            from={{ x: scaleFunctionX(0), y: scaleFunctionY(8) }}
            to={{ x: scaleFunctionX(8), y: scaleFunctionY(8) }}
            stroke={'white'}
            strokeWidth={strokeWidth}
          />
          {/* vertical */}
          <Line
            from={{ x: scaleFunctionX(8), y: scaleFunctionY(8) }}
            to={{ x: scaleFunctionX(8), y: scaleFunctionY(0) }}
            stroke={'white'}
            strokeWidth={strokeWidth}
          />
        </Group>

        {/* lines at number 10 */}
        <Group>
          {/* horizontal */}
          <Line
            from={{ x: scaleFunctionX(0), y: scaleFunctionY(10) }}
            to={{ x: scaleFunctionX(10), y: scaleFunctionY(10) }}
            stroke={'white'}
            strokeWidth={strokeWidth}
          />
          {/* vertical */}
          <Line
            from={{ x: scaleFunctionX(10), y: scaleFunctionY(10) }}
            to={{ x: scaleFunctionX(10), y: scaleFunctionY(0) }}
            stroke={'white'}
            strokeWidth={strokeWidth}
          />
        </Group>

        <LineSeries
          dataKey="line"
          data={data}
          xAccessor={(d) =>
            scaleLinear({
              range: domainX,
            })(d.x)
          }
          yAccessor={(d) =>
            scaleLinear({
              range: domainY.toReversed(), // todo: find out why reverse necessary
            })(d.y)
          }
          strokeWidth={strokeWidth}
        />
      </Group>
    </XYChart>
  );
};

export default Graph;
