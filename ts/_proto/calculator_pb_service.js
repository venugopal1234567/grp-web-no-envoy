// package: calculator
// file: calculator.proto

var calculator_pb = require("./calculator_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Calculator = (function () {
  function Calculator() {}
  Calculator.serviceName = "calculator.Calculator";
  return Calculator;
}());

Calculator.Add = {
  methodName: "Add",
  service: Calculator,
  requestStream: false,
  responseStream: false,
  requestType: calculator_pb.AddRequest,
  responseType: calculator_pb.AddResponse
};

exports.Calculator = Calculator;

function CalculatorClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

CalculatorClient.prototype.add = function add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Calculator.Add, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.CalculatorClient = CalculatorClient;

