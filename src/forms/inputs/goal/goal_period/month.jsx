import { Controller } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";

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

const MonthInput = ({ control }) => (
  <Controller
    control={control}
    name="month"
    rules={{
      required: "Month is required for this period type",
    }}
    render={({
      field: { onChange, value, ...rest },
      fieldState: { error },
    }) => {
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
              error={!!error}
              helperText={error?.message}
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

export default MonthInput;
