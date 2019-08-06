# get-generation

![Travis](https://travis-ci.org/jcguarinpenaranda/get-generation.svg?branch=master)

This module returns the generation of a person, given it's birth year

For example, if a person was born in 2000, it would say that he/she is from the Generation Z

## Installation

``` npm i --save get-generation ```

## Generations available
* Traditionalist < 1946
* Older Boomer < 1955
* Younger Boomer < 1965
* Generation X (older) < 1971
* Generation X (younger) < 1981
* Generation Y < 1996
* Generation Z < 2011
* Generation Alpha (now) // 2018


## Usage

``` js
import { getGenerationByAge, getGenerationByYear, getAllGenerationsInfo } from "get-generation";

getGenerationByYear(1954) // Older Boomer
getGenerationByYear(2011) // Generation Alpha
getGenerationByAge(20) // Generation Z (as of 2018)

getAllGenerationsInfo();
/* returns
[{
    name: 'Traditionalist',
    range: {
      min: 0,
      max: 1954,
    },
  }, {
    name: 'Older Boomer',
    ....
  }
]
*/
```

## Creator
Juan Camilo Guarín Peñaranda
Cali, Colombia

## License
MIT.

## Bibliography
* According to: [Boston College](http://www.bc.edu/content/dam/files/research_sites/agingandwork/pdf/publications/RH06_Age_Generations.pdf)
* And: [Carreer planner] (https://www.careerplanner.com/Career-Articles/Generations.cfm)