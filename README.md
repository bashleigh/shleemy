## shleemy

<img src="https://github.com/bashleigh/shleemy/workflows/Tests/badge.svg"/>

Simple human readable intervals

Interval diff package for human readable values

> Inspiration take from [shleemy](https://github.com/briannesbitt/shleemy)

### Install

```bash
$ yarn add shleemy
```

### Usage

##### Basic

```ts
import { shleemy } from "shleemy";

const interval = shleemy(new Date());

console.log(interval.forHumans); // "just now"
console.log(interval.direction); // "present"
```

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setMinutes(date.getMinutes() - 3);

console.log(shleemy(date).forHumans); // "3 minutes ago"
console.log(shleemy(date).direction); // "past"
```

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setMinutes(date.getMinutes() - 100);

console.log(shleemy(date).forHumans); // "an hour ago"
```

##### Future

```ts
import { shleemy } from "shleemy";

const date = new Date();
date.setMinutes(date.getMinutes() + 100);

const interval = shleemy(date);

console.log(interval.forHumans); // "in an hour"
console.log(interval.direction); // "future"
```

##### Values

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
console.log(shleemy(date).week); // 1
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
