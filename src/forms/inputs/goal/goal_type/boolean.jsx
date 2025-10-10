import { Checkbox, FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";

const BooleanInput = ({ control, fieldKey, config, label }) => (
  <Controller
    control={control}
    key={fieldKey}
    name={`goalData.${fieldKey}`}
    defaultValue={config.default ?? false}
    render={({ field }) => (
      <FormControlLabel
        control={<Checkbox {...field} checked={!!field.value} label={label} />}
      />
    )}
  />
);

export default BooleanInput;
