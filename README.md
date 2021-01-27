## shleemy
<p>
  <img src="https://github.com/bashleigh/shleemy/workflows/Tests/badge.svg" alt="test badge"/>
  <a href="https://www.npmjs.com/package/shleemy"><img src="https://img.shields.io/npm/v/shleemy.svg"/></a>
</p>
<p align="center">
  <a target="_blank" href="https://rickandmorty.fandom.com/wiki/Shleemypants">
    <img width="150" src="https://static.wikia.nocookie.net/rickandmorty/images/4/4d/Shleemy.png/revision/latest/scale-to-width-down/310?cb=20190830174941" alt="shleemypants"/>
  </a>
</p>

Simple human readable intervals

Interval diff package for human readable values


> Inspiration take from [Carbon](https://github.com/briannesbitt/carbon)

### Install

```bash
$ yarn add shleemy
```

Or 

```npm
$ npm i shleemy
```

### Usage

##### Basic

Get human readable values with direction information

**Present**
```ts
import { shleemy } from "shleemy";

const interval = shleemy(new Date());

console.log(interval.forHumans); // "just now"
console.log(interval.direction); // "present"
```
**Past**
```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setMinutes(date.getMinutes() - 3);

console.log(shleemy(date).forHumans); // "3 minutes ago"
console.log(shleemy(date).direction); // "past"
```
**Future**
```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setMinutes(date.getMinutes() + 70);

console.log(shleemy(date).forHumans); // "in an hour"
console.log(shleemy(date).direction); // "future"
```

##### interval values

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setHours(date.getHours() - 3);

console.log(shleemy(date).days); // 3
```

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setDays(date.getDays() - 12);

console.log(shleemy(date).days); // 12
console.log(shleemy(date).weeks); // 1
```
**Available options**

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setDays(date.getDays() - 12);
const interval = shleemy(date);

console.log('seconds', interval.seconds);
console.log('minutes', interval.minutes);
console.log('hours', interval.hours);
console.log('days', interval.days);
console.log('weeks', interval.weeks);
console.log('months', interval.months);
console.log('years', interval.years);
console.log('direction', interval.direction);
```

### Options

#### From date

default: `new Date()` (from now)

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setDays(date.getDays() - 12);

const start = new Date();
start.setDats(start.getDays() - 20);

console.log(
  shleemy(date, {
    from: start,
  }).days
); // 8
```
