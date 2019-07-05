# Farol Components for AngularJS

## Install

### Using Bower

- To install or update run

```
bower install angular-farol-components#1.1.15 -S -F
```

### Using NPM

- To install run ```
  npm install angular-farol-components

````

- To update run ```
  npm update angular-farol-components

````

## Develop

In order to develop the Farol Components for AngularJS we recommend that you first read the subsection based on the package manager you are using:

In order to debug use `gulp debug` task. Read more bellow in _building_ section.

### Bower

Use `bower link` in the SDK project repository in order to store the link name and path in Bower.

On the project used to develop the library you can run `bower link angular-farol-components` and it will start using the development version from your SDK.

If you decide to rollback to the production version of the library you shall remember to run `bower unlink angular-farol-components` and run the installation step again.

### NPM

Use `npm link` in the SDK project repository in order to store the link name and path in NPM.

On the project used to develop the library you can run `npm link angular-farol-components` and it will start using the development version from your SDK.

## Build

We use gulp in order to build the Farol SDK for JavaScript. There are two different tasks that you can call from your terminal:

- `gulp` will build the production version
- `gulp debug` will build the debug version but will not uglify the code

## Publish

In order to release a new version you shall follow the steps bellow:

1. Make the desired changes;
2. Update CHANGELOG.md file;
3. Commit your changes;
4. Run the commands below:

- Run the following command choosing among major/minor/patch version in the {{SEMVER}} variable:

```
npm version {{SEMVER}}
```
