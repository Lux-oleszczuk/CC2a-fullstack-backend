import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import childPowerty from "./assets/child-poverty.json"
import economicInactivity from "./assets/economic-inactivity-rate.json"
import employmentRate from "./assets/employment-rate.json"
import { Rate } from "./types/data";

// create express app & choose port
const app = express();
const port = 3000;

let counter = 0;

// setup CORS to allow requests from any origin
const corsOptions = {
  origin: '*'
}
app.use(cors(corsOptions));

// setup JSON & body Parser
app.use(bodyParser.json()); // parse json requests
app.use(bodyParser.urlencoded({ extended: false })); // parse url encoded requests

// hello world response
app.get('/', (req, res) => {
  res.send({ message: 'Why do I have to suffer?!' })
})

app.get('/counter', (req, res) => {
  res.send({ counter })
})

app.post('/counter', (req, res) => {
  counter = req.body.counter;
  res.send({ message: 'This method has not been implemented yet' })
})

// http://localhost:3000/child_powerty?areaCode=1
app.get('/child_powerty', (req, res) => {

  let data: Rate[] = [];

  console.log(typeof req.query.year);

  if (req.query.year && (typeof req.query.year === 'string' || typeof req.query.year === 'number')) {
    for (let element of childPowerty) {
      if (element.Period.includes(req.query.year)) {
        data.push(element);
      }
    }
  }
  // res.send(`Search results for: ${req.query.year} ${data}`);
  res.send(data);
})

// http://localhost:3000/economic_inactivity?areaCode=1
app.get('/economic_inactivity', (req, res) => {

  let data: Rate[] = [];

  console.log(typeof req.query.year);

  if (req.query.year && (typeof req.query.year === 'string' || typeof req.query.year === 'number')) {
    for (let element of economicInactivity) {
      if (element.Period.includes(req.query.year)) {
        data.push(element);
      }
    }
  }
  // res.send(`Search results for: ${req.query.year} ${data}`);
  res.send(data);
})

// http://localhost:3000/employment_rate?areaCode=1
app.get('/employment_rate', (req, res) => {

  let data: Rate[] = [];

  console.log(typeof req.query.year);

  if (req.query.year && (typeof req.query.year === 'string' || typeof req.query.year === 'number')) {
    for (let element of employmentRate) {
      if (element.Period.includes(req.query.year)) {
        data.push(element);
      }
    }
  }
  // res.send(`Search results for: ${req.query.year} ${data}`);
  res.send(data);
})

// start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})