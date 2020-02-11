import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import allData from './allData';

const q = {
  "query": [],
  "response": {
    "format": "json"
  }

};


function DataRequest() {
  const [data, setData] = useState({ result: [] });
  const [query, setQuery] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        method: 'post',
        url: 'http://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0108/TotaltUtslapp',
      });

      setData(result.data);
      console.log(result);
    };
    fetchData()
  }, []);

  return (
    <div>
      <button
        name='Get Data'
        type='button'
        placeholder='Get Data'
        onClick={event => setQuery(q)}></button>
      hej
    </div>
  )
}

export default DataRequest;



//////////////////////////

class Request extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      query: '',
    };
  }

  setData(result) {
    this.setState({ result })
  }

  fetchData() {
    fetch(`https://cors-anywhere.herokuapp.com/http://api.scb.se/OV0104/v1/doris/sv/ssd/START/MI/MI0108/TotaltUtslapp`, {
      method: 'post',
      body: JSON.stringify(q),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(result => {
        this.setData(result);
        console.log(result);
      }
      );
  };

  componentDidMount() {
    this.fetchData()
  }

  render() {


    return (
      <div>
      </div>
    )
  }
};

export { Request };
