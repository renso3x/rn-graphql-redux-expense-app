const GET_EXPENSES = 'GET_EXPENSES';
const ADD_EXPENSE = 'ADD_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const addExpense = expense =>
  dispatch => dispatch({
    type: ADD_EXPENSE,
    payload: expense,
  });

export const loadExpense = expenses =>
  dispatch => dispatch({
    type: GET_EXPENSES,
    payload: expenses,
  });

export const editExpense = (expense, id) =>
  dispatch => dispatch({
    type: EDIT_EXPENSE,
    payload: expense,
    id,
  });

export const deleteExpeneses = id =>
  dispatch => dispatch({
    type: DELETE_EXPENSE,
    id,
  });

export default (state = [], action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      return [action.payload, ...state];

    case EDIT_EXPENSE:
      return state.map((value) => {
        if (value.id === action.id) {
          return { ...value };
        }
        return value;
      });

    case DELETE_EXPENSE:
      return state.filter(value => value.id !== action.id);

    case GET_EXPENSES:
      return action.payload;

    default:
      return state;
  }
};
