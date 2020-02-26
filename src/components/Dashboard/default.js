export const proxy = 'https://cors-anywhere.herokuapp.com/';
export const apiUrl =
  'http://api.scb.se/OV0104/v1/doris/en/ssd/START/MI/MI0108/TotaltUtslapp';

export const defaultChartTypes = ['bar', 'area'];

export const defaultDashboards = [];

export const defaultTab = () => {
  return {
    id: Math.random(),
    name: '',
    data: null,
    catKey: null,
    catVal: null,
    timespan: { from: 0, to: 100 }, // from/to = number
    charts: []
  };
};

export const defaultChart = (key, val) => {
  const typeIndex = Math.floor(Math.random() * defaultChartTypes.length); // rand chartType
  const randVal = Math.floor(Math.random() * 5) + 1; // rand 1-5

  const res = {
    type: defaultChartTypes[typeIndex],
    substance: {
      name: '',
      code: ''
    },
    sector: {
      name: '',
      code: ''
    },
    value: randVal
  };

  res[key] = val;

  return res;
};

export const queryBakery = (by, value) => {
  const code = by === 'substances' ? 'Luftfororening' : 'Sektor';

  return {
    query: [
      {
        code,
        selection: {
          filter: 'item',
          values: [value]
        }
      }
    ],
    response: {
      format: 'json'
    }
  };
};
