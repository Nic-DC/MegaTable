import {
  SELECT_RECORD,
  ADD_CELL,
  SELECT_CELL,
  EDIT_CELL,
  DELETE_CELL,
  DELETE_RECORD,
  EDIT_RECORD,
  ADD_RECORD,
} from "../actions";

const initialState = {
  records: {
    selectedRecord: null,
    selectedCell: null,
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

    case SELECT_CELL:
      return {
        ...state,
        records: {
          ...state.records,
          selectedCell: action.payload,
        },
      };

    case ADD_CELL:
      return {
        ...state,
        records: {
          ...state.records,
          recordsArray: [...state.records.recordsArray, action.payload],
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

    case EDIT_CELL:
      const updatedCell = state.records.recordsArray.map((record) =>
        record._id === action.payload._id ? action.payload : record
      );
      return {
        ...state,
        records: {
          ...state.records,
          recordsArray: updatedCell,
        },
      };

    case EDIT_RECORD:
      const updatedRecords = state.records.recordsArray.map((record) =>
        record._id === action.payload._id ? action.payload.updatedRecord : record
      );
      return {
        ...state,
        records: {
          ...state.records,
          recordsArray: updatedRecords,
        },
      };

    case DELETE_CELL:
      const updatedAfterDeleteCell = state.records.recordsArray.map((record) =>
        record._id === action.payload_id ? action.payload : record
      );
      return {
        ...state,
        records: {
          ...state.records,
          recordsArray: updatedAfterDeleteCell,
        },
      };

    case DELETE_RECORD:
      const updatedAfterDeleteRecord = state.records.recordsArray.filter((record) => record._id !== action.payload);
      return {
        ...state,
        records: {
          ...state.records,
          recordsArray: updatedAfterDeleteRecord,
        },
      };

    default:
      return state;
  }
};
export default mainReducer;
