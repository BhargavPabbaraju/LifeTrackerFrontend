import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const DayInput = ({ control }) => (
  <Controller
    control={control}
    name="day"
    render={({ field }) => (
      <TextField
        {...field}
        label="Day of Month"
        fullWidth
        margin="normal"
        type="number"
      />
    )}
  />
);

export default DayInput;
