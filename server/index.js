import express from "express";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import fs from "fs";
import App from "../src/app";
import { render } from "react-dom";

const PORT = process.env.PORT || 3000;
const html = fs.readFileSync("dist/index.html").toString();
const parts = html.split("Not Rendered");

const app = express();

app.use("/dist", express.static("dist"));
app.use((req, res) => {
  res.write(parts[0]);
  const staticContext = {};
  const reactMarkup = (
    <StaticRouter url={req.url} context={staticContext}>
      <App />
    </StaticRouter>
  );

  const stream = renderToNodeStream(reactMarkup);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.status(staticContext.statusCode || 200);
    res.write(parts[1]);
    res.end();
  });
});

console.log(`Listening on port ${PORT}`);
app.listen(PORT);
