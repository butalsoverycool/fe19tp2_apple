// workaround proxy for blocking cors policy
export const proxy = 'https://cors-anywhere.herokuapp.com/';

// url for the emission table from API
export const apiUrl =
  'http://api.scb.se/OV0104/v1/doris/en/ssd/START/MI/MI0108/TotaltUtslapp';

// available chart types (mar 2020)
export const defaultChartTypes = [
  'Bar',
  'Area',
  'Radar' /*, 'scatter', 'pie' */
];

// tab obj template
export const defaultTab = newIndex => {
  return {
    id: 'tab-' + String((Math.random() * 100).toFixed(0)) + String(newIndex),
    name: '',
    catKey: null,
    catVal: null,
    catRes: null,
    timespan: { from: 0, to: null }, // from/to = number
    charts: [],
    chartType: 'random'
  };
};

// chart obj template
export const defaultChart = (input, index, chartType) => {
  const randType = Math.floor(Math.random() * defaultChartTypes.length); // rand chartType

  return {
    id: 'chart-' + String((Math.random() * 100).toFixed(0)) + String(index),
    type:
      chartType === 'random' || !chartType
        ? defaultChartTypes[randType]
        : defaultChartTypes[chartType],
    disabled: false,
    data: [...input]
  };
};

// data point obj template
export const defaultDataPoint = (data, index) => {
  return {
    id: 'dataPoint-' + String((Math.random() * 100).toFixed(0)) + String(index),
    year: data.year,
    substance: data.substance,
    sector: data.sector,
    value: data.value
  };
};

// create query based on user choices
export const queryBakery = (by, value) => {
  // eng -> se
  const code = by === 'substances' ? 'Luftfororening' : 'Sektor';

  return {
    query: [
      {
        code, // (catKey)
        selection: {
          filter: 'item',
          values: [value] // (catVal)
        }
      }
    ],
    response: {
      format: 'json'
    }
  };
};

// backup dataTitles (feb 2020) - 200 res
export const defaultDataTitles = {
  substances: [
    {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    {
      name: 'Flyktiga organiska ämnen, exkl. metan (NMVOC) (t)',
      code: 'NMVOC'
    },
    {
      name: 'Svaveldioxid (SO2) (t)',
      code: 'SO2'
    },
    {
      name: 'Ammoniak (NH3) (t)',
      code: 'NH3'
    },
    {
      name: 'PM2.5 (t)',
      code: 'PM2.5'
    },
    {
      name: 'PM10 (t)',
      code: 'PM10'
    },
    {
      name: 'TSP (t)',
      code: 'TSP'
    },
    {
      name: 'Sot (BC) (t)',
      code: 'BC'
    },
    {
      name: 'Kolmonoxid (CO) (t)',
      code: 'CO'
    },
    {
      name: 'Bly (Pb) (kg)',
      code: 'Pb'
    },
    {
      name: 'Kadmium (Cd) (kg)',
      code: 'Cd'
    },
    {
      name: 'Kvicksilver (Hg) (kg)',
      code: 'Hg'
    },
    {
      name: 'Arsenik (As) (kg)',
      code: 'As'
    },
    {
      name: 'Krom (Cr) (kg)',
      code: 'Cr'
    },
    {
      name: 'Koppar (Cu) (kg)',
      code: 'Cu'
    },
    {
      name: 'Nickel (Ni) (kg)',
      code: 'Ni'
    },
    {
      name: 'Selen (Se) (kg)',
      code: 'Se'
    },
    {
      name: 'Zink (Zn) (kg)',
      code: 'Zn'
    },
    {
      name: 'Dioxin (g I-Teq)',
      code: 'DIOX'
    },
    {
      name: 'benso(a)pyren (kg)',
      code: 'benzo(a)'
    },
    {
      name: 'benso(b)fluoranten (kg)',
      code: 'benzo(b)'
    },
    {
      name: 'benso(k)fluoranten (kg)',
      code: 'benzo(k)'
    },
    {
      name: 'Indeno(1,2,3-cd)pyren (kg)',
      code: 'Indeno'
    },
    {
      name: 'PAH 1-4 (kg)',
      code: 'PAH 1-4'
    },
    {
      name: 'HCB (kg)',
      code: 'HCB'
    },
    {
      name: 'PCB  (kg)',
      code: 'PCB'
    }
  ],
  sectors: [
    {
      name: 'NATIONELL TOTAL (exklusive internationella transporter)',
      code: '0.5'
    },
    {
      name: 'NATIONELL TOTAL (inklusive internationella transporter)',
      code: '0.6'
    },
    {
      name: 'ARBETSMASKINER, TOTALT',
      code: '1.0'
    },
    {
      name: 'AVFALL, TOTALT',
      code: '2.0'
    },
    {
      name: 'EL OCH FJÄRRVÄRME, TOTALT',
      code: '3.0'
    },
    {
      name: 'INDUSTRI, TOTALT',
      code: '4.0'
    },
    {
      name: 'UTRIKES TRANSPORTER, TOTALT',
      code: '5.0'
    },
    {
      name: 'JORDBRUK, TOTALT',
      code: '6.0'
    },
    {
      name: 'LÖSNINGSMEDEL OCH ÖVRIG PRODUKTANVÄNDNING, TOTALT',
      code: '7.0'
    },
    {
      name: 'INRIKES TRANSPORTER, TOTALT',
      code: '8.0'
    },
    {
      name: 'UPPVÄRMNING AV BOSTÄDER OCH LOKALER, TOTALT',
      code: '9.0'
    }
  ],
  years: [
    '1990',
    '1991',
    '1992',
    '1993',
    '1994',
    '1995',
    '1996',
    '1997',
    '1998',
    '1999',
    '2000',
    '2001',
    '2002',
    '2003',
    '2004',
    '2005',
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018'
  ],
  dataRequest: {
    data: {
      title:
        'Totala utsläpp av luftföroreningar  efter luftförorening, sektor, tabellinnehåll och år',
      variables: [
        {
          code: 'Luftfororening',
          text: 'luftförorening',
          values: [
            'NOx',
            'NMVOC',
            'SO2',
            'NH3',
            'PM2.5',
            'PM10',
            'TSP',
            'BC',
            'CO',
            'Pb',
            'Cd',
            'Hg',
            'As',
            'Cr',
            'Cu',
            'Ni',
            'Se',
            'Zn',
            'DIOX',
            'benzo(a)',
            'benzo(b)',
            'benzo(k)',
            'Indeno',
            'PAH 1-4',
            'HCB',
            'PCB'
          ],
          valueTexts: [
            'Kväveoxider (NOx) (t)',
            'Flyktiga organiska ämnen, exkl. metan (NMVOC) (t)',
            'Svaveldioxid (SO2) (t)',
            'Ammoniak (NH3) (t)',
            'PM2.5 (t)',
            'PM10 (t)',
            'TSP (t)',
            'Sot (BC) (t)',
            'Kolmonoxid (CO) (t)',
            'Bly (Pb) (kg)',
            'Kadmium (Cd) (kg)',
            'Kvicksilver (Hg) (kg)',
            'Arsenik (As) (kg)',
            'Krom (Cr) (kg)',
            'Koppar (Cu) (kg)',
            'Nickel (Ni) (kg)',
            'Selen (Se) (kg)',
            'Zink (Zn) (kg)',
            'Dioxin (g I-Teq)',
            'benso(a)pyren (kg)',
            'benso(b)fluoranten (kg)',
            'benso(k)fluoranten (kg)',
            'Indeno(1,2,3-cd)pyren (kg)',
            'PAH 1-4 (kg)',
            'HCB (kg)',
            'PCB  (kg)'
          ]
        },
        {
          code: 'Sektor',
          text: 'sektor',
          values: [
            '0.5',
            '0.6',
            '1.0',
            '2.0',
            '3.0',
            '4.0',
            '5.0',
            '6.0',
            '7.0',
            '8.0',
            '9.0'
          ],
          valueTexts: [
            'NATIONELL TOTAL (exklusive internationella transporter)',
            'NATIONELL TOTAL (inklusive internationella transporter)',
            'ARBETSMASKINER, TOTALT',
            'AVFALL, TOTALT',
            'EL OCH FJÄRRVÄRME, TOTALT',
            'INDUSTRI, TOTALT',
            'UTRIKES TRANSPORTER, TOTALT',
            'JORDBRUK, TOTALT',
            'LÖSNINGSMEDEL OCH ÖVRIG PRODUKTANVÄNDNING, TOTALT',
            'INRIKES TRANSPORTER, TOTALT',
            'UPPVÄRMNING AV BOSTÄDER OCH LOKALER, TOTALT'
          ]
        },
        {
          code: 'ContentsCode',
          text: 'tabellinnehåll',
          values: ['000001EY'],
          valueTexts: ['Ämne']
        },
        {
          code: 'Tid',
          text: 'år',
          values: [
            '1990',
            '1991',
            '1992',
            '1993',
            '1994',
            '1995',
            '1996',
            '1997',
            '1998',
            '1999',
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018'
          ],
          valueTexts: [
            '1990',
            '1991',
            '1992',
            '1993',
            '1994',
            '1995',
            '1996',
            '1997',
            '1998',
            '1999',
            '2000',
            '2001',
            '2002',
            '2003',
            '2004',
            '2005',
            '2006',
            '2007',
            '2008',
            '2009',
            '2010',
            '2011',
            '2012',
            '2013',
            '2014',
            '2015',
            '2016',
            '2017',
            '2018'
          ],
          time: true
        }
      ]
    },
    status: 200,
    statusText: 'OK',
    headers: {
      'access-control-allow-origin': '*',
      'cache-control': 'private',
      connection: 'keep-alive',
      'content-length': '1972',
      'content-type': 'application/json; charset=utf-8',
      date: 'Thu, 20 Feb 2020 13:42:08 GMT',
      server: 'Microsoft-IIS/10.0',
      'x-final-url':
        'http://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0108/TotaltUtslapp',
      'x-powered-by': 'ASP.NET'
    },
    config: {
      url:
        'https://cors-anywhere.herokuapp.com/http://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0108/TotaltUtslapp',
      method: 'get',
      headers: {
        Accept: 'application/json, text/plain, */*'
      },
      transformRequest: [null],
      transformResponse: [null],
      timeout: 0,
      xsrfCookieName: 'XSRF-TOKEN',
      xsrfHeaderName: 'X-XSRF-TOKEN',
      maxContentLength: -1
    },
    request: {}
  }
};
