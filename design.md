# How to design
- The sdk is designed to consume the `the-one-api` V2. (https://the-one-api.dev/)

- It supports Typescript for TS users.

- Using axios global configuration feature, I set the auth header before using the SDK, like:
```
SDK.configure('api-token')
```

## Dependencies
1. Axios
2. Jest