const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const echoProto = protoLoader.loadSync('./protos/contract.proto');
const echoDefenition = grpc.loadPackageDefinition(echoProto);  // Load a gRPC package definition as a gRPC object hierarchy.
const { echoPackage } = echoDefenition
const serverUrl = 'localhost:5000'
const client = new echoPackage.EchoService(serverUrl, grpc.credentials.createInsecure());


// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');
// const packageProto = protoLoader.loadSync('./protos/contracs.proto');
// const packageDefenition = grpc.loadPackageDefinition(packageProto)
// const { echoPackage } = packageDefenition;
// const client = echoPackage.EchoService('localhost:5000', grpc.credentials.createInsecure())

const callUnary = () => {
    const echoData = {
        value: 'test'
    }
    client.EchoUnary(echoData, (err, response) => {
        if (err) {
            return console.log('Error From RPC Client :', err);
        }
        console.log('Unary Method Log => Server Data :', response);
    })
}

const callEchoServerStream = () => {
    const serverStream = client.EchoServerStream();
    serverStream.on('data', (data) => {
        console.log('stream received from server', data);
    })
    serverStream.on('end', (err) => {
        if (err) return console.log('error', err);
        console.log('stream from server ended');
    })
}

const callClientStream = () => {
    const EchoList = [{ value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }]
    const clientStream = client.EchoClientStream({}, (err, response) => { })

    for (let index = 0; index < EchoList.length; index++) {
        clientStream.write(EchoList[index])
    }
    clientStream.end();

}

const callBidiStream = () => {
    const clientBidiStream = client.EchoBidiStream({}, (err, response) => { });
    clientBidiStream.on('data', (data) => {
        console.log('Client Time :', data);
    })
    setInterval(() => {
        clientBidiStream.write({ value: new Date().toLocaleString() })
    }, 1000)
}


callUnary()
callEchoServerStream()
callClientStream()
callBidiStream()

