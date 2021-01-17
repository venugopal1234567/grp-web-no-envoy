import {grpc} from "@improbable-eng/grpc-web";
import {Calculator} from "../_proto/calculator_pb_service";
import {AddRequest, AddResponse} from "../_proto/calculator_pb";

const host = "http://localhost:9090";

function getBook() {
  const addRequest = new AddRequest();
  addRequest.setNum1(60929871);
  addRequest.setNum2(60929871);
  grpc.unary(Calculator.Add, {
    request: addRequest,
    host: host,
    onEnd: res => {
      const { status, statusMessage, headers, message, trailers } = res;
      console.log("add.onEnd.status", status, statusMessage);
      console.log("add.onEnd.headers", headers);
      if (status === grpc.Code.OK && message) {
        console.log("add.onEnd.message", message.toObject());
      }
      console.log("add.onEnd.trailers", trailers);
    }
  });
}

getBook();
