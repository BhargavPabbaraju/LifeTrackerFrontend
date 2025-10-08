import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextInput = ({ control, key, config, label }) => (
  <Controller
    control={control}
    key={key}
    name={`goalData.${key}`}
    defaultValue={config.default ?? ""}
    rules={{ required: `${label} is required` }}
    render={({ field, fieldState: { error } }) => (
      <TextField
        {...field}
        label={label}
        fullWidth
        margin="normal"
        error={!!error}
        helperText={error?.message || config.help}
      />
    )}
  />
);

export default TextInput;
