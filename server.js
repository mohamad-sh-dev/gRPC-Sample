// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');
// const echoProto = protoLoader.loadSync('./protos/contract.proto');

// const echoDefenition = grpc.loadPackageDefinition(echoProto);
// const { echoPackage } = echoDefenition
// const server = new grpc.Server();


const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageProto = protoLoader.loadSync('./protos/contract.proto');
const packageDefenition = grpc.loadPackageDefinition(packageProto);
const { echoPackage } = packageDefenition;

const server = new grpc.Server();

server.addService(echoPackage.EchoService.service, {
    EchoUnary: (call, callback) => { // Legacy Request Response
        console.log('Unary Method Log => Client Data: ', call.request);
        // 'call' object have whole grpc request
        callback(null /* response with no error */, {
            serverResponse: "come from server"
        })
    },

    EchoClientStream: function (call, callback) {
        call.on('data', (data) => {
            console.log('EchoClientStream Method => Data from Clinet : ', data);
        }) // client streaming 
        call.on('end', (err) => {
            if (err) return console.log(err);
        })
    },

    EchoServerStream: function (call, callback) {
         // server streaming 
        for (let index = 0; index < 10; index++) {
            call.write({
                value: index
            })
        }
        call.end()
    },

    EchoBidiStream: function (call, callback) {
        // server stream / client stream
        setInterval(() => {
            call.write({value : new Date().toLocaleString()})
        }, 1000);
        call.on('data' , (data)=>{
            console.log('Server Time :' , data);
        })
    },


});

server.bindAsync('localhost:5000', grpc.ServerCredentials.createInsecure(), (err) => {
    console.log('server started');
});