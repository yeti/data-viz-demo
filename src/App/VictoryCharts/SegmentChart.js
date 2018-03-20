import React from 'react';
import {
  VictoryPie,
  Slice,
} from 'victory';
import styles from './victory.styles.js';
import './SegmentChart.css';

export default (props) => {
  const { data } = props;

  const numIsChild = data.filter(datum => datum.child).length;
  const numIsOther = data.length - numIsChild;

  return (
    <div className="Victory__SegmentChart">
      <VictoryPie
        animate
        style={styles.segmentData}
        data={[
          {x: 'Child', y: numIsChild},
          {x: 'Other', y: numIsOther},
        ]}
        dataComponent={
          <Slice
            event={ev => console.log(ev)}
          />
        }
        events={[
          {
            target: 'data',
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: 'data',
                    mutation: (targetProp) => {

                      if (targetProp.slice.data.x === 'Child') {
                        props.toggleShowChild();
                      } else {
                        props.toggleShowAdult();
                      }
                      const opacity = targetProp.style.opacity === 0.5 ? 1 : 0.5;
                      return {
                        style: { ...targetProp.style, opacity },
                      };
                    }
                  }
                ];
              },
              onMouseOut: () => {
                return [
                  {
                    target: 'data',
                    mutation: (targetProp) => {
                      if (targetProp.slice.data.x === 'Child') {
                        props.toggleShowChild();
                      } else {
                        props.toggleShowAdult();
                      }
                    }
                  }
                ];
              },
            },
          },
        ]}
      />
    </div>
  );
};
