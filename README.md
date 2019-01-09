# LNK

A link shortener

### Setup

With current versions of Node.js and git installed:

```
git clone git@github.com:sirberus/LNK.git
npm i
npm run start
```

### About

This was built using [feathers](https://feathersjs.com/), a node server framework built on top of [express](https://expressjs.com/). I chose feathers because it's excellent for prototyping, it scales very nicely, and it has adapters for many different databases. For now we can use NeDB so that the full site is npm installable, minimizing setup. If needed though, we could swap out the DB adapter for Mongo or Postgres without any refactoring of the application logic.
