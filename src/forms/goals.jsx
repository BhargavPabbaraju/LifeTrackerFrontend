import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import api, { API_ENDPOINTS } from "../api";
import {
  CircularProgress,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Stack,
  Autocomplete,
} from "@mui/material";
import DomainInput from "./inputs/domain";
import TagsInput from "./inputs/tags";
import PeriodInputs from "./inputs/period";

const DescriptionInput = ({ control }) => (
  <Controller
    rules={{ required: "Description is required" }}
    name="description"
    control={control}
    render={({ field }) => (
      <TextField
        {...field}
        label="Description"
        multiline
        rows={3}
        fullWidth
        margin="normal"
      />
    )}
  />
);

const GoalTypeInput = ({ control, goalTypes }) => (
  <Controller
    rules={{ required: "Goal type is required" }}
    name="goalType"
    control={control}
    render={({ field }) => (
      <FormControl fullWidth margin="normal">
        <InputLabel>Goal Type</InputLabel>
        <Select {...field} label="Goal Type">
          {goalTypes.map((type) => (
            <MenuItem key={type.name} value={type.name}>
              {type.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    )}
  />
);

const FormButtons = ({ onCancel }) => (
  <Box sx={{ display: "flex", mt: 2, justifyContent: "flex-end", gap: 2 }}>
    <Button type="submit" variant="contained" color="primary" p={1}>
      Add
    </Button>
    <Button onClick={onCancel} variant="outlined" p={1}>
      Cancel
    </Button>
  </Box>
);

//tags, onCancel, goalTypes,
function Form({ initialData, domains, tags, goalTypes, onSave, onCancel }) {
  const date = new Date();
  // watch, setValue
  const { control, handleSubmit } = useForm({
    defaultValues: {
      domain: "",
      tags: [],
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      week: null,
      quarter: null,
      description: "",
      goalType: "",
      goalData: {},
      ...initialData,
    },
  });

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <DomainInput control={control} domains={domains} />
        <TagsInput control={control} tags={tags} />
      </Stack>
      <PeriodInputs control={control} />
      <DescriptionInput control={control} />
      <GoalTypeInput control={control} goalTypes={goalTypes} />
      <FormButtons control={control} onCancel={onCancel} />
    </form>
  );
}

export default function GoalForm({ initialData, onSave, onCancel }) {
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
    />
  );
}
