import { Box, Typography, Button } from "@mui/material";
import { useForm, useWatch } from "react-hook-form";
import TimingsInput from "./inputs/schedule/timings";
import CalendarInput from "./inputs/schedule/calendar";
import WeeklyScheduleInput from "./inputs/schedule/weekly";
import { computeGoalRange, PERIOD_TYPES } from "@/util/goal";

const FormButtons = ({ onBack }) => (
  <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
    <Button onClick={onBack} variant="outlined">
      Back
    </Button>
    <Button type="submit" variant="contained" color="primary">
      Save
    </Button>
  </Box>
);

export default function ScheduleForm({ goal, onSave, onBack }) {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      days: [],
      sameTimings: true,
      startTime: null,
      duration: null,
      overrides: {},
    },
  });
  const selectedDates = useWatch({ control, name: "days" }) || [];
  const { startDate, endDate } = computeGoalRange(goal);
  const onSubmit = (data) => {
    const schedules = data.sameTimings
      ? (data.days || []).map((iso) => ({
          date: iso,
          startTime: data.startTime,
          duration: data.duration,
        }))
      : (data.days || []).map((iso) => ({
          date: iso,
          startTime: data.overrides?.[iso]?.startTime || null,
          duration: data.overrides?.[iso]?.endTime || null,
        }));

    console.log("Schedules: ", schedules);
    onSave(schedules);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h6">
          Add schedule for: {goal?.description}
        </Typography>

        {goal.periodType === PERIOD_TYPES.WEEKLY ? (
          <WeeklyScheduleInput
            control={control}
            startDate={startDate}
            endDate={endDate}
          />
        ) : (
          <CalendarInput
            control={control}
            startDate={startDate}
            endDate={endDate}
          />
        )}

        <TimingsInput control={control} dates={selectedDates} />
        <FormButtons onBack={onBack} />
      </Box>
    </form>
  );
}
