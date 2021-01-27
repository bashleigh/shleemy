enum TimeIntervalValue {
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
  MONTHS = 21,
  YEARS = 365.25,
}

export class CarbonInterval {
  readonly diff: number;
  constructor(readonly first: Date, readonly second: Date) {
    this.diff = Math.abs(first.getTime() - second.getTime());
  }

  get seconds(): number {
    return this.diff / IntervalValues.MILLISECONDS;
  }

  get minutes(): number {
    return this.diff / (IntervalValues.MILLISECONDS * IntervalValues.SECONDS);
  }

  get hours(): number {
    return (
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS)
    );
  }

  get days(): number {
    return (
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS) /
      IntervalValues.DAYS
    );
  }

  get weeks(): number {
    return (
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS) /
      IntervalValues.DAYS /
      IntervalValues.WEEKS
    );
  }

  get months(): number {
    return (
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS) /
      IntervalValues.DAYS /
      IntervalValues.MONTHS
    );
  }

  get years(): number {
    return (
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS) /
      IntervalValues.DAYS /
      IntervalValues.YEARS
    );
  }

  get nearestInterval(): TimeIntervalValue {
    let value;
    Object.values(TimeIntervalValue).forEach(interval => {
      if (Math.floor(this[interval]) > 0) {
        value = interval;
      }
    });
    return value;
  }

  get forHumans(): string {
    if (this.diff === 0) {
      return "just now";
    }

    const fullIntervalName = this.nearestInterval;
    const value = Math.floor(this[fullIntervalName]);
    const intervalName =
      value === 1
        ? fullIntervalName.substring(0, fullIntervalName.length - 1)
        : fullIntervalName;

    return `${
      value === 1
        ? fullIntervalName === TimeIntervalValue.HOURS
          ? "an"
          : "a"
        : value
    } ${intervalName} ago`;
  }
}

const resolveDate = (date: string | Date) => typeof date === 'string' ? new Date(date) : date;

export const carbon = (
  date: string | Date,
  options?: { from: Date | string }
): CarbonInterval => {
  return new CarbonInterval(resolveDate(date) , resolveDate(options?.from || new Date()));
};
