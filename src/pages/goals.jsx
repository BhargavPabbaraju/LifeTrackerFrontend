import { useEffect, useState } from "react";
import api from "../api";
import { Typography, Button, Dialog, DialogContent } from "@mui/material";
import GoalDialog from "../forms/goals";

function AddGoalButton({ ...props }) {
  return (
    <Button color="primary" variant="contained" {...props}>
      Add goal
    </Button>
  );
}

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [draftGoal, setDraftGoal] = useState(null);
  const [addingGoal, setAddingGoal] = useState(false);

  useEffect(() => {
    api
      .get("goals/")
      .then((res) => setGoals(res.data))
      .catch((err) => console.error("Error fetching goals" + err));
  }, []);

  const handleAddGoal = () => {
    setAddingGoal(true);
  };

  const handleCloseForm = () => {
    setAddingGoal(false);
  };

  const handleSaveGoal = (newGoal) => {
    console.log(newGoal);
    setAddingGoal(false);
    setDraftGoal(null);
  };

  return (
    <>
      {goals.length === 0 && <Typography>No goals found.</Typography>}
      {/* {goals.length > 0 && <GoalsTable />} */}
      <AddGoalButton onClick={handleAddGoal} />

      <Dialog
        open={addingGoal}
        onClose={handleCloseForm}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          <GoalDialog
            draftGoal={draftGoal}
            onSave={handleSaveGoal}
            onCancel={handleCloseForm}
            setDraftGoal={setDraftGoal}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
