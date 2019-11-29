import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory"
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";

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

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
