import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

// inside of the cart we have a cart item, by default it is empty
const initialState = {
	cart: Cookies.get('cart')
		? JSON.parse(Cookies.get('cart'))
		: { cartItems: [] },
};

//accepts two parameters: the state and the action
function reducer(state, action) {
	// we use a switch case to check the action.type
	switch (action.type) {
		// we need to update the state. We get the new item into the cart
		// from the action.payload which updates the state
		case 'CART_ADD_ITEM': {
			const newItem = action.payload;
			// searches the state for the item that matches the new item
			// using the find method on the cart item
			const existItem = state.cart.cartItems.find(
				(item) => item.slug === newItem.slug
			);
			// if the item exists, we return the state
			// we use the map function to loop through the cart items
			const cartItems = existItem
				? state.cart.cartItems.map((item) =>
						//otherwise we keep the cart items as they are. If you add the same item, you only update the qty
						item.name === existItem.name ? newItem : item
				  ) //  this concatonates the new item to the end of the existing cart items
				: [...state.cart.cartItems, newItem];
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		// below is the code for removing an item from the cart and the logic to intepret with the amount of items left

		case 'CART_REMOVE_ITEM': {
			const cartItems = state.cart.cartItems.filter(
				(item) => item.slug !== action.payload.slug
			);
			// use coookies to have the browers store the cart items
			Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));
			return { ...state, cart: { ...state.cart, cartItems } };
		}
		// default state of the cart
		default:
			return state;
	}
}

// our reducer hook
export function StoreProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const value = { state, dispatch };
	// below gives us the ability to access the state which contains the cart and the items
	return <Store.Provider value={value}>{children}</Store.Provider>;
}
