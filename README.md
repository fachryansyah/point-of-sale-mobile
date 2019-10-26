# Pointzo : Point of sales app

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
[![Code](https://camo.githubusercontent.com/65f7d034f575d55d73f27883473847130e1ead2e/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f436f64652532305374796c652d5374616e646172642d79656c6c6f772e737667)](https://standardjs.com)


<p align="center">
    <img title="dashboard" src="https://i.ibb.co/mCtpv5S/demo-pointzo.gif" />
</p>

## Table Of Contents

*  [Intro](#Intro)
*  [Requirments](#Requirments)
*  [Related Projects](#Related-Projects)
*  [Dependencies](#Dependencies)
    *  [Clone Repo](#Clone-Repo)
    *  [Install Depedencies](#Install-Depedencies)
    *  [Setup Environment](#Setup-Environment)
    *  [Run server development](#Run-server-development)
    *  [Build For Production](#Build-For-Production)
* [Dependencies](#Dependencies)
* [License](#License)
___
### Intro

This is a simple point of sales web application made with reactjs, Argon ui kit with beautiful design.

[Demo](http://pointzoo.zeblogic.com)

___
### Features
- [x] Manage Product (CRUD)
- [x] Chart statistics of Revenue
- [x] Fancy UI Design
- [x] Smooth animation UI
- [x] Simple Add to cart
- [x] Order product
- [x] History of order
- [x] Authentication with JWT
___
### Requirments

* [Nodejs](https://nodejs.org/en/) v10 LTS version
* [Npm](https://www.npmjs.com/get-npm) package / [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) package
___

### Related Projects
This project is related to several platforms

* Backend [https://github.com/fachryansyah/point-of-sale-backend](https://github.com/fachryansyah/point-of-sale-backend)
* Android App [https://github.com/fachryansyah/point-of-sale-mobile](https://github.com/fachryansyah/point-of-sale-mobile)
___

### Installation

##### 1. Clone Repo
clone the repository

```sh
$ git clone https://github.com/fachryansyah/point-of-sale-frontend
$ cd point-of-sale-frontend
```

##### Install Depedencies
Install requirement depedencies

```sh
$ npm install
```

##### Setup Environment
Before start server development or build for production, you should create new .env file, edit BASE_URL_API variable to backend server. you can found the backend server here.. [https://github.com/fachryansyah/point-of-sale-backend](https://github.com/fachryansyah/point-of-sale-backend)

```sh
BASE_URL_API=<Backend-api-url>
```

##### Run server development
if you want start on development mode.

```sh
$ npm start
```

##### Build For Production
build for production ready, and host ready

```sh
$ npm run build
```
___

### Dependencies

List of depedencies using in this project

| Plugin | Description |
| ------ | ------ |
| [ReactJS](https://reactjs.org) | JavaScript library for building user interfaces |
| [Axios](https://github.com/axios/axios) | HTTP client for request API |
| [Bootstrap](https://getbootstrap.com) | CSS Framework |
| [Chart.js](https://www.chartjs.org) | For Report Statistics |
| [Moment](https://momentjs.com) | Manipulate time |
| [Redux](https://redux.js.org) | Global State Management |
| [Redux Promise Middleware](https://www.npmjs.com/package/redux-promise-middleware) | Promise handler for react redux |
| [React Shimmer Effect](https://www.npmjs.com/package/react-shimmer-effect) | Create Shimmer Effect when Loading |
| [React Toastify](https://www.npmjs.com/package/react-toastify) | Show Notify in React App |


License
----

MIT


@2019 - Fahriansyah
