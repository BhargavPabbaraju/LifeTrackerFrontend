import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";

const QuarterInput = ({ control }) => (
  <Controller
    control={control}
    name="quarter"
    rules={{
      required: "Quarter is required for quarterly goals",
      min: { value: 1, message: "Quarter must be 1–4" },
      max: { value: 4, message: "Quarter must be 1–4" },
    }}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        label="Quarter (1-4)"
        type="number"
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error?.message}
      ></TextField>
    )}
  />
);

export default QuarterInput;
