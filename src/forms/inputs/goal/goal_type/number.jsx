import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const NumberInput = ({ control, key, config, label }) => (
  <Controller
    control={control}
    key={key}
    name={`goalData.${key}`}
    defaultValue={config.default ?? ""}
    rules={{ required: `${label} is required` }}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        type="number"
        label={label}
        slotProps={{
          htmlInput: {
            min: config.min,
            max: config.max,
            step: config.step,
          },
          input: {
            endAdornment: config.unit ? (
              <InputAdornment position="end">{config.unit}</InputAdornment>
            ) : null,
          },
        }}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error?.message || config.help}
      />
    )}
  />
);

export default NumberInput;
