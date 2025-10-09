import { PERIOD_TYPES } from "@/util/goal";
import { Box } from "@mui/material";
import { DateCalendar, PickersDay } from "@mui/x-date-pickers";
import { Controller } from "react-hook-form";

const CalendarInput = ({ control, startDate, endDate }) => {
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
              minDate={startDate}
              maxDate={endDate}
              onChange={(newValue) => {
                handleChange(newValue, field);
              }}
              slotProps={{
                layout: {
                  sx: {
                    "& .MuiDayCalendar-weekDayLabel": {
                      color: "red",
                      backgroundColor: "blue",
                    },
                  },
                },
              }}
              disableFuture={false}
              disablePast={true}
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
                        fontSize: "1rem",
                        borderRadius: 1,
                        bgcolor: isSelected ? "primary.main" : undefined,
                        color: isSelected ? "white" : undefined,
                        "&:not(.Mui-selected)": {
                          "&:hover": { bgcolor: "action.hover" },
                        },
                      }}
                    />
                  );
                },
              }}
              sx={{
                maxWidth: 420,
                "& .MuiDayCalendar-weekDayLabelContainer": {
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  textAlign: "center",
                  fontWeight: 600,
                  mb: 0.5,
                  px: 0,
                  mx: 0,
                },
                "& .MuiDayCalendar-weekDayLabel": {
                  color: "text.secondary",
                  fontSize: "0.875rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em",
                  lineHeight: 1.2,
                },
                "& .MuiDayCalendar-weekContainer": {
                  padding: 0,
                  margin: 0,
                },
                "& .MuiDayCalendar-week": {
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  columnGap: 0,
                  margin: 0,
                },
                "& .MuiPickersDay-root": {
                  margin: 0,
                  width: "100%",
                  maxWidth: "unset",
                  aspectRatio: "1",
                  justifySelf: "stretch",
                  alignSelf: "stretch",
                },
                "& .MuiPickersCalendarHeader-root": {
                  justifyContent: "center",
                  fontSize: "1rem",
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
