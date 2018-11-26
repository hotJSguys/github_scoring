import React from 'react';
import { Group } from '@vx/group';
import { GlyphDot } from '@vx/glyph';
import { LinePath } from '@vx/shape';
import { genDateValue } from '@vx/mock-data';
import { scaleTime, scaleLinear } from '@vx/scale';
import { curveBasis, curveMonotoneX } from '@vx/curve';
import { extent, max, min } from 'd3-array';

const data = genDateValue(15);

// accessors
const x = (d) => d.date;
const y = (d) => d.value;

export default ({ width, height, margin }) => {
  // bounds
  const xMax = 500;
  const yMax = 340;

  // scales
  const xScale = scaleTime({
    range: [0, xMax],
    domain: extent(data, x)
  });
  const yScale = scaleLinear({
    range: [yMax, 0],
    domain: [0, max(data, y)],
    nice: true
  });

  return (
    <svg width={600} height={440}>
      <rect x={0} y={0} width={600} height={440} fill="white" rx={14} />
      <Group top={5}>
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke="#B7C9CC"
          strokeWidth={1}
          strokeDasharray="2,2"
          curve={curveBasis}
        />
        <LinePath
          data={data}
          xScale={xScale}
          yScale={yScale}
          x={x}
          y={y}
          stroke="#E56399"
          strokeWidth={3}
          curve={curveMonotoneX}
          glyph={(d, i) => {
            return (
              <g key={`line-point-${i}`}>
                <GlyphDot cx={xScale(x(d))} cy={yScale(y(d))} r={6} strokeWidth={10} />
                <GlyphDot cx={xScale(x(d))} cy={yScale(y(d))} r={6} strokeWidth={3} />
                <GlyphDot cx={xScale(x(d))} cy={yScale(y(d))} r={4} fill="#ffffff" />
              </g>
            );
          }}
        />
      </Group>
    </svg>
  );
};
