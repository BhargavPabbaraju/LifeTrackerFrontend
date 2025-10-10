import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

const SelectInput = ({ control, fieldKey, config, label }) => (
  <Controller
    control={control}
    key={fieldKey}
    name={`goalData.${fieldKey}`}
    defaultValue={config.default ?? ""}
    rules={{ required: `${label} is required` }}
    render={({ field, fieldState: { error } }) => (
      <FormControl fullWidth margin="normal" error={!!error}>
        <InputLabel>{label}</InputLabel>
        <Select {...field} label={label}>
          {(config.options || []).map((opt) => (
            <MenuItem key={opt.value ?? opt} value={opt.value ?? opt}>
              {opt.label ?? opt}
            </MenuItem>
          ))}
        </Select>
        {config.help && (
          <Typography
            variant="caption"
            color={error ? "error" : "text.secondary"}
            sx={{ ml: 2 }}
          >
            {config.help}
          </Typography>
        )}
      </FormControl>
    )}
  />
);

export default SelectInput;
