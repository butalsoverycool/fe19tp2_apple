import styled from 'styled-components';

export const Wrapper = styled.div`
    margin: auto;
    width: 90vw;
    max-width: 600px;
    display: flex;
    flex-direction: column;
    justify-content: center; 
    margin: 30px auto;
    background: ${props => props.bg || 'none'};
    color: ${props => props.color || 'black'};
`;

export const Title = styled.h2`
    margin-bottom: 0;
`;

export const Subtitle = styled.h3`
    margin-top: 0;
`;

export const ChartHeader = styled.h3`
    text-align: center;
`;

export const CustomizeBox = styled.div`
    display: flex;
    justify-content: ${props => props.justifyContent || 'center'};
    text-align: ${props => props.textAlign || 'center'};
`;

export const InnerTable = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;  
`;

export const CustomizeBtn = styled.button`
    box-shadow: 0 0 10px #DDD;
    border-radius: 10px;
    width: ${props => props.w || '50px'};
    height: ${props => props.h || '50px'};
    margin: ${props => props.margin || '5px'};
    outline: none;
`;