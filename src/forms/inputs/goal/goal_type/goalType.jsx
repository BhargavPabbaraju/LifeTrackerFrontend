import { Controller, useFormContext, useWatch } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import NumberInput from "./number";
import BooleanInput from "./boolean";
import SelectInput from "./select";
import TextInput from "./text";

const GoalTypeDataInputs = () => {
  const { control } = useFormContext();
  const goalType = useWatch({ control, name: "goalType" });

  if (
    !goalType ||
    !goalType?.requiredGoalData ||
    Object.keys(goalType.requiredGoalData).length === 0
  ) {
    // No further input required for this goal type
    return null;
  }

  const renderField = (fieldKey, config) => {
    const type = config.type || "text";
    const label =
      config.label ||
      fieldKey.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    switch (type) {
      case "number":
        return (
          <NumberInput
            key={fieldKey}
            control={control}
            fieldKey={fieldKey}
            config={config}
            label={label}
          />
        );

      case "boolean":
        return (
          <BooleanInput
            key={fieldKey}
            control={control}
            fieldKey={fieldKey}
            config={config}
            label={label}
          />
        );
      case "select":
        return (
          <SelectInput
            key={fieldKey}
            control={control}
            fieldKey={fieldKey}
            config={config}
            label={label}
          />
        );
      default:
        return (
          <TextInput
            key={fieldKey}
            control={control}
            fieldKey={fieldKey}
            config={config}
            label={label}
          />
        );
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Additional Goal Details
      </Typography>
      {Object.entries(goalType.requiredGoalData).map(([fieldKey, config]) =>
        renderField(fieldKey, config)
      )}
    </Box>
  );
};

const GoalTypeInput = ({ goalTypes }) => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        rules={{ required: "Goal type is required" }}
        name="goalType"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <FormControl fullWidth margin="normal" error={!!error}>
            <InputLabel>Goal Type</InputLabel>
            <Select
              value={field.value?.name || undefined}
              label="Goal Type"
              onBlur={field.onBlur}
              name={field.name}
              inputRef={field.ref}
              onChange={(e) => {
                console.log(
                  "GoalType field.value =",
                  field.value,
                  field.value?.name
                );
                const selected = goalTypes.find(
                  (t) => t.name === e.target.value
                );
                field.onChange(selected);
              }}
            >
              {goalTypes.map((type) => (
                <MenuItem key={type.name} value={type.name}>
                  {type.description}
                </MenuItem>
              ))}
            </Select>
            {error && <FormHelperText>{error.message}</FormHelperText>}
          </FormControl>
        )}
      />
      <GoalTypeDataInputs />
    </>
  );
};

export default GoalTypeInput;
