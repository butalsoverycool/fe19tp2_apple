import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  Tooltip
} from 'recharts';

import CustomTooltip from './CustomTooltip';

const AreaTemplate = ({ type, data, unit, addedSubstances, addedSectors }) => {
  const drawArea = () => {
    const colors = ['8884d8', 'red', 'orange', 'black'];
    const res = addedSubstances.map((item, nth) => {
      return (
        <Area
          key={nth}
          type="monotone"
          dataKey={'data-' + nth}
          stackId="1"
          stroke="#8884d8"
          fill={colors[nth] || colors[0]}
        />
      );
    });
    return res;
  };

  const formatData = data.map(item => {
    //item[props.unit] = item.values;
    //const valueKey = item.substance.code === 'NOx' ? 'NOxValue' : 'value';
    //console.log(item.substance.code);
    //const val = item.substance.code === 'NOx' ? item.value : item.value

    item = {
      //[unit]: item.value,
      sector: item.sector,
      substance: item.substance,
      year: item.year,
      value: item.value
    };

    return item;
  });

  addedSubstances.forEach((added, addedNth) => {
    formatData.forEach((item, itemNth) => {
      if (added.code === item.substance.code) {
        item['data-' + addedNth] = item.value;
      }
    });
  });

  console.log('FORMAT DATA', formatData);

  return (
    <AreaChart
      width={600}
      height={400}
      data={formatData}
      margin={{ top: 5, right: 20, bottom: 5, left: 5 }}
    >
      {drawArea()}

      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="year" />
      <YAxis tickMargin={10} domain={[0, 'auto']} />
      <Tooltip
        content={<CustomTooltip unit={unit} sector={data[0].sector.code} />}
      />
    </AreaChart>
  );
};

export default AreaTemplate;
