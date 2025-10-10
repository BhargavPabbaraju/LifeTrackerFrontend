import { InputAdornment, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const NumberInput = ({ control, fieldKey, config, label }) => {
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
};

export default NumberInput;
