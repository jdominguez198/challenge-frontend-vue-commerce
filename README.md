# Challenge Frontend VueJS - Commerce

## Introduction

This is a challenge for a Senior VueJS Frontend Developer. The requirements for complete the test
are [here](https://gist.github.com/angelcustodio/30fc3e31ba6b5c6bc9c049655af508e0).

Instead of using the Movie Database API, I've preferred to use Pokemon TCG cause it has a better
item organization (with images on its categories) and has item prices too. You can setup a 
free account to get the Token [here](https://dev.pokemontcg.io/).

## Stack Used

I've used NuxtJS as "framework" to group all the requirements and avoid wasting time configuring
the libraries separately.

NuxtJS includes out-of-the-box:
- Vue 2.6
- webpack 4
- vuex
- vue-router
- vue-meta
- Static site generator / SSR

## Getting started

You must have a `.env` file in the root folder with the `API_TOKEN` variable.

### Install dependencies

```bash
$ yarn install
```

### Run in development mode

```bash
$ yarn dev
```

### Run unit tests

```bash
$ yarn test
```

### Generate static site (JAMStack)

```bash
$ yarn generate
```

## Notes

### Time

I've spent a few days working with this repository. The application could have infinite evolutions,
so I've decided to stop in the point where I think it's enough to show my developer expertise.

### Missing parts / Unfinished parts

From the challenge requirements, there is only a few things I've not made or completed:
- Infinite scrolling => It's quite simple to add a button with a "more items" action to fetch the
  following pages, replacing the template in the `Pagination` component. If also you want to make it
  with the scrolling event, using the `IntersectionObserver` will trigger the actions. The main
  reason why I've not implemented it's because for SSR and SSG you must handle the query parameters
  and make all the fetchs from the first page to the queried, and I thought it was too much time to spend.
- More unit tests => The unit tests made are not enough. I've made at least one of all components, and
  one for all mutations in all stores. Making more tests will improve the isolation of the components
  and the stores.
- e2e tests => My idea was leave time for the end of the challenge to include some e2e tests using
  Cypress, but I should use another day extra to have a few meaningful tests and I prefer to stop here.

### Challenge features

The application is almost a fully working ecommerce (no checkout and no user management, obviously),
and it's able to be generated as fully static site (JAMStack). In fact, you can check 
[on Netlify](https://jdom-challenge-frontend-vue-commerce.netlify.app) the application. It is connected
directly with this repository and build the site with any code change on master branch.

I've used TypeScript on the State, but I should spend more time with interfaces on data models to
ensure the data managed in the whole application complies with the model specifications. For now, I've
used just for a few formatters (my idea was to create some factories).

The cart is persisted on the localStorage to allow a user to keep its items to "purchase them" at any
time.

I've used the `keep-alive` component to cache the requests and earn as max bandwidth as possible.
It is set with a max of 10 pages, just as an example.

Also, as a Commerce usually needs, I've added a Breadcrumbs component for the categories and item detail
pages so the user won't be loose browsing the application. Also, I've added a few structured data
from `Schema.Org`. On future evolutions, it could be improved by isolating the components and use
more enriched data.

The styling of the application is very basic (my skills on designing are minimal, as you can see),
using SCSS and a few css-variables. Some styles could be unified for using includes or extends, and
some other properties values could be moved to css-variables too. As I said, the application could
have infinite evolutions.

Any feedback will be welcomed!
