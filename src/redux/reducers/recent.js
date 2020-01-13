import { ADD_RECENT, DEL_RECENT } from "../actionTypes";

const initialState = {
  recentList: JSON.parse(localStorage.getItem('recent')) || []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_RECENT: {
      const {data} = action.payload
      const newRecentList = [...state.recentList, data]
      localStorage.setItem('recent', JSON.stringify(newRecentList))
      return {
        ...state,
        recentList: newRecentList
      };
    }
    case DEL_RECENT: {
      localStorage.removeItem('recent')
      return {
        ...state,
        recentList: []
      };
    }
    default:
      return state;
  }
}
