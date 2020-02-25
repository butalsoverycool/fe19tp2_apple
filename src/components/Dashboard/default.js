export const proxy = 'https://cors-anywhere.herokuapp.com/';
export const apiUrl =
  'http://api.scb.se/OV0104/v1/doris/en/ssd/START/MI/MI0108/TotaltUtslapp';

export const defaultChartTypes = ['bar', 'area'];

export const defaultDashboards = [];

export const defaultTab = {
  data: null,
  catName: null,
  catValue: null,
  timespan: { from: 0, to: 100 }, // from/to = number
  charts: []
};

export const defaultChart = {
  type: '',
  sectors: {
    name: '',
    code: ''
  }, // populate with str:s
  substances: [
    {
      name: '',
      code: ''
    }
  ],
  value: null
};

export const queryBakery = (by, value) => {
  const code = by === 'substance' ? 'Luftfororening' : 'Sektor';

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
