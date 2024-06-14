# gRPC Node.js Simple Project

This is a simple gRPC project in Node.js that demonstrates the use of unary, client streaming, server streaming, and bidirectional streaming RPCs.

## Prerequisites

- Node.js installed on your machine
- `@grpc/grpc-js` and `@grpc/proto-loader` packages

## Project Structure

```
.
├── protos
│   └── contract.proto
├── server.js
└── client.js
```

## `contract.proto`

Define your gRPC service in a `.proto` file inside the `protos` directory. Here's an example of what the `contract.proto` file might look like:

```proto
syntax = "proto3";

package echoPackage;

service EchoService {
    rpc EchoUnary (EchoRequest) returns (EchoResponse);
    rpc EchoClientStream (stream EchoRequest) returns (EchoResponse);
    rpc EchoServerStream (EchoRequest) returns (stream EchoResponse);
    rpc EchoBidiStream (stream EchoRequest) returns (stream EchoResponse);
}

message EchoRequest {
    string value = 1;
}

message EchoResponse {
    string serverResponse = 1;
    int32 value = 2;
}
```

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/mohamad-sh-dev/gRPC-Sample.git
    cd gRPC-Sample
    ```

2. Install the dependencies:

    ```sh
    npm install --ignore-scripts
    ```

## Running the Server

To start the gRPC server, run:

```sh
npm run start:server
```

The server will start and listen for requests on `localhost:5000`.

## Running the Client

To run the gRPC client, which will invoke the various RPC methods, run:

```sh
npm run start:client
```

The client will demonstrate the following RPC calls:

1. **Unary Call**
2. **Client Streaming**
3. **Server Streaming**
4. **Bidirectional Streaming**

## `server.js`

The server implementation provides the following methods:

- **EchoUnary**: Handles a simple request-response (unary) RPC.
- **EchoClientStream**: Handles client-side streaming RPCs.
- **EchoServerStream**: Handles server-side streaming RPCs.
- **EchoBidiStream**: Handles bidirectional streaming RPCs.

## `client.js`

The client implementation demonstrates the following RPC calls:

- **Unary Call**: Sends a single request and receives a single response.
- **Client Streaming**: Sends a stream of requests and receives a single response.
- **Server Streaming**: Sends a single request and receives a stream of responses.
- **Bidirectional Streaming**: Sends and receives streams of requests and responses.

## Conclusion

This project demonstrates the basic usage of gRPC in Node.js, covering unary, client streaming, server streaming, and bidirectional streaming RPCs as simple as possible. You can expand this project by modifying the proto file and adding more complex logic to the server and client implementations.

Happy Coding 
