import { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";
import api, { API_ENDPOINTS } from "../api";
import {
  CircularProgress,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import DomainInput from "./inputs/goal/domain";
import TagsInput from "./inputs/goal/tags";
import PeriodInput from "./inputs/goal/goal_period/period";
import GoalTypeInput from "./inputs/goal/goal_type/goalType";
import ScheduleForm from "./schedules";

const STEPS = {
  GOAL: "Adding goal",
  SCHEDULE: "Adding schedule",
};

const DescriptionInput = () => {
  const { control } = useFormContext();
  return (
    <Controller
      rules={{ required: "Description is required" }}
      name="description"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label="Description"
          multiline
          rows={3}
          fullWidth
          margin="normal"
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

const FormButtons = ({ onCancel }) => (
  <Box sx={{ display: "flex", mt: 2, justifyContent: "flex-end", gap: 2 }}>
    <Button type="submit" variant="contained" color="primary" p={1}>
      Next
    </Button>
    <Button onClick={onCancel} variant="outlined" p={1}>
      Cancel
    </Button>
  </Box>
);

//tags, onCancel, goalTypes,
function Form({
  initialData,
  domains,
  tags,
  goalTypes,
  onSave,
  onCancel,
  setGoalData,
}) {
  const date = new Date();
  const methods = useForm({
    defaultValues: {
      domain: "",
      tags: [],
      year: date.getFullYear(),
      month: undefined,
      week: undefined,
      quarter: undefined,
      description: "",
      goalType: "",
      goalData: {},
      ...initialData,
    },
  });
  const { handleSubmit } = methods;

  const onSubmit = (data) => {
    setGoalData(data);
    onSave(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <DomainInput domains={domains} />
          <TagsInput tags={tags} />
        </Stack>
        <PeriodInput />
        <DescriptionInput />
        <GoalTypeInput goalTypes={goalTypes} />
        <FormButtons onCancel={onCancel} />
      </form>
    </FormProvider>
  );
}

function GoalForm({ initialData, onSave, onCancel, setGoalData }) {
  const [domains, setDomains] = useState([]);
  const [tags, setTags] = useState([]);
  const [goalTypes, setGoalTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setErrors([]);
      setLoading(true);

      const endpoints = [
        {
          name: "Domains",
          request: api.get(API_ENDPOINTS.DOMAINS),
          setData: setDomains,
        },
        {
          name: "Tags",
          request: api.get(API_ENDPOINTS.TAGS),
          setData: setTags,
        },
        {
          name: "Goal Types",
          request: api.get(API_ENDPOINTS.GOAL_TYPES),
          setData: setGoalTypes,
        },
      ];

      const newErrors = [];
      const results = await Promise.allSettled(endpoints.map((e) => e.request));
      results.forEach((res, idx) => {
        if (res.status === "fulfilled") {
          endpoints[idx].setData(res.value.data);
        } else {
          newErrors.push(`Failed to load ${endpoints[idx].name}`);
        }
      });

      setLoading(false);
      setErrors(newErrors);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (errors.length > 0) {
    return (
      <Box sx={{ mb: 2 }}>
        {errors.map((err, idx) => (
          <Typography key={idx} color="error">
            {err}
          </Typography>
        ))}
      </Box>
    );
  }
  return (
    <Form
      initialData={initialData}
      onSave={onSave}
      onCancel={onCancel}
      domains={domains}
      tags={tags}
      goalTypes={goalTypes}
      setGoalData={setGoalData}
    />
  );
}

export default function GoalDialog({
  draftGoal,
  setDraftGoal,
  onSave,
  onCancel,
}) {
  const [step, setStep] = useState(STEPS.GOAL);

  const handleGoalNext = () => {
    setStep(STEPS.SCHEDULE);
  };

  const handleScheduleBack = () => setStep(STEPS.GOAL);

  const handleFinalSave = (scheduleData) => {
    const fullData = { ...draftGoal, schedules: scheduleData };
    onSave(fullData);
    setDraftGoal(null);
  };

  return (
    <Box>
      {step === STEPS.GOAL && (
        <GoalForm
          initialData={draftGoal}
          onSave={handleGoalNext}
          onCancel={onCancel}
          setGoalData={setDraftGoal}
        />
      )}
      {step === STEPS.SCHEDULE && (
        <ScheduleForm
          goal={draftGoal}
          onSave={handleFinalSave}
          onBack={handleScheduleBack}
        />
      )}
    </Box>
  );
}
