import React from 'react';
import styled from 'styled-components';
import {
	CartesianGrid,
	XAxis,
	YAxis,
	AreaChart,
	Area,
	Tooltip,
	ResponsiveContainer
} from 'recharts';

const Wrapper = styled.div`
	width: 900px;
	height: 500px;
	margin: auto;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const AreaChartTemplate = (props) => {
	const unit = props.data[0].substance;
	return (
		<ResponsiveContainer width="99%" height="80%">
			<AreaChart
				width={800}
				height={500}
				data={props.data}
				margin={{ top: 0, right: 0, bottom: 0, left: 20 }}
			>
				<CartesianGrid />
				<Area
					type="monotone"
					dataKey="values"
					stroke="#8884d8"
					fill="hotpink"
					strokeWidth={2}
				/>
				<XAxis dataKey="year" strokeWidth={2} />
				<YAxis
					tickMargin={10}
					strokeWidth={2}
					domain={['auto', 'auto']}
				/>

				{/* <Tooltip content={<CustomTooltip unit={props.unit} />} /> */}
				<Tooltip />
			</AreaChart>
		</ResponsiveContainer>
	)
};

const ChartTemplate = (props) => {
	return (

		<Wrapper className="preview">
			{props.data ? <AreaChartTemplate data={props.data} unit={props.unit} /> : null}
		</Wrapper>
	);
};

export default ChartTemplate;

