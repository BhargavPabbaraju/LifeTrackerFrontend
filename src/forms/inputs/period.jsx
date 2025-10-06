import { Controller, useWatch } from "react-hook-form";
import { TextField, MenuItem, Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

const MONTHS = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

const PERIOD_TYPES = ["Weekly", "Monthly", "Quarterly", "Yearly"];

const MonthInput = ({ control, currentMonth }) => (
  <Controller
    control={control}
    name="month"
    rules={{
      required: "Month is required for this period type",
    }}
    defaultValue={currentMonth}
    render={({ field: { onChange, value, ...rest }, fieldState }) => {
      const selectedMonth = MONTHS.find((m) => m.value === value) || null;

      return (
        <Autocomplete
          options={MONTHS}
          getOptionLabel={(option) => option.label}
          value={selectedMonth}
          onChange={(_, newValue) => {
            onChange(newValue.value ?? null);
          }}
          onInputChange={(_, inputValue, reason) => {
            // If user types and presses Enter, match the typed string
            if (reason === "input" || reason === "clear") return;

            const match = MONTHS.find(
              (m) => m.label.toLowerCase() === inputValue.toLowerCase()
            );
            if (match) onChange(match.value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Month"
              margin="normal"
              fullWidth
              error={!!fieldState?.error}
              helperText={fieldState?.error?.message}
            />
          )}
          {...rest}
          autoHighlight
          selectOnFocus
          clearOnBlur
        />
      );
    }}
  />
);

const YearInput = ({ control, periodType, currentYear }) => (
  <Controller
    control={control}
    defaultValue={currentYear}
    name="year"
    rules={{
      required: periodType ? "Year is required" : false,
    }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label="Year"
        type="number"
        fullWidth
        margin="normal"
        error={!!fieldState?.error}
        helperText={fieldState?.error?.message}
      ></TextField>
    )}
  />
);

const QuarterInput = ({ control, currentQuarter }) => (
  <Controller
    control={control}
    defaultValue={currentQuarter}
    name="quarter"
    rules={{
      required: "Quarter is required for quarterly goals",
      min: { value: 1, message: "Quarter must be 1–4" },
      max: { value: 4, message: "Quarter must be 1–4" },
    }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label="Quarter (1-4)"
        type="number"
        fullWidth
        margin="normal"
        error={!!fieldState?.error}
        helperText={fieldState?.error?.message}
      ></TextField>
    )}
  />
);

const WeekInput = ({ control, currentWeek }) => (
  <Controller
    control={control}
    defaultValue={currentWeek}
    name="week"
    rules={{
      required: "Week is required for weekly goals",
      min: { value: 1, message: "Week must be 1–5" },
      max: { value: 5, message: "Week must be 1–5" },
    }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        label="Week (1-5)"
        type="number"
        fullWidth
        margin="normal"
        error={!!fieldState?.error}
        helperText={fieldState?.error?.message}
      ></TextField>
    )}
  />
);

const PeriodTypeInput = ({ control }) => (
  <Controller
    control={control}
    name="periodType"
    rules={{ required: "Please select a period type" }}
    render={({ field, fieldState }) => (
      <TextField
        {...field}
        select
        label="Period Type"
        margin="normal"
        fullWidth
        error={!!fieldState?.error}
        helperText={fieldState?.error?.message}
      >
        {PERIOD_TYPES.map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        ))}
      </TextField>
    )}
  />
);

const PeriodInputs = ({ control }) => {
  const periodType = useWatch({ control, name: "periodType" });
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
        <WeekInput control={control} currentWeek={currentWeek} />
      )}
    </Box>
  );
};

export default PeriodInputs;
