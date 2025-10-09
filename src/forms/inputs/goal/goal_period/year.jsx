import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const YearInput = ({ control, periodType, currentYear }) => (
  <Controller
    control={control}
    defaultValue={currentYear}
    name="year"
    rules={{
      required: periodType ? "Year is required" : false,
      min: { value: currentYear, message: "Year cannot be in the past" },
      max: {
        value: currentYear + 10,
        message: "Year can be at most 10 years from now",
      },
    }}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        label="Year"
        type="number"
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error?.message}
      ></TextField>
    )}
  />
);

export default YearInput;
