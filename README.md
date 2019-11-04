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

This is a simple point of sales android application made with React Native, and Ui kitten with beautiful design.

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
* [Android SDK](https://developer.android.com/studio#downloads)
* [Npm](https://www.npmjs.com/get-npm) package / [Yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable) package
___

### Related Projects
This project is related to several platforms

* Backend [https://github.com/fachryansyah/point-of-sale-backend](https://github.com/fachryansyah/point-of-sale-backend)
* Web App [https://github.com/fachryansyah/point-of-sale-frontend](https://github.com/fachryansyah/point-of-sale-frontend)
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
Before project development or build for production, you should create new .env file, edit BASE_URL_API variable to backend server. you can found the backend server here.. [https://github.com/fachryansyah/point-of-sale-backend](https://github.com/fachryansyah/point-of-sale-backend)

```sh
BASE_URL_API=<Backend-api-url>
```

##### Run on android device
if you want start on development mode.

```sh
$ react-native run android
```

##### Run on ios device
if you want start on development mode.

```sh
$ react-native run ios
```

##### Build For Production
build for production ready, and host ready

```sh
$ cd android && ./gradlew --assembleRelease
```
___

### Dependencies

List of depedencies using in this project

| Plugin | Description |
| ------ | ------ |
| [React Native](https://facebook.github.io/react-native/) | Mobile Apps Framework |
| [Axios](https://github.com/axios/axios) | HTTP client for request API |
| [Ui Kitten](https://akveo.github.io/react-native-ui-kitten/) | Ui Kit |
| [Chart Kit](https://www.npmjs.com/package/react-native-chart-kit) | Chart Statistic |
| [Moment](https://momentjs.com) | Manipulate time |
| [Redux](https://redux.js.org) | Global State Management |
| [Redux Promise Middleware](https://www.npmjs.com/package/redux-promise-middleware) | Promise handler for react redux 

License
----

MIT


@2019 - Fahriansyah
