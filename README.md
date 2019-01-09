# LNK

A link shortener

## Setup

With current versions of Node.js and git installed:

```
git clone git@github.com:sirberus/LNK.git
npm i
npm run start
```

## Usage



## About

I built this in a night as a coding challenge!

### Application Architecture

The backend was built using [feathers](https://feathersjs.com/), a node server framework built on top of [express](https://expressjs.com/). I chose feathers because it's excellent for prototyping so I can get going quickly, it scales very nicely, and it has adapters for many different databases. For now we can use [NeDB](https://github.com/louischatriot/nedb) so that the full site is npm installable, minimizing setup. If needed, however, we could swap out the DB adapter for Mongo or Postgres without any refactoring of the application logic. Lastly, feathers has a wonderful CLI tool that makes it trivial to spin up working backends in seconds, *with unit tests ready to go*.

#### Creating the Backend

1) Install the [Feathers CLI tool](https://github.com/feathersjs/cli) with `npm i -g @feathersjs/cli`
2) Scaffold an app with `feathers generate app`

3) Scaffold an endpoint with `feathers generate service`. I named mine `links`. We only need a REST endpoint so I intentionally omitted websockets.

4) Scaffold a hook with `feathers generate hook`

5) Create the hook and wire it up

- check if a link has been shortened already, 
  - if so return the extant one instead
  - otherwise give it a special id to use for the short URL. I called mine `LNK`.
  - Make sure the LNK can work in a URL (I  used [base64url](https://www.npmjs.com/package/base64url) to ensure this)

6) Wire in the hook.

7) Create an express endpoint to handle looking up LNKs and redirecting. I put mine on `/L` to keep it all short.
