const Converter = require("convert-svg-to-png");
const http = require("http");

const converter = Converter.createConverter();

const server = http.createServer();
server.listen(8113);

let counter = 0;

server.on("request", function(req, res) {
  const id = counter++;
  console.time("Req start: " + id);
  const chunks = [];
  req
    .on("data", chunk => {
      chunks.push(chunk);
    })
    .on("end", async () => {
      const input = Buffer.concat(chunks);
      console.log("Rasterizing vector", input.toString("utf8"));
      try {
        const png = await converter.convert(input, {
          background: "#fff"
        });
        res.writeHead(200);
        res.end(png);
      } catch (err) {
        res.writeHead(500);
        res.end(err.stack);
      }
      console.timeEnd("Req start: " + id);
    });
});
