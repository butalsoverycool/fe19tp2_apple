import ApolloClient from 'apollo-boost';
import { gql } from 'apollo-boost';

import React, { Component } from 'react';

export default class Graph extends Component {
  render() {
    return <div></div>;
  }
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
});
