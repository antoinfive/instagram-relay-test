import { 
  Environment,
  Network,
  RecordSource,
  Store
} from "relay-runtime"; 

/* responsible for the caching in our application */
const store = new Store(new RecordSource())

/* graphql server to talk to, with network configurations */
const network = Network.create((operation, variables) => {
  return fetch("https://api.graph.cool/relay/v1/cjf2npkvz6dfb015172xul4ar", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    }),
  }).then(response => {
    return response.json()
  })
});

const environment = new Environment({
  network,
  store
});

export default environment;
