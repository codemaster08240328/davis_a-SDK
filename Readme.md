# The Lord of the Rings SDK
This SDK was designed for consuming the Lord of the Rings API. (Supports Typescript)
Check [here](https://the-one-api.dev/documentation#5)

## Why would use it?
To make it easy for developers to consume information about the trilogy

## Installation
Pretty easy! Just run:
```
npm install the_one_api-sdk
```

## How to use
- Need to get an api-key from [here](the-one-api.dev).
- Configure the SDK with the api-key you got.

```
import movie from 'the_one_api-sdk'

movie.configure('API-token')

movie.getMovies()
movie.getMovieById('movie-id')
movie.getQuote('movie-id')
```

## Pagination, Sorting and Filtering works as designed.
Check the `the-one-api` documentation.
https://the-one-api.dev/documentation#5