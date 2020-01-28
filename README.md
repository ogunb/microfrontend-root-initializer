# Micro-frontend Root App Demo

Fetch repos, install dependencies and serve projects concurrently with one command.

`yarn start $PROJECT_NAMES`

`yarn start dashboard threejs excel`

Just `yarn start` runs all workspace projects.

## Implementing new repos

```js
const DOMAINS = {
    ...
    product: {
        local: '/product',
        remote: 'remote/product',
        scripts: {
            serve: 'serve:product'
        }
    },
    ...
};
```

- Add your repo to DOMAINS constant under `init.js`.
- Local property is the folder your repo will be fetched to.
- Remove property is remote url of your repo, either ssh or http.
- Scripts contains the scripts you may run on the repo. Might want to change to and array or string depending on your needs.
- Add your repo to workspaces under `package.json`. It should be same with your local property(local folder name).
