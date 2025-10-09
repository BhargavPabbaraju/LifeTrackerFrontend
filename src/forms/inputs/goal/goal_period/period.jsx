import { Controller, useWatch } from "react-hook-form";
import { TextField, MenuItem, Box } from "@mui/material";
import MonthInput from "./month";
import QuarterInput from "./quarter";
import YearInput from "./year";
import WeekInput from "./week";
import { PERIOD_TYPE_ORDER } from "@/util/goal";

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

const PeriodInput = ({ control }) => {
  const periodType = useWatch({ control, name: "periodType" });
  const month = useWatch({ control, name: "month" });
  const year = useWatch({ control, name: "year" });

  const shouldShow = {
    month: periodType === "Monthly" || periodType === "Weekly",
    week: periodType === "Weekly",
    quarter: periodType === "Quarterly",
  };

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();
  const currentQuarter = Math.floor(date.getMonth() / 3) + 1;
  const startWeekDay = new Date(currentYear, currentMonth, 1).getDay();
  const currentWeek = Math.min(
    Math.ceil((date.getDate() + startWeekDay) / 7),
    5
  );

  return (
    <Box>
      <PeriodTypeInput control={control} />
      <YearInput
        control={control}
        periodType={periodType}
        currentYear={currentYear}
      />
      {shouldShow.month && (
        <MonthInput control={control} currentMonth={currentMonth} />
      )}
      {shouldShow.quarter && (
        <QuarterInput control={control} currentQuarter={currentQuarter} />
      )}
      {shouldShow.week && (
        <WeekInput
          control={control}
          currentWeek={currentWeek}
          month={month}
          year={year}
        />
      )}
    </Box>
  );
};

export default PeriodInput;
