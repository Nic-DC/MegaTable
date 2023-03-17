export const SELECT_RECORD = `SELECT_RECORD`;
export const ADD_RECORD = `ADD_RECORD`;

export const selectRecordAction = (record) => {
  return {
    type: SELECT_RECORD,
    payload: record,
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
