import React, { Component } from 'react';
import styled from 'styled-components';
import { withTheme } from '../Theme';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Cell,
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Sector,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis
} from 'recharts';

// tempstyle
const Wrapper = styled.div`
  flex: 1;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AreaTemplate = ({ data, theme }) => {
  return (
    <ResponsiveContainer width={'99%'} height={'99%'}>
      <AreaChart data={data}>
        <CartesianGrid />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#333"
          fill={theme.color.hex || 'hotpink'}
          strokeWidth={2}
        />
        <XAxis dataKey="year" strokeWidth={2} />
        <YAxis
          tickMargin={10}
          strokeWidth={2}
          domain={['auto', 'auto']}
          dataKey="value"
        />

        {/* <Tooltip content={<CustomTooltip unit={props.unit} />} /> */}
        <Tooltip />
      </AreaChart>
    </ResponsiveContainer>
  );
};

class BarTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0
    };
  }

  clickHandler = (data, index) => {
    this.setState({
      activeIndex: index
    });
  };

  render() {
    const { activeIndex } = this.state;
    const { data, theme } = this.props;
    const { year, substance, sector, value } = data[activeIndex];

    return (
      <ResponsiveContainer width={'99%'} height={'99%'}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis dataKey="value" />
          <Tooltip />
          <Legend>{activeIndex}</Legend>
          <Bar dataKey="value" onClick={this.clickHandler}>
            {data.map((entry, index) => (
              <Cell
                cursor="pointer"
                fill={index === activeIndex ? '#333' : theme.color.hex}
                key={`cell-${index}`}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

const ScatterTemplate = props => {
  const { data, theme } = props;

  const scatterData = data.map(item => ({
    ...item,
    x: item.year,
    y: item.value
  }));

  return (
    <ResponsiveContainer width={'99%'} height={'99%'}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
        data={scatterData}
      >
        <CartesianGrid />
        <XAxis type="string" dataKey="x" name="year" />
        <YAxis yAxisId="left" type="number" dataKey="y" name="emission" />
        <ZAxis
          type="number"
          dataKey="y"
          range={[60, 400]}
          name="emission"
          unit=""
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        {scatterData.map((item, nth) => (
          <Scatter
            key={nth}
            yAxisId="left"
            name={item.substance.code}
            data={scatterData[nth]}
            fill={theme.color.hex}
          />
        ))}
      </ScatterChart>
    </ResponsiveContainer>
  );
};

const PieTemplate = props => {
  const { data, theme } = props;

  return (
    <ResponsiveContainer width={'99%'} height={'99%'}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          name="emission"
          cx={'50%'}
          cy={'50%'}
          innerRadius={70}
          outerRadius={90}
          startAngle={85}
          endAngle={-265}
          fill="#333"
          label
          fontSize={labelSize(data.length)}
        />
        <Pie
          data={data}
          dataKey="year"
          name="year"
          cx={'50%'}
          cy={'50%'}
          innerRadius={10}
          outerRadius={65}
          startAngle={85}
          endAngle={-265}
          fill="#333"
        >
          {data.map((entry, nth) => (
            <Cell
              key={`cell-${nth}`}
              fill={nth === 0 ? '#333' : theme.color.hex}
            ></Cell>
          ))}
        </Pie>

        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};

const labelSize = dataLen => {
  switch (true) {
    case dataLen > 25:
      return '.5rem';
    case dataLen > 20:
      return '.6rem';
    case dataLen > 15:
      return '.7rem';
    case dataLen > 10:
      return '.9rem';
    default:
      return '1rem';
  }
};

const RadarTemplate = props => {
  const { data, theme } = props;

  return (
    <ResponsiveContainer width={'99%'} height={'99%'}>
      <RadarChart
        cx={'50%'}
        cy={'50%'}
        outerRadius={80}
        width={200}
        height={200}
        data={data}
      >
        <PolarGrid stroke="#333" />
        <PolarAngleAxis dataKey="year" fontSize={labelSize(data.length)} />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar
          name="Emission"
          dataKey="value"
          stroke="#333"
          fill={theme.color.hex}
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const TemplateBakery = ({ data, theme, type }) => {
  switch (type) {
    case 'area':
      return <AreaTemplate data={data} theme={theme} />;
    case 'bar':
      return <BarTemplate data={data} theme={theme} />;
    case 'scatter':
      return <ScatterTemplate data={data} theme={theme} />;
    case 'pie':
      return <PieTemplate data={data} theme={theme} />;
    case 'radar':
      return <RadarTemplate data={data} theme={theme} />;
    default:
      return <div>default chart type</div>;
  }
};

const ChartTemplate = props => {
  if (!props.data) return '';

  let { data, type, theme } = props;

  // if areachart and only 1 data point, duplicate to create line
  if (type === 'area' && data.length === 1) {
    data.push(data[0]);
  }

  return (
    <Wrapper className={`ChartTemplate ${type}`}>
      <TemplateBakery data={data} theme={theme.state} type={type} />
    </Wrapper>
  );
};

/* const condition = authUser => !!authUser; */

export default withTheme(ChartTemplate);
