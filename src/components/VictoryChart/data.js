//Sweden nitrogen oxide (NOx) emission 1990-2018
export const NitroOxide = {
  title: 'Sweden nitrogen oxide (NOx) emission',
  subtitle: '(inc. international transports)',
  chartTitle: state => {
    const { from, to } = state.limit;
    return (from + 1990 || 1990) + '-' + (to + 1990 || 2018);
  },
  callback: res =>
    res.data.data.map((item, nth) => {
      const year = nth + 1990;
      return { [year]: item.values[0] };
    }),
  unit: 'NOx',
  url: 'http://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0108/TotaltUtslapp',
  query: {
    query: [
      {
        code: 'Luftfororening',
        selection: {
          filter: 'item',
          values: ['NOx']
        }
      },
      {
        code: 'Sektor',
        selection: {
          filter: 'item',
          values: ['0.6']
        }
      }
    ],
    response: {
      format: 'json'
    }
  }
};

//Sweden soot (BC) emission 1990-2018
export const Soot = {
  title: 'Sweden soot (BC) emission 1990-2018',
  subtitle: '(inc. international transports)',
  chartTitle: state => {
    const { from, to } = state.limit;
    return (from + 1990 || 1990) + '-' + (to + 1990 || 2018);
  },
  callback: res =>
    res.data.data.map((item, nth) => {
      const year = nth + 1990;
      return { [year]: item.values[0] };
    }),
  unit: 'BC',
  url: 'http://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0108/TotaltUtslapp',
  query: {
    query: [
      {
        code: 'Luftfororening',
        selection: {
          filter: 'item',
          values: ['BC']
        }
      },
      {
        code: 'Sektor',
        selection: {
          filter: 'item',
          values: ['0.6']
        }
      }
    ],
    response: {
      format: 'json'
    }
  }
};
