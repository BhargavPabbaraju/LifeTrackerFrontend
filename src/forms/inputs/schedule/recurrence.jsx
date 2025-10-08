import { MenuItem, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const RECURRENCE_OPTIONS = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "monthly", label: "Monthly" },
  { value: "once", label: "Once" },
];

const RecurrenceInput = ({ control }) => {
  return (
    <Controller
      name="recurrence"
      control={control}
      rules={{ required: "Recurrence is required" }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          label="Recurrence"
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error?.message}
        >
          {RECURRENCE_OPTIONS.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default RecurrenceInput;
