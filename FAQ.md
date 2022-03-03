### 1. Develop Questions

#### How the Dev-flow works?
```sh
# Install pnpm first
npm i pnpm -g

# Install common dependencies.
pnpm install

# In order to compat with pnpm, you need to install tslib for packages.
pnpm add tslib --filter '@booji/*' 

pnpm run dev
```

#### How the Git-flow works?
```sh
git add .

pnpm run commit

pnpm run semver

git push --follow-tags origin master

# then the Github Actions will be triggered
```

#### How to publish Booji to other npm registry?

Booji is now hosted at [My personal npm registry](http://82.156.31.69:4873/), if needed to publish Booji to other npm registry, please follow the steps below.(Ensure the `Github Actions` can publish package automatically)
```sh
# 1.change the npm registry by nrm (It's strongly recommended to use nrm)
nrm use npm

# 2.re-generate npm token
npm token create

# 3.Github Booji -> Settings -> Secrets -> Actions -> New repository secret -> { NPM_TOKEN: 're-generated token' }
```

### 2.Other Questions

#### Why Booji use pnpm?
- **Fast**: pnpm is up to 2x faster than the alternatives
- **Efficient**: Files inside node_modules are linked from a single content-addressable storage
- **Supports monorepos**: pnpm has built-in support for multiple packages in a repository
- **Strict**: pnpm creates a non-flat node_modules by default, so code has no access to arbitrary packages

#### Why not use `pnpm publish` but custom publish script? 

Also, pnpm has bug when use `pnpm publish`, see this [issue](https://github.com/pnpm/pnpm/issues/4129)


#### [ts-jest] Paths not being resolved. Cannot find module X from Y

see this [issue](https://github.com/kulshekhar/ts-jest/issues/269)