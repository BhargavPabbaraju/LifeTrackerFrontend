import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const WeekOrderInput = ({ control }) => (
  <Controller
    control={control}
    name="weekOrder"
    render={({ field }) => (
      <TextField
        {...field}
        label="Week Order (e.g, 2 = 2nd week)"
        fullWidth
        margin="normal"
        type="number"
      />
    )}
  />
);

export default WeekOrderInput;
