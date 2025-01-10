import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Grid, Typography } from "@mui/material";
import { getOneExpence, updateExpenseData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const updateExpense = () => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const response = await getOneExpence(id);
        setTitle(response.expense.title);
        setAmount(response.expense.amount);
        setDescription(response.expense.description);
        setDate(response.expense.date);
      } catch (err) {
        console.error("Error fetching expense:", err);
        setError("Failed to fetch expense data.");
      }
    };

    fetchExpense();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      expense_id: id,
      title: title,
      amount: amount,
      description: description,
      date: date,
    };

    try {
      updateExpenseData(expenseData);
      setTitle("");
      setAmount("");
      setDescription("");
      setDate("");
      setError("");

      navigate("/");
    } catch (err) {
      console.error("Error updating expense:", err);
      setError(err.message || "Failed to update expense. Please try again.");
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
              onChange={(e) => setDate(e.target.value)}
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

export default updateExpense;
