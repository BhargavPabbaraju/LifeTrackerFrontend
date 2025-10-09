import dayjs from "dayjs";

export const PERIOD_TYPES = Object.freeze({
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  QUARTERLY: "Quarterly",
  YEARLY: "Yearly",
});

export const PERIOD_TYPE_ORDER = [
  PERIOD_TYPES.WEEKLY,
  PERIOD_TYPES.MONTHLY,
  PERIOD_TYPES.QUARTERLY,
  PERIOD_TYPES.YEARLY,
];

export function computeGoalRange({ year, month, week, quarter, periodType }) {
  let startDate, endDate;
  console.log(year, quarter, month, week);

  if (quarter && periodType === PERIOD_TYPES.QUARTERLY) {
    const startMonth = (quarter - 1) * 3 + 1;
    startDate = dayjs(`${year}-${startMonth}-01`);
    endDate = startDate.add(2, "month").endOf("month");
  } else if (month && week && periodType === PERIOD_TYPES.WEEKLY) {
    const first = dayjs(`${year}-${month}-01`);
    startDate = first.add((week - 1) * 7, "day");
    const weekEndCandidate = startDate.add(6, "day");
    const monthEnd = first.endOf("month");
    endDate = weekEndCandidate.isBefore(monthEnd) ? weekEndCandidate : monthEnd;
  } else if (month && periodType === PERIOD_TYPES.MONTHLY) {
    startDate = dayjs(`${year}-${month}-01`);
    endDate = startDate.endOf("month");
  } else {
    startDate = dayjs(`${year}-01-01`);
    endDate = dayjs(`${year}-12-31`);
  }

  return {
    startDate: dayjs(startDate.format("YYYY-MM-DD")),
    endDate: dayjs(endDate.format("YYYY-MM-DD")),
  };
}
