import { SELECT_RECORD } from "../actions";

const initialState = {
  records: {
    selectedRecord: null,
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

    default:
      return state;
  }
};
export default mainReducer;
