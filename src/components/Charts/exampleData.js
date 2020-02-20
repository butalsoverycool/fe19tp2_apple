const exampleData = [
  {
    year: '1990',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 275578
  },
  {
    year: '1991',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 280933
  },
  {
    year: '1992',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 269098
  },
  {
    year: '1993',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 257762
  },
  {
    year: '1994',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 261857
  },
  {
    year: '1995',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 250666
  },
  {
    year: '1996',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 245545
  },
  {
    year: '1997',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 234702
  },
  {
    year: '1998',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 224555
  },
  {
    year: '1999',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 217000
  },
  {
    year: '2000',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 212679
  },
  {
    year: '2001',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 202906
  },
  {
    year: '2002',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 195503
  },
  {
    year: '2003',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 190985
  },
  {
    year: '2004',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 186117
  },
  {
    year: '2005',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 181586
  },
  {
    year: '2006',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 178411
  },
  {
    year: '2007',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 172262
  },
  {
    year: '2008',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 164348
  },
  {
    year: '2009',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 152365
  },
  {
    year: '2010',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 156346
  },
  {
    year: '2011',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 148562
  },
  {
    year: '2012',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 142554
  },
  {
    year: '2013',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 139895
  },
  {
    year: '2014',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 138487
  },
  {
    year: '2015',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 134241
  },
  {
    year: '2016',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 131712
  },
  {
    year: '2017',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 128133
  },
  {
    year: '2018',
    sector: '0.5',
    substance: {
      name: 'Kväveoxider (NOx) (t)',
      code: 'NOx'
    },
    values: 126237
  }
];

export const availableData = {
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

export const exampleChartData = [
  {
    year: 'time start',
    sector: '*unknown substance*',
    substance: { name: '*unknown substance*', code: '*unit*' },
    values: 1
  },
  {
    year: 'time',
    sector: '*unknown substance*',
    substance: { name: '*unknown substance*', code: '*unit*' },
    values: 3
  },
  {
    year: 'time',
    sector: '*unknown substance*',
    substance: { name: '*unknown substance*', code: '*unit*' },
    values: 5
  },
  {
    year: 'time',
    sector: '*unknown substance*',
    substance: { name: '*unknown substance*', code: '*unit*' },
    values: 2
  },
  {
    year: 'time',
    sector: '*unknown substance*',
    substance: { name: '*unknown substance*', code: '*unit*' },
    values: 3
  },
  {
    year: 'time end',
    sector: '*unknown substance*',
    substance: { name: '*unknown substance*', code: '*unit*' },
    values: 2
  }
];

export const exampleUser = {
  email: 'test@test.test',
  charts: [
    {
      type: 'area',
      sectors: ['0.5'],
      substances: [
        {
          name: 'Kväveoxider (NOx) (t)',
          code: 'NOx'
        }
      ],
      limit: { from: 0, to: 28 },
      data: exampleChartData
    },
    {
      type: 'bar',
      sectors: ['0.5'],
      substances: [
        {
          name: 'Kväveoxider (NOx) (t)',
          code: 'NOx'
        }
      ],
      limit: { from: 0, to: 28 },
      data: exampleChartData
    }
  ]
};

export default exampleData;
