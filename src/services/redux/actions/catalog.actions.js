import { ReduxActions } from "../../../utils/constants";

export const setProducts = (products, filter) => ({
   type: ReduxActions.APPEND_PRODUCTS,
   payload: {
      resProducts: products, 
      newFilter: filter
   }
});

export const loadMore = (products, filter) => ({
   type: ReduxActions.LOAD_MORE, 
   payload: {
      resProducts: products, 
      newFilter: filter
   }
});

export const addFilter = (filter) => ({
   type: ReduxActions.ADD_FILTER, 
   payload: filter
});

export const removeFilter = (filter) => ({
   type: ReduxActions.REMOVE_FILTER, 
   payload: filter
});