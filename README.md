## shleemy
<p>
  <img src="https://github.com/bashleigh/shleemy/workflows/Tests/badge.svg" alt="test badge"/>
  <a href="https://www.npmjs.com/package/shleemy"><img src="https://img.shields.io/npm/v/shleemy.svg"/></a>
  <a href='https://coveralls.io/github/bashleigh/shleemy?branch=master'><img src='https://coveralls.io/repos/github/bashleigh/shleemy/badge.svg?branch=master' alt='Coverage Status' /></a>
</p>

<p>Simple human readable intervals for those that don't want to go to time prison.</p>
<p>Handy interval diff object for customisable, rounded, human readable phrases such as "in 3 days", "12 years ago", "a minute ago".</p>

<p align="center">
  <a target="_blank" href="https://rickandmorty.fandom.com/wiki/Shleemypants">
    <img align="right" width="150" src="https://static.wikia.nocookie.net/rickandmorty/images/4/4d/Shleemy.png/revision/latest/scale-to-width-down/310?cb=20190830174941" alt="shleemypants"/>
  </a>

   - Small
   - Mighty 
   - No dependencies
   - Easy to use
   - You won't got to time prison for messing with time
</p>

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

Get human readable values with tense information

**Present**
```ts
import { shleemy } from "shleemy";

const interval = shleemy(new Date());

console.log(interval.forHumans); // "just now"
console.log(interval.tense); // "present"
```
**Past**
```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setMinutes(date.getMinutes() - 3);

console.log(shleemy(date).forHumans); // "3 minutes ago"
console.log(shleemy(date).tense); // "past"
```
**Future**
```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setMinutes(date.getMinutes() + 70);

console.log(shleemy(date).forHumans); // "in an hour"
console.log(shleemy(date).tense); // "future"
```

##### interval values

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setHours(date.getHours() - 3);

console.log(shleemy(date).hours); // 3
```

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setDays(date.getDays() - 12);

console.log(shleemy(date).days); // 12
console.log(shleemy(date).weeks); // 1
```

### Output manipulation

The Shleemy object can be used as a string! 

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setDays(date.getDays() - 12);

const interval = shleemy(date);

console.log(`added ${interval}`); // added 12 days ago;
console.log(`${interval.replace('days', 'yonders')}`); // 12 yonders ago;
```

**Available properties**

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setDays(date.getDays() - 12);
const interval = shleemy(date);

console.log('seconds', interval.seconds);
console.log('rounded seconds', interval.roundedSeconds);
console.log('minutes', interval.minutes);
console.log('rounded minutes', interval.roundedMinutes);
console.log('hours', interval.hours);
console.log('rounded hours', interval.roundedHours);
console.log('days', interval.days);
console.log('rounded days', interval.roundedDays);
console.log('weeks', interval.weeks);
console.log('rounded weeks', interval.roundedWeeks);
console.log('months', interval.months);
console.log('rounded months', interval.roundedMonths);
console.log('years', interval.years);
console.log('rounded years', interval.roundedYears);
console.log('tense', interval.tense);
```
> All properties will be positive values. You cannot have -3 days in the 4th dimension. Use `tense` for past/present/future value

### Options

```ts
import { shleemy, ShleemyInterval } from "shleemy";

const date = new Date();
date.setDays(date.getDays() - 12);

const toDate = new Date();
toDate.setDats(toDate.getDays() - 20);

console.log(
  shleemy(date, {
    toDate: toDate, // default: new Date() (now)
    rounding: 'ceil', // default: floor
    humanReadable: {
      past: (value, interval) => `${value} ${ShleemyInterval.pluralInterval(value, interval)} yonders ago`, // default: ShleemyInterval.toHumanReadablePast
      future: (value, interval) => `in ${value} ${ShleemyInterval.pluralInterval(value, interval)} and you get the idea`, // default: ShleemyInterval.toHumanReadableFuture
    }
  }).days
); // 8
```