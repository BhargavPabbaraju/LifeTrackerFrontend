import {
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
  Box,
  Switch,
} from "@mui/material";
import { Controller, useWatch } from "react-hook-form";
import StartTimeInput from "./startTime";
import DurationInput from "./duration";
import TimingsInput from "./timings";

const WEEKDAYS = [
  { value: 0, label: "Sun" },
  { value: 1, label: "Mon" },
  { value: 2, label: "Tue" },
  { value: 3, label: "Wed" },
  { value: 4, label: "Thu" },
  { value: 5, label: "Fri" },
  { value: 6, label: "Sat" },
];

const WeekdayMultiInput = ({ control }) => {
  const selected = useWatch({ control, name: "weekdays" });

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1">Select Weekdays</Typography>
      <Controller
        control={control}
        name="weekdays"
        defaultValue={[]}
        rules={{
          validate: (value) =>
            value && value.length > 0
              ? true
              : "At least one weekday must be selected",
        }}
        render={({ field, fieldState: { error } }) => (
          <Box>
            <FormGroup row>
              {WEEKDAYS.map((day) => (
                <FormControlLabel
                  label={day.label}
                  key={day.value}
                  control={
                    <Checkbox
                      checked={(field.value || []).includes(day.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          field.onChange([...field.value, day.value]);
                        } else {
                          field.onChange(
                            field.value.filter((v) => v !== day.value)
                          );
                        }
                      }}
                    />
                  }
                />
              ))}
            </FormGroup>
            {error && (
              <Typography color="error" variant="caption">
                {error.message}
              </Typography>
            )}
          </Box>
        )}
      />

      <TimingsInput
        control={control}
        items={selected}
        labels={(val) => WEEKDAYS.find((d) => d.value === val)?.label}
      />
    </Box>
  );
};

export default WeekdayMultiInput;
