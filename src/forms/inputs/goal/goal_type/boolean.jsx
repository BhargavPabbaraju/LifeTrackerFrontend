import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const BooleanInput = ({ control, key, config, label }) => (
  <Controller
    control={control}
    key={key}
    name={`goalData.${key}`}
    defaultValue={config.default ?? false}
    render={({ field }) => (
      <FormControlLabel
        control={<Checkbox {...field} checked={!!field.value} label={label} />}
      />
    )}
  />
);

export default BooleanInput;
