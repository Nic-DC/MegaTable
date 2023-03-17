import { SELECT_RECORD, ADD_RECORD } from "../actions";

const initialState = {
  records: {
    selectedRecord: null,
    recordsArray: [],
  },
};

const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_RECORD:
      return {
        ...state,
        records: {
          ...state.records,
          selectedRecord: action.payload,
        },
      };

    case ADD_RECORD:
      return {
        ...state,
        records: {
          ...state.records,
          recordsArray: [...state.records.recordsArray, action.payload],
        },
      };

    default:
      return state;
  }
};
export default mainReducer;
