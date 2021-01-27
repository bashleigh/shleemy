## Carbon dating

Simple human readable intervals

Interval diff package for human readable values

> Inspiration take from Carbon::Carbon

### Install

```bash
$ yarn add carbon-dating
```

### Usage

##### Basic

```ts
import { carbon } from "carbon-dating";

const interval = carbon(new Date());

console.log(interval.forHumans); // "just now"
console.log(interval.direction); // "present"
```

```ts
import { carbon } from "carbon-dating";

const date = new Date();
date.setMinutes(date.getMinutes() - 3);

console.log(carbon(date).forHumans); // "3 minutes ago"
console.log(carbon(date).direction); // "past"
```

```ts
import { carbon } from "carbon-dating";

const date = new Date();
date.setMinutes(date.getMinutes() - 100);

console.log(carbon(date).forHumans); // "an hour ago"
```

##### Future

```ts
import { carbon } from "carbon-dating";

const date = new Date();
date.setMinutes(date.getMinutes() + 100);

const interval = carbon(date);

console.log(interval.forHumans); // "in an hour"
console.log(interval.direction); // "future"
```

##### Values

```ts
import { carbon } from "carbon-dating";

const date = new Date();
date.setHours(date.getHours() - 3);

console.log(carbon(date).days); // 3
```

```ts
import { carbon } from "carbon-dating";

const date = new Date();
date.setDays(date.getDays() - 12);

console.log(carbon(date).days); // 12
console.log(carbon(date).week); // 1
```

### Options

#### From date

default: `new Date()` (from now)

```ts
import { carbon } from "carbon-dating";

const date = new Date();
date.setDays(date.getDays() - 12);

const start = new Date();
start.setDats(start.getDays() - 20);

console.log(
  carbon(date, {
    from: start,
  }).days
); // 8
```
