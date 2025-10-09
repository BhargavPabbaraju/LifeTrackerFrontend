import { Controller, useFormContext } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";
import NumberInput from "./number";
import BooleanInput from "./boolean";
import SelectInput from "./select";
import TextInput from "./text";

const GoalTypeDataInputs = ({ control, goalType }) => {
  if (
    !goalType ||
    !goalType?.requiredGoalData ||
    Object.keys(goalType.requiredGoalData).length === 0
  ) {
    // No further input required for this goal type
    return null;
  }

  const renderField = (key, config) => {
    const type = config.type || "text";
    const label =
      config.label ||
      key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    switch (type) {
      case "number":
        return (
          <NumberInput
            control={control}
            key={key}
            config={config}
            label={label}
          />
        );

      case "boolean":
        return (
          <BooleanInput
            control={control}
            key={key}
            config={config}
            label={label}
          />
        );
      case "select":
        return (
          <SelectInput
            control={control}
            key={key}
            config={config}
            label={label}
          />
        );
      default:
        return (
          <TextInput
            control={control}
            key={key}
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
      {Object.entries(goalType.requiredGoalData).map(([key, config]) =>
        renderField(key, config)
      )}
    </Box>
  );
};

const GoalTypeInput = ({ goalTypes }) => {
  const { control } = useFormContext();
  const [selectedGoalType, setSelectedGoalType] = useState(null);
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
              {...field}
              label="Goal Type"
              onChange={(e) => {
                field.onChange(e);
                setSelectedGoalType(
                  goalTypes.find((t) => t.name === e.target.value)
                );
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
      <GoalTypeDataInputs control={control} goalType={selectedGoalType} />
    </>
  );
};

export default GoalTypeInput;
