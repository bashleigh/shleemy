import { shleemy } from "./shleemy";

describe("shleemyInterval", () => {
  describe("past", () => {
    it("just now", () => {
      const result = shleemy(new Date()).forHumans;

      expect(result).toBe("just now");
    });

    it("seconds", () => {
      const date = new Date();
      date.setSeconds(new Date().getSeconds() - 20);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("20 seconds ago");
    });

    it("minutes", () => {
      const date = new Date();
      date.setMinutes(new Date().getMinutes() - 20);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("20 minutes ago");
    });

    it("minute", () => {
      const date = new Date();
      date.setMinutes(new Date().getMinutes() - 1);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("a minute ago");
    });

    it("hours", () => {
      const date = new Date();
      date.setHours(new Date().getHours() - 20);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("20 hours ago");
    });

    it("hour", () => {
      const date = new Date();
      date.setHours(new Date().getHours() - 1);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("an hour ago");
    });

    it("day", () => {
      const date = new Date();
      date.setDate(new Date().getDate() - 1);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("a day ago");
    });

    it("days", () => {
      const date = new Date();
      date.setDate(new Date().getDate() - 4);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("4 days ago");
    });

    it("week", () => {
      const date = new Date();
      date.setDate(new Date().getDate() - 8);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("a week ago");
    });

    it("weeks", () => {
      const date = new Date();
      date.setDate(new Date().getDate() - 15);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("2 weeks ago");
    });

    it("month", () => {
      const date = new Date();
      date.setDate(new Date().getDate() - 32);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("a month ago");
    });

    it("months", () => {
      const date = new Date();
      date.setDate(new Date().getDate() - 67);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("2 months ago");
    });

    it("year", () => {
      const date = new Date();
      date.setFullYear(new Date().getFullYear() - 1);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("a year ago");
    });

    it("years", () => {
      const date = new Date();
      date.setFullYear(new Date().getFullYear() - 2);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("2 years ago");
    });
  });

  describe("future", () => {
    it("just now", () => {
      const result = shleemy(new Date()).forHumans;

      expect(result).toBe("just now");
    });

    it("seconds", () => {
      const date = new Date();
      date.setSeconds(new Date().getSeconds() + 20);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in 20 seconds");
    });

    it("minutes", () => {
      const date = new Date();
      date.setMinutes(new Date().getMinutes() + 20);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in 20 minutes");
    });

    it("minute", () => {
      const date = new Date();
      date.setMinutes(new Date().getMinutes() + 1);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in a minute");
    });

    it("hours", () => {
      const date = new Date();
      date.setHours(new Date().getHours() + 20);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in 20 hours");
    });

    it("hour", () => {
      const date = new Date();
      date.setHours(new Date().getHours() + 1);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in an hour");
    });

    it("day", () => {
      const date = new Date();
      date.setDate(new Date().getDate() + 1);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in a day");
    });

    it("days", () => {
      const date = new Date();
      date.setDate(new Date().getDate() + 4);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in 4 days");
    });

    it("week", () => {
      const date = new Date();
      date.setDate(new Date().getDate() + 8);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in a week");
    });

    it("weeks", () => {
      const date = new Date();
      date.setDate(new Date().getDate() + 15);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in 2 weeks");
    });

    it("month", () => {
      const date = new Date();
      date.setDate(new Date().getDate() + 32);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in a month");
    });

    it("months", () => {
      const date = new Date();
      date.setDate(new Date().getDate() + 67);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in 2 months");
    });

    it("year", () => {
      const date = new Date();
      date.setFullYear(new Date().getFullYear() + 1);
      date.setHours(new Date().getHours() + 48);

      console.log(
        date,
        shleemy(new Date(date.getTime())).years,
        shleemy(new Date(date.getTime())).months
      );

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in a year");
    });

    it("years", () => {
      const date = new Date();
      date.setFullYear(new Date().getFullYear() + 2);

      const result = shleemy(new Date(date.getTime())).forHumans;

      expect(result).toBe("in 2 years");
    });
  });
  describe("start", () => {
    it("future", () => {
      const date = new Date();
      date.setFullYear(new Date().getFullYear() + 2);
      const toDate = new Date();
      toDate.setFullYear(new Date().getFullYear() - 3);

      const interval = shleemy(date, {
        toDate,
      });

      expect(interval.forHumans).toBe("in 5 years");
      expect(interval.direction).toBe('future');
    });

    it("past", () => {
      const date = new Date();
      date.setFullYear(new Date().getFullYear() + 2);
      const toDate = new Date();
      toDate.setFullYear(new Date().getFullYear() + 3);

      const interval = shleemy(date, {
        toDate,
      });

      expect(interval.forHumans).toBe("a year ago");
      expect(interval.direction).toBe('past');
    });
  });
});
