import React, { useState } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { addNewExpence } from "../../utils/api";
import { useNavigate } from "react-router-dom";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = { title, amount, description, date };

    try {
      // Call API to add the expense
      await addNewExpence(expenseData);

      setTitle("");
      setAmount("");
      setDescription("");
      setDate("");
      setError("");

      navigate("/");
    } catch (err) {
      console.error("Error adding expense:", err);
      setError(err.message || "Failed to add expense. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add New Expense
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              variant="outlined"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                console.log("Selected Date:", e.target.value); // Debugging
              }}
              required
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="primary" type="submit">
              Add Expense
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddExpense;
