import { Controller, useFormContext, useWatch } from "react-hook-form";
import { TextField, MenuItem, Box } from "@mui/material";
import MonthInput from "./month";
import QuarterInput from "./quarter";
import YearInput from "./year";
import WeekInput from "./week";
import { PERIOD_TYPE_ORDER, PERIOD_TYPES } from "@/util/goal";
import { useEffect } from "react";

const PeriodTypeInput = ({ control }) => (
  <Controller
    control={control}
    name="periodType"
    rules={{ required: "Please select a period type" }}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        select
        label="Period Type"
        margin="normal"
        fullWidth
        error={!!error}
        helperText={error?.message}
      >
        {PERIOD_TYPE_ORDER.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);

const PeriodInput = () => {
  const { control, setValue } = useFormContext();
  const periodType = useWatch({ control, name: "periodType" });
  const month = useWatch({ control, name: "month" });
  const year = useWatch({ control, name: "year" });

  const shouldShow = {
    month: periodType === "Monthly" || periodType === "Weekly",
    week: periodType === "Weekly",
    quarter: periodType === "Quarterly",
  };

  useEffect(() => {
    if (!periodType) return;
    setValue("month", undefined);
    setValue("quarter", undefined);
    setValue("week", undefined);

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const currentQuarter = Math.floor(date.getMonth() / 3) + 1;
    const startWeekDay = new Date(currentYear, currentMonth, 1).getDay();
    const currentWeek = Math.min(
      Math.ceil((date.getDate() + startWeekDay) / 7),
      5
    );

    if (periodType === PERIOD_TYPES.WEEKLY) {
      setValue("month", currentMonth);
      setValue("week", currentWeek);
    } else if (periodType === PERIOD_TYPES.MONTHLY) {
      setValue("month", currentMonth);
    } else if (periodType === PERIOD_TYPES.QUARTERLY) {
      setValue("quarter", currentQuarter);
    }
  }, [periodType, setValue]);

  return (
    <Box>
      <PeriodTypeInput control={control} />
      <YearInput control={control} periodType={periodType} />
      {shouldShow.month && <MonthInput control={control} />}
      {shouldShow.quarter && <QuarterInput control={control} />}
      {shouldShow.week && (
        <WeekInput control={control} month={month} year={year} />
      )}
    </Box>
  );
};

export default PeriodInput;
