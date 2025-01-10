import * as React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { getAllExpence, deleteExpense } from "../utils/api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [expences, setExpences] = useState([]);
  const [totalExpence, setTotalExpence] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllExpence();
        console.log("Expences response:", response.expenses);
        setExpences(response.expenses);
        calculateExpence(response.expenses);
      } catch (err) {
        console.log("Error occurred:", err);
      }
    };

    fetchData();
  }, []);

  const calculateExpence = (expences) => {
    let total = 0;
    expences.forEach((expence) => {
      total += parseFloat(expence.amount);
    });
    setTotalExpence(total.toFixed(2));
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      const response = await getAllExpence();
      setExpences(response.expenses);
      calculateExpence(response.expenses);
    } catch (error) {
      console.error("Error deleting expense:", error.response || error.message);
    }
  };

  const handleUpdate = (id) => {
    console.log(`Update expense with ID: ${id}`);
    navigate(`/update-expense/${id}`);
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Expenses</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TableContainer
          component={Paper}
          sx={{
            padding: "16px",
            boxShadow: 3,
            width: "100%",
            maxWidth: 950,
            marginBottom: "20px",
          }}
        >
          <h2>Total Expence: {totalExpence}</h2>
          <Table aria-label="expenses table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Date</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {expences.map((expense) => (
                <TableRow
                  key={expense.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    textAlign: "center",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {expense.id}
                  </TableCell>
                  <TableCell align="center">{expense.title}</TableCell>
                  <TableCell align="center">{expense.amount}</TableCell>
                  <TableCell align="left">{expense.description}</TableCell>
                  <TableCell align="center">
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(expense.id)}
                      sx={{ marginRight: "8px" }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      onClick={() => handleUpdate(expense.id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Home;
