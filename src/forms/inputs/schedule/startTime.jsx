import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const StartTimeInput = ({ control, name }) => (
  <Controller
    control={control}
    name={name}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TimePicker
        label="Start Time"
        value={value ? dayjs(value, "HH:mm") : null}
        onChange={(newValue) => {
          onChange(newValue ? newValue.format("HH:mm") : null);
        }}
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

export default StartTimeInput;
