import { carbon } from "./carbon";

describe("carbonInterval", () => {
  it("just now", () => {
    const result = carbon(new Date()).forHumans;

    expect(result).toBe("just now");
  });

  it("seconds", () => {
    const date = new Date();
    date.setSeconds(new Date().getSeconds() - 20);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("20 seconds ago");
  });

  it("minutes", () => {
    const date = new Date();
    date.setMinutes(new Date().getMinutes() - 20);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("20 minutes ago");
  });

  it("minute", () => {
    const date = new Date();
    date.setMinutes(new Date().getMinutes() - 1);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("a minute ago");
  });

  it("hours", () => {
    const date = new Date();
    date.setHours(new Date().getHours() - 20);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("20 hours ago");
  });

  it("hour", () => {
    const date = new Date();
    date.setHours(new Date().getHours() - 1);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("an hour ago");
  });

  it("day", () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 1);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("a day ago");
  });

  it("days", () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 4);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("4 days ago");
  });

  it("week", () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 8);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("a week ago");
  });

  it("weeks", () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 15);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("2 weeks ago");
  });

  it("month", () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 32);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("a month ago");
  });

  it("months", () => {
    const date = new Date();
    date.setDate(new Date().getDate() - 67);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("3 months ago");
  });

  it("year", () => {
    const date = new Date();
    date.setFullYear(new Date().getFullYear() - 1);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("a year ago");
  });

  it("years", () => {
    const date = new Date();
    date.setFullYear(new Date().getFullYear() - 2);

    const result = carbon(new Date(date.getTime())).forHumans;

    expect(result).toBe("2 years ago");
  });
});
