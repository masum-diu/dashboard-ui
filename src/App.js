import React from "react";
import Histogram from "./components/Histogram";
import PieChart from "./components/PieChart";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Paper, Stack } from "@mui/material";

const App = () => {
  const initialData = {
    labels: Array.from({ length: 10 }, (_, i) => ({
      x: i * 10,
      y: Math.floor(Math.random() * 100),
    })),
    values: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
    binSize: 10,
  };
  const pieChartData = {
    labels: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    values: [20, 30, 15, 10, 25],
  };
  return (
    <>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6">Dashboard</Typography>
        </Toolbar>
      </AppBar>

      <Stack
        direction={"column"}
        spacing={2}
        sx={{
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
          pt: { lg: 15, xs: 10 },
          mb: 5,
        }}
      >
        <Paper elevation={5} sx={{ height: "400px", p: 1 }}>
          <Histogram initialData={initialData} />
        </Paper>
        <Paper elevation={5} sx={{ height: "400px", p: 1 }}>
          <PieChart data={pieChartData} />
        </Paper>
      </Stack>
    </>
  );
};

export default App;
