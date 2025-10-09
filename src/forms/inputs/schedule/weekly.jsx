import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  FormHelperText,
} from "@mui/material";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import { computeGoalRange } from "@/util/goal";
import { useTheme } from "@mui/material/styles";

function getDaysForGoalWeek(goal) {
  const { startDate, endDate } = computeGoalRange(goal);
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = [];
  let current = start;
  while (current.isBefore(end) || current.isSame(end, "day")) {
    days.push({
      date: current.toISOString(),
      label: current.format("ddd D"),
    });
    current = current.add(1, "day");
  }
  return days;
}

const WeeklyScheduleInput = ({ control, goal }) => {
  const days = getDaysForGoalWeek(goal);
  const theme = useTheme();
  return (
    <Controller
      control={control}
      name="days"
      defaultValue={[]}
      rules={{
        validate: (value) =>
          value && value.length > 0 ? true : "Select at least one day",
      }}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ mt: 2 }}>
          <Typography>Select days for this goal week</Typography>
          <ToggleButtonGroup
            value={field.value}
            onChange={(_, newValue) => field.onChange(newValue)}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(90px,1fr))",
              gap: 1,
              "& .MuiToggleButtonGroup-grouped": {
                margin: 0,
                borderRadius: 2,
                border: error
                  ? `1px solid ${theme.palette.error.main}`
                  : "1px solid",
              },
            }}
          >
            {days.map((d) => (
              <ToggleButton
                key={d.date}
                value={d.date}
                sx={{
                  borderRadius: 2,
                  textTransform: "none",
                  justifyContent: "center",
                  "&.Mui-selected": {
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": {
                      bgcolor: "primary.dark",
                    },
                  },
                }}
              >
                {d.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          {error && (
            <FormHelperText error sx={{ mt: 1 }}>
              {error.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
};

export default WeeklyScheduleInput;
