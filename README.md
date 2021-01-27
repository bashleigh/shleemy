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
import {carbon} from 'carbon-dating';

console.log(carbon(new Date()).forHumans); // "just now"
```

```ts
import {carbon} from 'carbon-dating';

const date = new Date();
date.setMinutes(date.getMinutes() - 3);

console.log(carbon(new Date()).forHumans); // "3 minutes ago"
```

```ts
import {carbon} from 'carbon-dating';

const date = new Date();
date.setMinutes(date.getMinutes() - 100);

console.log(carbon(new Date()).forHumans); // "an hour ago"
```

##### Values
```ts
import {carbon} from 'carbon-dating';

const date = new Date();
date.setHours(date.getHours() - 3);

console.log(carbon(date).days); // 3
```

```ts
import {carbon} from 'carbon-dating';

const date = new Date();
date.setDays(date.getDays() - 12);

console.log(carbon(date).days); // 12
console.log(carbon(date).week); // 1
```
