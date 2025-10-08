import { Box } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const CalendarInput = ({ control, goal }) => {
  const handleChange = (newValue, field) => {
    if (!newValue) return;

    const iso = newValue.format("YYYY-MM-DD");
    if (field.value.includes(iso)) {
      field.onChange(field.value.filter((d) => d !== iso));
    } else {
      field.onChange([...field.value, iso]);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Controller
        control={control}
        name="days"
        defaultValue={[]}
        render={({ field }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
            }}
          >
            <DateCalendar
              value={null}
              views={["day"]}
              minDate={dayjs(`${goal?.year}-${goal?.month || 1}-01`)}
              maxDate={
                goal?.month
                  ? dayjs(`${goal?.year}-${goal?.month}-01`).endOf("month")
                  : dayjs(`${goal?.year}-12-31`)
              }
              onChange={(newValue) => {
                handleChange(newValue, field);
              }}
              slots={{
                day: (dayProps) => {
                  const isSelected = field.value.includes(
                    dayProps.day.format("YYYY-MM-DD")
                  );
                  return (
                    <PickersDay
                      {...dayProps}
                      selected={isSelected}
                      sx={{
                        width: 44,
                        height: 44,
                        fontSize: "1rem",
                        bgcolor: isSelected ? "primary.main" : undefined,
                        color: isSelected ? "white" : undefined,
                        borderRadius: "50%",
                      }}
                    />
                  );
                },
              }}
              sx={{
                maxWidth: 420, // keeps it neat, wider than default
                "& .MuiPickersDay-root": {
                  fontSize: "1rem",
                },
                "& .MuiPickersCalendarHeader-root": {
                  fontSize: "1rem",
                  justifyContent: "center",
                },
              }}
            />
          </Box>
        )}
      />
    </Box>
  );
};

export default CalendarInput;
