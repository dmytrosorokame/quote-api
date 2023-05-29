const express = require("express");

const { quotes } = require("../data");
const { getRandomElement } = require("../utils");

const quotesRouter = express.Router();

quotesRouter.get("/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);

  res.send({ quote: randomQuote });
});

quotesRouter.get("/", (req, res, next) => {
  const person = req.query.person;

  if (person) {
    const quotesByPerson = quotes.filter((quote) => quote.person === person);

    return res.send({ quotes: quotesByPerson });
  }

  res.send({ quotes });
});

quotesRouter.post("/", (req, res, next) => {
  const { quote, person } = req.query;

  console.log({ quote, person });

  if (!quote || !person) {
    return res.sendStatus(400);
  }

  const newQuote = {
    quote,
    person,
  };

  quotes.push(newQuote);

  res.send({ quote: newQuote });
});

module.exports = quotesRouter;
