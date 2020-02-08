import React, { Component } from 'react';
import styled from 'styled-components';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const TooltipStyled = styled.div`
    padding: 5px;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 10px;
    box-shadow: 0 0 20px grey;
    font-size: .8em;
    font-style: italic;
`;

const CustomTooltip = ({ active, label, payload, unit }, ...props) => {
    if (!payload) return ('');
    if (!payload[0]) return ('');

    const { val } = payload[0].payload;

    if (active) {
        return (
            <TooltipStyled className="custom-tooltip" {...props}>
                <p className="time">{label}: {val} {unit || ''}</p>
            </TooltipStyled>
        );
    }

    return null;
};

const ChartTemplate = props => {
    const data = props.data.map(item => {
        let year = Object.keys(item)[0];
        let val = Object.values(item)[0];

        return { name: year, val: val }
    });

    return (
        <>
            <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="val" stroke="black" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="name" />
                <YAxis tickMargin={10} fontSize='.7em' />
                <Tooltip content={<CustomTooltip unit={props.unit} />} />
            </LineChart>
        </>
    );
}

export default ChartTemplate;