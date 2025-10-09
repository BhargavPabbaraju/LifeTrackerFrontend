import dayjs from "dayjs";
import { Controller } from "react-hook-form";
import {
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  Box,
  FormHelperText,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

function getWeeksInAMonth(month, year) {
  const startOfMonth = dayjs(new Date(year, month - 1, 1));
  const endOfMonth = startOfMonth.endOf("month");

  let weeks = [];
  let current = startOfMonth.startOf("week");
  while (current.isBefore(endOfMonth) || current.isSame(endOfMonth, "day")) {
    const weekStart = current.isBefore(startOfMonth) ? startOfMonth : current;
    const weekEnd = current.endOf("week").isAfter(endOfMonth)
      ? endOfMonth
      : current.endOf("week");

    weeks.push({
      label: `W${weeks.length + 1}: ${weekStart.format(
        "ddd D"
      )} - ${weekEnd.format("ddd D")}`, // Mon 10 – Sun 16
      value: weekStart.week(),
    });

    current = current.add(1, "week");
  }

  return weeks;
}

const WeekInput = ({ control, currentWeek, month, year }) => {
  const weeksInMonth = getWeeksInAMonth(month, year);
  const theme = useTheme();
  return (
    <Controller
      control={control}
      defaultValue={currentWeek}
      name="week"
      rules={{
        required: "Week is required for weekly goals",
      }}
      render={({ field, fieldState: { error } }) => (
        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Select a Week
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={field.value}
            onChange={(_, newValue) => {
              field.onChange(newValue);
              field.onBlur();
            }}
            onBlur={field.onBlur}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
              gap: 1,
              "& .MuiToggleButtonGroup-grouped": {
                margin: 0,
                border: error
                  ? `1px solid ${theme.palette.error.main}`
                  : "1px solid",
                borderRadius: 2,
              },
            }}
          >
            {weeksInMonth.map((week) => (
              <ToggleButton
                key={week.value}
                value={week.value}
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
                {week.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
          {error && <FormHelperText error>{error.message}</FormHelperText>}
        </Box>
      )}
    />
  );
};

export default WeekInput;
