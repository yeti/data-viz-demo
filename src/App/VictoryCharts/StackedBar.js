
import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryStack,
  VictoryAxis,
  VictoryLabel,
} from 'victory';

const onBarClick = [
  {
    target: 'data',
    eventHandlers: {
      onClick: () => {
        return [
          {
            target: 'data',
            mutation: (props) => {
              return {
                style: {
                  ...props.style,
                  opacity: props.style.opacity === 1 ? 0.25 : 1,
                },
              };
            },
          },
        ];
      },
    },
  },
];

export default ({ data, avgData }) => {

  const children = data.filter(datum => datum.child);
  const adults = data.filter(datum => !datum.child);

  const childrenBetterThanAve = children.filter(datum => datum.y > avgData).length;
  const childrenWorseThanAve = children.filter(datum => datum.y <= avgData).length;
  const adultBetterThanAve = adults.filter(datum => datum.y > avgData).length;
  const adultWorseThanAve = adults.filter(datum => datum.y <= avgData).length;

  return (
    <div className='Victory__StackedBar'>
      <VictoryChart
        domainPadding={50}
      >
        <VictoryAxis
          dependentAxis label="Number of People"
          axisLabelComponent={<VictoryLabel dy={-10} />}
        />
        <VictoryAxis
          tickFormat={["Child", "Adult"]}
          label="Child or Adult"
          axisLabelComponent={<VictoryLabel dy={-10} />}
        />
        <VictoryStack colorScale={['green', 'red']}>
          <VictoryBar
            data={[ {x: 'Better', y: childrenBetterThanAve}, {x: 'Worse', y: adultBetterThanAve} ]}
            events={onBarClick}
          />
          <VictoryBar
            data={[ {x: 'Better', y: childrenWorseThanAve}, {x: 'Worse', y: adultWorseThanAve} ]}
            events={onBarClick}
          />
        </VictoryStack>
      </VictoryChart>
    </div>
  );

};
