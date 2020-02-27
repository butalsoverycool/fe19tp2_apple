import styled, { keyframes } from 'styled-components';

export const intro = keyframes`
	0%{
        display: block;
		transform: translate3d(-8vw, 0, 0);
		opacity: 0;
	}100%{
		transform: translate3d(0,0,0);
		opacity: 1;
	} 
`;

export const outro = keyframes`
	0%{
		transform: translate3d(0, 0, 0);
        opacity: 1;
        display: block;
	}100%{
		transform: translate3d(8vw,0,0);
        opacity: 0;
        display: none;
	}
`;

export const dots = keyframes`
    0%,
    20% {
      color: rgba(0, 0, 0, 0);
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    40% {
      color: black;
      text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    60% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 rgba(0, 0, 0, 0);
    }
    80%,
    100% {
      text-shadow: 0.25em 0 0 black, 0.5em 0 0 black;
    }
`;

export const flyCycle = keyframes`
    100% {
		background-position: -900px 0;
	}
`;

export const flyRightOne = keyframes`
0% {
		transform: scale(0.3) translateX(-5vw);
	}
	
	10% {
		transform: translateY(0vh) translateX(10vw) scale(0.4);
	}
	
	20% {
		transform: translateY(0vh) translateX(30vw) scale(0.5);
	}
	
	30% {
		transform: translateY(0vh) translateX(50vw) scale(0.6);
	}
	
	40% {
		transform: translateY(0vh) translateX(60vw) scale(0.6);
	}
	
	50% {
		transform: translateY(0vh) translateX(70vw) scale(0.6);
	}
	
	60% {
		transform: translateY(0vh) translateX(80vw) scale(0.6);
	}
	
	70% {
		transform: translateY(0vh) translateX(90vw) scale(0.6);
	}
	
	80% {
		transform: translateY(0vh) translateX(97vw) scale(0.6);
	}
	
	90% {
		transform: translateY(0vh) translateX(100vw) scale(0.6);
	}
	
	100% {
		transform: translateY(0vh) translateX(105vw) scale(0.6);
	}
`;

export const flyRightTwo = keyframes`
0% {
		transform: translateY(-2vh) translateX(-5vw) scale(0.5);
	}
	
	10% {
		transform: translateY(0vh) translateX(20vw) scale(0.4);
	}
	
	20% {
		transform: translateY(-4vh) translateX(30vw) scale(0.6);
	}
	
	30% {
		transform: translateY(1vh) translateX(40vw) scale(0.45);
	}
	
	40% {
		transform: translateY(-2.5vh) translateX(45vw) scale(0.5);
	}
	
	50% {
		transform: translateY(0vh) translateX(60vw) scale(0.45);
	}
	
	60% {
		transform: translateY(0vh) translateX(70vw) scale(0.45);
	}
	
	70% {
		transform: translateY(0vh) translateX(80vw) scale(0.45);
	}
	
	80% {
		transform: translateY(0vh) translateX(90vw) scale(0.45);
	}
	
	90% {
		transform: translateY(0vh) translateX(100vw) scale(0.45);
	}
	
	100% {
		transform: translateY(0vh) translateX(105vw) scale(0.45);
	}	
`;
