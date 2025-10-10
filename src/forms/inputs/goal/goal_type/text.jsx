import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextInput = ({ control, fieldKey, config, label }) => {
  const isRequired = config?.required !== false;
  return (
    <Controller
      control={control}
      key={fieldKey}
      name={`goalData.${fieldKey}`}
      defaultValue={config.default ?? ""}
      rules={
        isRequired
          ? { required: `${label || fieldKey} is required` }
          : undefined
      }
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
};

export default TextInput;
