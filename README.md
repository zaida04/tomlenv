# `tomlenv`

[![GitHub](https://img.shields.io/github/license/zaida04/tomlenv)](https://github.com/zaida04/tomlenv/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/tomlenv?color=crimson&logo=npm)](https://www.npmjs.com/package/tomlenv)
[![CI workflows](https://github.com/zaida04/tomlenv/actions/workflows/ci.yml/badge.svg)](https://github.com/zaida04/tomlenv/actions/workflows/ci.yml)

## 🗒️ About

Read and inject environment variables from a .toml file. Inspired by [dotenv](https://www.npmjs.com/package/dotenv)

## 📥 Installation

You can install this package from [NPM](https://www.npmjs.com/package/tomlenv)

- `npm install tomlenv`
- `yarn add tomlenv`

## ⚡ Usage

### Unstructured env toml file

`.env.toml`

```toml
test = "TESTING_VAR_1"
test2 = "TESTING_VAR_2"
```

`index.js`

```typescript
import * as tomlenv from 'tomlenv';
tomlenv.config({ path: '../path/to/some/.env.toml' });

console.log(process.env);
/*
 {
    ...,
    test: "TESTING_VAR_1",
    test2: "TESTING_VAR_2"
 }
*/
```

### Structured env toml file

`.env.toml`

```toml
[env.prod]
test = "TESTING_VAR_1_PROD"
test2 = "TESTING_VAR_2_PROD"

[env.dev]
test = "TESTING_VAR_1_DEV"
test2 = "TESTING_VAR_2_DEV"
```

`index.js`

```typescript
import * as tomlenv from 'tomlenv';
tomlenv.config({ path: '../path/to/some/.env.toml', environment: 'dev' });

console.log(process.env);
/*
 {
    ...,
    test: "TESTING_VAR_1_DEV",
    test2: "TESTING_VAR_2_DEV"
 }
*/
```

## ✋ Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

Please ensure any and all commits pass our tests, linting, and build steps as described in the package.json. Our husky/commitlint commit hooks should take care of this for you automatically.

## ⚖️ LICENSE

Licensed under the [MIT License](https://github.com/zaida04/tomlenv/blob/main/LICENSE)
