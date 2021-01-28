export enum TimeIntervalLabel {
  SECONDS = "seconds",
  MINUTES = "minutes",
  HOURS = "hours",
  DAYS = "days",
  WEEKS = "weeks",
  MONTHS = "months",
  YEARS = "years",
}

enum IntervalValues {
  MILLISECONDS = 1000,
  SECONDS = 60,
  DAYS = 24,
  WEEKS = 7,
  MONTHS = 30,
  YEARS = 365,
}

class ShleemyValue {
  constructor(readonly value: number, readonly interval: TimeIntervalLabel) {}

  get ceil () {
    return Math.ceil(this.value);
  };
  get floor () {
    return Math.floor(this.value);
  }

  toString = (): number => this.value;
  valueOf = (): number => this.value;
}

export class ShleemyInterval {
  readonly diff: number;
  readonly direction: "future" | "past" | "present";
  constructor(
    readonly first: Date,
    readonly second: Date,
    readonly rounding: "ceil" | "floor" = "floor",
    private readonly humanReadable?: {
      future?: (value: number, interval: TimeIntervalLabel) => string;
      past?: (value: number, interval: TimeIntervalLabel) => string;
    },
  ) {
    this.direction =
      first.getTime() < second.getTime()
        ? "past"
        : first.getTime() === second.getTime()
        ? "present"
        : "future";
    this.diff =
      this.direction === "future"
        ? Math.abs(first.getTime() - second.getTime())
        : Math.abs(first.getTime() - second.getTime());
  }

  get seconds(): ShleemyValue {
    return new ShleemyValue(this.diff / IntervalValues.MILLISECONDS, TimeIntervalLabel.SECONDS);
  }

  get minutes(): ShleemyValue {
    return new ShleemyValue(this.diff / (IntervalValues.MILLISECONDS * IntervalValues.SECONDS), TimeIntervalLabel.MINUTES);
  }

  get hours(): ShleemyValue {
    return new ShleemyValue((
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS)
    ), TimeIntervalLabel.HOURS);
  }

  get days(): ShleemyValue {
    return new ShleemyValue((
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS) /
      IntervalValues.DAYS
    ), TimeIntervalLabel.DAYS);
  }

  get weeks(): ShleemyValue {
    return new ShleemyValue((
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS) /
      IntervalValues.DAYS /
      IntervalValues.WEEKS
    ), TimeIntervalLabel.WEEKS);
  }

  get months(): ShleemyValue {
    return new ShleemyValue((
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS) /
      IntervalValues.DAYS /
      IntervalValues.MONTHS
    ), TimeIntervalLabel.MONTHS);
  }

  get years(): ShleemyValue {
    return new ShleemyValue((
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS) /
      IntervalValues.DAYS /
      IntervalValues.YEARS
    ), TimeIntervalLabel.YEARS);
  }

  get nearestInterval(): TimeIntervalLabel {
    let value;
    Object.values(TimeIntervalLabel).forEach(interval => {
      if (this[interval][this.rounding] > 0) {
        value = interval;
      }
    });
    return value;
  }

  static pluralInterval = (
    value: number,
    interval: TimeIntervalLabel,
  ): string =>
    value === 1 ? interval.substring(0, interval.length - 1) : interval;

  private toFutureHumanReadable = (
    value: number,
    interval: TimeIntervalLabel,
  ): string =>
    this.humanReadable && this.humanReadable.future
      ? this.humanReadable.future(value, interval)
      : `in ${
          value === 1
            ? interval === TimeIntervalLabel.HOURS
              ? "an"
              : "a"
            : value
        } ${ShleemyInterval.pluralInterval(value, interval)}`;

  private toPastHumanReadable = (
    value: number,
    interval: TimeIntervalLabel,
  ): string =>
    this.humanReadable && this.humanReadable.past
      ? this.humanReadable.past(value, interval)
      : `${
          value === 1
            ? interval === TimeIntervalLabel.HOURS
              ? "an"
              : "a"
            : value
        } ${ShleemyInterval.pluralInterval(value, interval)} ago`;

  get forHumans(): string {
    if (this.diff === 0 || this.direction === "present") {
      return "just now";
    }

    const fullIntervalName = this.nearestInterval;
    const value = this[fullIntervalName][this.rounding];

    return this.direction === "future"
      ? this.toFutureHumanReadable(value, fullIntervalName)
      : this.toPastHumanReadable(value, fullIntervalName);
  }

  toString(): string {
    return this.forHumans;
  }
}

const resolveDate = (date: string | Date) =>
  typeof date === "string" ? new Date(date) : date;

/**
 * Factory to build ShleemyInterval
 * @param date
 * @param options
 */
export const shleemy = (
  date: string | Date,
  options?: {
    toDate?: Date | string;
    rounding?: "ceil" | "floor";
    humanReadable?: {
      future?: (value: number, interval: TimeIntervalLabel) => string;
      past?: (value: number, interval: TimeIntervalLabel) => string;
    };
  },
): ShleemyInterval => {
  return new ShleemyInterval(
    resolveDate(date),
    resolveDate(options?.toDate || new Date()),
    options?.rounding,
    options?.humanReadable,
  );
};
