export const SELECT_RECORD = `SELECT_RECORD`;
export const SELECT_CELL = `SELECT_CELL`;
export const ADD_RECORD = `ADD_RECORD`;
export const EDIT_CELL = `EDIT_CELL`;
export const DELETE_CELL = `DELETE_CELL`;

export const selectRecordAction = (record) => {
  return {
    type: SELECT_RECORD,
    payload: record,
  };
};

export const selectCellAction = (cell) => {
  return {
    type: SELECT_CELL,
    payload: cell,
  };
};

export const addRecordAction = (columnName, value) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:3010/table", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ columnName, value }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: ADD_RECORD,
        payload: data,
      });
    } else {
      console.error("Error adding record:", response.status);
    }
  } catch (error) {
    console.error("Error adding record:", error);
  }
};

export const editCellAction = (id, columnName, newValue) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3010/table/${id}/update-cell`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ columnName, newValue }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: EDIT_CELL,
        payload: data.record,
      });
    } else {
      console.error("Error editing cell:", response.status);
    }
  } catch (error) {
    console.error("Error editing cell:", error);
  }
};

export const deleteCellAction = (id, columnName) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3010/table/${id}/delete-cell`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ columnName }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: DELETE_CELL,
        payload: data,
      });
    } else {
      console.error("Error deleting cell:", response.status);
    }
  } catch (error) {
    console.error("Error deleting cell:", error);
  }
};
