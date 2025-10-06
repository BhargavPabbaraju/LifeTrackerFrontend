import { useEffect, useState } from "react";
import api from "../api";
// import { useTheme } from "@mui/material/styles";
import { Typography, Button } from "@mui/material";

function AddGoalButton() {
  //   const theme = useTheme();
  return (
    <Button color="primary" variant="contained">
      Add goal
    </Button>
  );
}

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    api
      .get("goals/")
      .then((res) => setGoals(res.data))
      .catch((err) => console.error("Error fetching goals" + err));
  }, []);

  return (
    <>
      {goals.length === 0 && <Typography>No goals found.</Typography>}
      {/* {goals.length > 0 && <GoalsList />} */}
      <AddGoalButton />
    </>
  );
}
