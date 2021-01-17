protoc calculator.proto --go_out=plugins=grpc:../server/calculatorpb/

protoc \
  --plugin="protoc-gen-ts=D:/Go/src/gitlab.com/venugopal_hegde/dairy-app-back-end/pkg/proto/node_modules/ts-protoc-gen/bin/protoc-gen-ts.cmd" \
  -I ./proto \
  --js_out=import_style=commonjs,binary:./ts/_proto \
  --ts_out=service=true:./ts/_proto \
  ./protos/calculator.proto