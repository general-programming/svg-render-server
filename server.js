const process = require("process");
const http = require("http");

const Sentry = require("@sentry/node");
const Converter = require("convert-svg-to-png");
const uuid = require("uuid");

// Initate Sentry if the environ is set.
if (process.env.SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_DSN
  });
}

const converter = Converter.createConverter();

const server = http.createServer();
server.listen(8113);

server.on("request", function(req, res) {
  const id = uuid.v4();
  const chunks = [];

  console.time("Req start: " + id);
  req
    .on("data", chunk => {
      chunks.push(chunk);
    })
    .on("end", async () => {
      const input = Buffer.concat(chunks);
      console.log("Start rasterizing vector");
      try {
        const png = await converter.convert(input, {
          background: "#fff"
        });
        res.writeHead(200);
        res.end(png);
      } catch (err) {
        Sentry.captureException(err);
        console.error(err);
        res.writeHead(500);
        res.end(err.stack);
      }
      console.timeEnd("Req start: " + id);
    });
});
