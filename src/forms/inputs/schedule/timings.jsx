import { Controller, useWatch } from "react-hook-form";
import { Grid, Box, FormControlLabel, Typography, Switch } from "@mui/material";
import StartTimeInput from "./startTime";
import DurationInput from "./duration";
import dayjs from "dayjs";

// "Tue, Oct 15th"
function formatDate(dateString) {
  const d = dayjs(dateString);
  const day = d.date();
  const suffixes = ["th", "st", "nd", "rd"];
  const v = day % 100;
  const suffix = suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];

  return (
    <>
      {d.format("ddd, MMM ")}
      {day}
      <sup>{suffix}</sup>
    </>
  );
}

const TimeRow = ({ control }) => (
  <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
    <StartTimeInput control={control} name="startTime" />
    <DurationInput control={control} name="duration" />
  </Box>
);

const DateTimeRow = ({ control, date }) => (
  <Grid
    container
    direction="row"
    spacing={1}
    columns={12}
    sx={{ justifyContent: "center", alignItems: "center" }}
  >
    <Grid size={4}>
      <Typography variant="subtitle2">{formatDate(date)}</Typography>
    </Grid>

    <Grid size={4}>
      <StartTimeInput control={control} name={`overrides.${date}.startTime`} />
    </Grid>

    <Grid size={4}>
      <DurationInput control={control} name={`overrides.${date}.duration`} />
    </Grid>
  </Grid>
);

const SameTimingsToggle = ({ control }) => (
  <Box sx={{ mt: 2 }}>
    <FormControlLabel
      control={
        <Controller
          name="sameTimings"
          control={control}
          render={({ field }) => <Switch {...field} checked={!!field.value} />}
        />
      }
      label="Same timings for all"
    />
  </Box>
);

const TimingsInput = ({ control, dates }) => {
  const sameTimings = useWatch({ control, name: "sameTimings" });
  if (!dates || dates.length === 0) return null;

  return (
    <Box sx={{ mt: 2 }}>
      {dates.length > 1 && <SameTimingsToggle control={control} />}

      {sameTimings || dates.length === 1 ? (
        <TimeRow control={control} />
      ) : (
        <Box sx={{ mt: 2 }}>
          {dates
            .sort((a, b) => dayjs(a).valueOf() - dayjs(b).valueOf())
            .map((date) => (
              <DateTimeRow key={date} control={control} date={date} />
            ))}
        </Box>
      )}
    </Box>
  );
};

export default TimingsInput;
