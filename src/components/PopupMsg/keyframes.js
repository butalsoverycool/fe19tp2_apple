import { css, keyframes } from 'styled-components';

const anim = {
  enter: {
    keyF: keyframes`
        0%{
            display: block;
            transform: translate3d(-8vw, 0, 0);
            opacity: 0;
        }100%{
            transform: translate3d(0,0,0);
            opacity: 1;
        }`,
    conf: (en, ex) => `1.2s ${en || ''} normal ease-out 1 forwards`
  },

  exit: {
    keyF: keyframes`
        0%{
            transform: translate3d(0, 0, 0);
            opacity: 1;
            display: block;
        }99%{
            transform: translate3d(8vw,0,0);
            opacity: 0;
        }100%{
            position: absolute;
            z-index: -1;
            opacity: 0;
            display: none;
        }`,
    conf: (en, ex) => `.4s ${ex || ''} normal ease-in 1 forwards`
  },
  loading: keyframes`
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
  `
};

export const containerAnim = ({ name, enDelay, exDelay }) => css`
  ${anim[name].keyF} ${anim[name].conf(enDelay, exDelay)};
`;

export const loaderDots = () => {
  const conf = '1.3s steps(5, end) infinite';

  return css`
    ${anim.loading} ${conf}
  `;
};

export const flyCycle = keyframes`
    100% {
		background-position: -900px 0;
	}
`;

export const flyRightOne = keyframes`
0% {
    transform: scale(0.3) translateX(-10rem);
    opacity: 0;
	}
	
	10% {
    transform: translateY(0vh) translateX(0rem) scale(0.4);
    opacity: 0;
	}
	
	20% {
    transform: translateY(0vh) translateX(5rem) scale(0.5);
    opacity: 1;
  }
  
  25% {
    opacity: 0;
	}
	
	30% {
    transform: translateY(0vh) translateX(10rem) scale(0.6);
    opacity: 0;
	}
	
	40% {
    transform: translateY(0vh) translateX(15rem) scale(0.6);
  }
	
	50% {
		transform: translateY(0vh) translateX(20rem) scale(0.6);
	}
	
	60% {
		transform: translateY(0vh) translateX(25rem) scale(0.6);
	}
	
	70% {
		transform: translateY(0vh) translateX(25rem) scale(0.6);
	}
	
	80% {
    transform: translateY(0vh) translateX(25rem) scale(0.6);
    opacity: 1;
	}
	
	90% {
    transform: translateY(0vh) translateX(25rem) scale(0.6);
    opacity: 0;
	}
	
	100% {
    transform: translateY(0vh) translateX(25rem) scale(0.6);
    opacity: 0;
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
