import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

export default function GoalsTable({ goals }) {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Goal Name", flex: 1 },
    { field: "domain", headerName: "Domain", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    { field: "priority", headerName: "Priority", width: 120 },
    { field: "deadline", headerName: "Deadline", width: 160 },
  ];

  return (
    <Box sx={{ height: 500, width: "100%" }}>
      {goals.length === 0 ? (
        <Typography>No goals found.</Typography>
      ) : (
        <DataGrid
          rows={goals}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          disableRowSelectionOnClick
        />
      )}
    </Box>
  );
}
