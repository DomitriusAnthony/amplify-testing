import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";
import Amplify from 'aws-amplify';
import config from './aws-exports';

import Routes from './routes';
import "./index.css";

import resolvers from "./apollo/resolvers";

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: "http://localhost:4000"
})

const client = new ApolloClient({
  link,
  cache,
  resolvers
});

// This is where you can setup your initial state.
cache.writeData({
  data: {}
});

Amplify.configure(config);
ReactDOM.render(
  <ApolloProvider client={client}>
    <Routes />
  </ApolloProvider>,
  document.getElementById("root")
);
