# Pauper API

> MTG pauper cards API

## Development

- Clone the repo

```bash
$ git clone https://github.com/matalmeida/pauper-api.git
```

- Install dependencies

```bash
$ yarn
```

- Run scripts

| Action                 | Usage        |
| ---------------------- | ------------ |
| Start development mode | `yarn dev`   |
| Start production mode  | `yarn start` |
| Lint code              | `yarn lint`  |

## Environment

```yaml
# .env file
PORT=3000
```

## Endpoints

| Method | Endpoint                 | Description                                    |
| ------ | ------------------------ | ---------------------------------------------- |
| GET    | `/`                      | Get OK message                                 |
| GET    | `/cards`                 | Get first page Pauper Legal Cards              |
| GET    | `/cards?page=x`          | Get xth page of Pauper Legal Cards             |
| GET    | `/cards/:name`           | Get card with certain name                     |
| GET    | `/cards/autocomplete/:q` | Get autocomplete cards with certain `query(q)` |

## Author

[Matheus Almeida](https://twitter.com/mat_almeida)
