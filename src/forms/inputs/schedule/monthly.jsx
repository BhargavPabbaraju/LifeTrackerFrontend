import { FormControlLabel, RadioGroup, Box, Radio } from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import DayInput from "./day";
import WeekOrderInput from "./weekOrder";
import WeekdayMultiInput from "./weekday";
import CalendarInput from "./calendar";

const MonthlyModeInput = ({ control }) => (
  <Controller
    name="monthlyMode"
    control={control}
    defaultValue="day"
    render={({ field }) => (
      <RadioGroup row {...field}>
        <FormControlLabel
          value="day"
          control={<Radio />}
          label="Days of Month"
        />
        <FormControlLabel
          value="weekday"
          control={<Radio />}
          label="Weekday Order"
        />
      </RadioGroup>
    )}
  />
);

const MonthlyInput = ({ control, goal }) => {
  const monthlyMode = useWatch({ control, name: "monthlyMode" });
  return (
    <Box>
      <MonthlyModeInput control={control} />

      {monthlyMode === "day" && <CalendarInput control={control} goal={goal} />}

      {monthlyMode === "weekday" && (
        <>
          <WeekOrderInput control={control} />
          <WeekdayMultiInput control={control} />
        </>
      )}
    </Box>
  );
};

export default MonthlyInput;
