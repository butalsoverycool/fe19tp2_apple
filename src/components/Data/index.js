import React, { Component } from 'react';

export default class Data extends Component {
  render() {
    return <div></div>;
  }
}

const scb = {
  query: [],
  response: {
    format: 'json'
  }
};
const url =
  'https://cors-anywhere.herokuapp.com/http://api.scb.se/OV0104/v1/doris/en/ssd/START/MI/MI0108/TotaltUtslapp';
(async () => {
  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(scb)
  });
  const content = await rawResponse.json();
  const { data } = content;

  data.forEach(function(item) {
    item.sector = item.key[1];
    item.year = item.key[2];

    item.key.splice(1, 2);
  });

  let chartData = JSON.stringify(data)
    .split('"key":')
    .join('"id":');
})();
