export const SELECT_RECORD = `SELECT_RECORD`;

export const selectRecordAction = (record) => {
  return {
    type: SELECT_RECORD,
    payload: record,
  };
};
