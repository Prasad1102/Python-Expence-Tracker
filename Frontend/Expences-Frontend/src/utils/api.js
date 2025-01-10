import axios from "./axios";

export const registerUser = (username, password, email) => {
  return axios.post("/api/register/", {
    username,
    password,
    email,
  });
};

// User Login API
export const loginUser = (username, password) => {
  return axios.post("/api/login/", {
    username,
    password,
  });
};

export const homedetails = () => {
  return axios.get("/api/hello/");
};

export const getUser = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("Access token is missing. Please log in again.");
  }

  try {
    const response = await axios.get("api/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to Get User Info." };
  }
};

// CRUD for the Expences
export const addNewExpence = async (expenseData) => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("Access token is missing. Please log in again.");
  }
  try {
    const response = await axios.post("/api/addexpence/", expenseData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to add expense." };
  }
};

export const updateExpenseData = async (expenseData) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!expenseData) {
      throw new Error("All fields are required");
    }

    const response = await axios.put(
      "api/updateExpence/",
      {
        expense_id: expenseData.expense_id,
        title: expenseData.title,
        amount: expenseData.amount,
        description: expenseData.description,
        date: expenseData.date,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error updating expense:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllExpence = async () => {
  const accessToken = localStorage.getItem("access_token");

  if (!accessToken) {
    throw new Error("Access token is missing. Please log in again.");
  }
  try {
    const response = await axios.get("/api/expences/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  } catch (err) {
    throw err.response?.data || { message: "Failed to GET expense." };
  }
};

export const deleteExpense = async (id) => {
  try {
    const accessToken = localStorage.getItem("access_token"); // Retrieve token

    const response = await axios.delete("/api/deleteexpence/", {
      data: { expenceId: id }, // Correct property name
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error(
      "Error deleting expense:",
      error.response?.data?.message ||
        error.message ||
        "Failed to delete expense"
    );
    throw error; // Re-throw error for caller to handle
  }
};

export const getOneExpence = async (id) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const response = await axios.get("api/getOneRecord/", {
      params: { expense_id: id },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error Geting expense:",
      error.response?.data?.message || error.message || "Failed to Get expense"
    );
    throw error;
  }
};
