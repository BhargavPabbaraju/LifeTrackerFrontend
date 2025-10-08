import { TimeField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const DurationInput = ({ control, name }) => (
  <Controller
    control={control}
    name={name}
    rules={{
      validate: (value) =>
        !value ||
        dayjs(value, "HH:mm").isAfter(dayjs("00:01:00", "HH:mm:ss")) ||
        "Duration must be at least 1 minute",
    }}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TimeField
        label="Duration"
        value={value ? dayjs(value, "HH:mm") : null}
        format="HH:mm"
        onChange={(newValue) =>
          onChange(newValue ? newValue.format("HH:mm") : null)
        }
        slotProps={{
          textField: {
            fullWidth: true,
            margin: "normal",
            error: !!error,
            helperText: error?.message,
          },
        }}
      />
    )}
  />
);

export default DurationInput;
