import { addType } from "../addType.js";

const apiURL = "http://localhost:8088";

//// user functions
let loggedInUser = {}

export const getLoggedInUser = () => {
	return { ...loggedInUser };
}

export const logoutUser = () => {
	loggedInUser = {}
}

export const setLoggedInUser = (userObj) => {
	loggedInUser = userObj;
}

export const loginUser = (userObj) => {
	return fetch(`${apiURL}/users?name=${userObj.name}&email=${userObj.email}`)
		.then(response => response.json())
		.then(parsedUser => {
			//is there a user?
			if (parsedUser.length > 0) {
				setLoggedInUser(parsedUser[0]);
				return getLoggedInUser();
			} else {
				//no user
				return false;
			}
		})
}

export const registerUser = (userObj) => {
	return fetch(`${apiURL}/users`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(userObj)
	})
		.then(response => response.json())
		.then(parsedUser => {
			setLoggedInUser(parsedUser);
			return getLoggedInUser();
		})
}


///// snack functions
let addedType = {};

export const getAddedType = () => {
	return {...addedType};
}

export const setAddedType = (typeObj) => {
	addedType = typeObj;
}

export const registerType = (typeObj) => {
	return fetch(`${apiURL}/types`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(typeObj)
	})
	.then(response => response.json())
	.then(parsedType => {
		setAddedType(parsedType);
		return getAddedType();
	})
}


let addedTopping = {};

export const getAddedTopping = () => {
	return {...addedTopping};
}

export const setAddedTopping = (ToppingObj) => {
	addedTopping = ToppingObj;
}

export const registerTopping = (ToppingObj) => {
	return fetch(`${apiURL}/Toppings`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(ToppingObj)
	})
	.then(response => response.json())
	.then(parsedTopping => {
		setAddedTopping(parsedTopping);
		return getAddedTopping();
	})
}

let snackCollection = [];

export const useSnackCollection = () => {
  //Best practice: we don't want to alter the original state, so
  //make a copy of it and then return it
  //the spread operator makes quick work
  const snackCollectionCopy = [...snackCollection]
  return snackCollectionCopy;
}

export const getSnacks = () => {
	return fetch(`${apiURL}/snacks`)
		.then(response => response.json())
		.then(parsedResponse => {
			snackCollection = parsedResponse
			return parsedResponse;
		})
}

export const getSingleSnack = (snackId) => {
	return fetch(`${apiURL}/snacks/${snackId}?_expand=type&_expand=shape&_expand=inFlavor&_expand=season`)
	.then(response => response.json())
	.then(parsedResponse => {
		const toppingId = getToppings(parsedResponse.id)
		.then(toppingsString => {
			parsedResponse.toppingsString = toppingsString
			console.log("parsedResponse", parsedResponse)
			return  parsedResponse
		})
		return toppingId
	})
	.then(newObject => newObject)
}

export let allToppings = []
const toppingsFunction = (array) => {
  const filterOptions = array
  console.log("filterOptions",filterOptions)
  if(filterOptions !== undefined){  
	for (const oneTopping of filterOptions){
	allToppings.push(oneTopping.topping.name)
  }
  console.log("allToppings", allToppings.toString())
  return allToppings.toString()
  }


}

export const getToppings = (snackId) => {
	return fetch(`${apiURL}/snackToppings/?snackId=${snackId}&_expand=topping`)
	.then(response => response.json())
	.then(response => {
		return toppingsFunction(response)
	})
}


export const loadToppings = () => {
	return fetch(`${apiURL}/toppings`)
	.then(response => response.json())
	.then(parsedResponse => {
		return parsedResponse;
	})
}

export const filteredSnacks = (toppingId) => {
	return fetch(`${apiURL}/snackToppings?toppingId=${toppingId}&_expand=snack`)
	.then(response => response.json())
	.then(parsedResponse => {
		return parsedResponse;
	})
}