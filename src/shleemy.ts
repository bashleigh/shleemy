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

export class ShleemyInterval {
  readonly diff: number;
  readonly direction: "future" | "past" | "present";
  constructor(
    readonly first: Date,
    readonly toDate: Date,
    readonly rounding: "ceil" | "floor" = "floor",
    private readonly humanReadable?: {
      future?: (value: number, interval: TimeIntervalLabel) => string;
      past?: (value: number, interval: TimeIntervalLabel) => string;
    },
  ) {
    this.direction =
      first.getTime() < toDate.getTime()
        ? "past"
        : first.getTime() === toDate.getTime()
        ? "present"
        : "future";
    this.diff =
      this.direction === "future"
        ? Math.abs(first.getTime() - toDate.getTime())
        : Math.abs(first.getTime() - toDate.getTime());
  }

  get seconds(): number {
    return this.diff / IntervalValues.MILLISECONDS;
  }

  get roundedSeconds(): number {
    return Math[this.rounding](this.seconds);
  }

  get minutes(): number {
    return this.diff / (IntervalValues.MILLISECONDS * IntervalValues.SECONDS);
  }

  get roundedMinutes(): number {
    return Math[this.rounding](this.minutes);
  }

  get hours(): number {
    return (
      this.diff /
      (IntervalValues.MILLISECONDS *
        IntervalValues.SECONDS *
        IntervalValues.SECONDS)
    );
  }

  get roundedHours(): number {
    return Math[this.rounding](this.hours);
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

  get roundedDays(): number {
    return Math[this.rounding](this.days);
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

  get roundedWeeks(): number {
    return Math[this.rounding](this.weeks);
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

  get roundedMonths(): number {
    return Math[this.rounding](this.months);
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

  get roundedYears(): number {
    return Math[this.rounding](this.years);
  }

  get nearestInterval(): TimeIntervalLabel {
    let value;
    Object.values(TimeIntervalLabel).forEach(interval => {
      if (
        this[`rounded${interval[0].toUpperCase() + interval.substring(1)}`] > 0
      ) {
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
    const value = this[
      `rounded${
        fullIntervalName[0].toUpperCase() + fullIntervalName.substring(1)
      }`
    ];

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
