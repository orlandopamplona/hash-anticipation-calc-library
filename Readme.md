![Logo of the project](./logo.png)

# Hash Library Challenge - This project presents the construction of a library using only javascript to perform the advance calculation of installments in a given sale.

The project does not use any features like Reatc, Vue, Angular, Polymer, etc. Only Javascript with Polyfill is used.

The following methods are available:

> - ## calcHashAnticipationDefault
Performs the default calculation for the advance periods previously defined on the later day, 15, 30, and 90 days.
- **Call Example:**
calcHashAnticipationDefault(3, 4, 150)
calcHashAnticipationDefault(installments, mdrPercentage, grossValue)
* installments - Identifies the number of installments to be considered in the calculation.
* mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
* grossValue - Amount of the total over which the anticipation will be applied.
- **Return Example:**
```json
 [
   { anticipationDate: "tomorrow", discountedInstallment: "132.67" },
   { anticipationDate: "15 days", discountedInstallment: "135.36" },
   { anticipationDate: "30 days", discountedInstallment: "138.24" },
   { anticipationDate: "90 days", discountedInstallment: "144.00" } 
 ]
```

> - ## calcGenericAnticipationToObject
Performs the calculation for any advance date, displaying the result in the structure of an object, only for the requested period.
- **Call Example:**
calcGenericAnticipationToObject(3, 4, 150, 15)
calcGenericAnticipationToObject(installments, mdrPercentage, grossValue, numberOfDays)
* installments - Identifies the number of installments to be considered in the calculation.
* mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
* grossValue - Amount of the total over which the anticipation will be applied.
* numberOfDays - Specifies the period (number of days) that will be used as a reference for the anticipation calculation.
- **Return Example:**
```json
 [
 { anticipationDate: 15, discountedInstallment: "135.36" }
]
```

> - ## calcGenericAnticipationToNumber
Performs the calculation for any advance date, returning the result in numeric format.
- **Call Example:**
calcGenericAnticipationToNumber(3, 4, 150, 15)
calcGenericAnticipationToObject(installments, mdrPercentage, grossValue, numberOfDays)
* installments - Identifies the number of installments to be considered in the calculation.
* mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
* grossValue - Amount of the total over which the anticipation will be applied.
* numberOfDays - Specifies the period (number of days) that will be used as a reference for the anticipation calculation.
- **Return Example:**
```javascript
 135.36
```

> - ## calcGenericAnticipationToNumber
Performs the calculation of a value subtracted from a certain percentage by returning an object with information of the original value, the discount percentage, and the amount already discounted.
- **Call Example:**
calcDiscountPercentage(10, 150)
calcDiscountPercentage(mdrPercentage, grossValue)
* mdrPercentage - Identifies the MDR percentage that will be used to calculate the discount.
* grossValue - Amount of the total over which the anticipation will be applied.
- **Return Example:**
```json
[
 { originalValue: 150, percentage: 10, discountedValue: 135 }
]
```


## Installing / Getting started

To start in your node server:

- Instal Node.js, [see instructions](https://nodejs.org/en/download/)

- To start your Node server:

  * Install dependencies with:
   `npm install`
  * Generate library in / lib directory:
   `npm run build`
  * To use in your project perform the following import:
```javascript
import {
    calcGenericAnticipationToNumber,
    calcHashAnticipationDefault,
    calcDiscountPercentage,
    calcGenericAnticipationToJson
} from 'hash-anticipation-calc-library'
```
## Developing

### Built With

The following dependencies were used:
```bash
    "devDependencies": {
    "@babel/core": "^7.3.4",
    "@babel/plugin-proposal-class-properties": "^7.3.4",
    "@babel/preset-env": "^7.3.4",
    "babel-eslint": "^10.0.1",
    "babel-loader": "^8.0.5",
    "eslint": "^5.15.0",
    "eslint-config-standard": "^12.0.0",
    "eslint-plugin-import": "^2.16.0",
    "eslint-plugin-node": "^8.0.1",
    "eslint-plugin-promise": "^4.0.1",
    "eslint-plugin-standard": "^4.0.0",
    "jest": "^24.1.0",
    "webpack": "^4.29.6",
    "webpack-cli": "^3.2.3"
  }
  "dependencies": {
    "@babel/plugin-transform-arrow-functions": "^7.7.4",
    "@babel/plugin-transform-runtime": "^7.7.4",
    "@babel/polyfill": "^7.7.0",
    "@babel/runtime": "^7.7.6"
  }
```
All of which are automatically installed with the command:
```shell
npm install
```

### Prerequisites
What is needed to set up the dev environment.

- Instal Node.js, [see instructions](https://nodejs.org/en/download/)


### Setting up Dev

Here's a brief intro about what a developer must do in order to start developing
the project further:

```shell
git clone https://github.com/orlandopamplona/hash-anticipation-calc-library
cd hash-anticipation-calc-library
npm install
npm run build
```

### Deploying / Publishing

```shell
npm run build
```

Its library is already available in the npm repository to install using:
```shell
npm install hash-anticipation-calc-library
```

## Running tests

Run the following command:
```shell
npm run test
```
The tests were implemented using [jest](https://jestjs.io/pt-BR/)