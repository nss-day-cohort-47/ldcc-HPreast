console.log('yum, yum, yum');

import { LoginForm } from "./auth/LoginForm.js";
import { RegisterForm } from "./auth/RegisterForm.js";
import { NavBar } from "./nav/NavBar.js";
import { SnackList } from "./snacks/SnackList.js";
import { SnackDetails } from "./snacks/SnackDetails.js";
import { Footer } from "./nav/Footer.js";
import {
	logoutUser, setLoggedInUser, loginUser, registerUser,
	getSnacks, getSingleSnack, loadToppings, filteredSnacks, registerType,
} from "./data/apiManager.js";
import { addType } from "./addType.js";
import { addTopping } from "./addTopping.js";




const applicationElement = document.querySelector("#ldsnacks");

//login/register listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "login__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='name']").value,
			email: document.querySelector("input[name='email']").value
		}
		loginUser(userObject)
			.then(dbUserObj => {
				if (dbUserObj) {
					sessionStorage.setItem("user", JSON.stringify(dbUserObj));
					startLDSnacks();
				} else {
					//got a false value - no user
					const entryElement = document.querySelector(".entryForm");
					entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
				}
			})
	} else if (event.target.id === "register__submit") {
		//collect all the details into an object
		const userObject = {
			name: document.querySelector("input[name='registerName']").value,
			email: document.querySelector("input[name='registerEmail']").value,
			admin: false
		}
		registerUser(userObject)
			.then(dbUserObj => {
				sessionStorage.setItem("user", JSON.stringify(dbUserObj));
				startLDSnacks();
			})
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout") {
		logoutUser();
		sessionStorage.clear();
		checkForUser();
	}
})
// end login register listeners

// snack listeners
applicationElement.addEventListener("click", event => {
	event.preventDefault();

	if (event.target.id.startsWith("detailscake")) {
		const snackId = event.target.id.split("__")[1];
		getSingleSnack(snackId)
			.then(response => {
				console.log("response", response)
				showDetails(response);
			})
		// getToppings(snackId)
		// .then(response => {
		// 	console.log("toppings", response)
		// } )
	}
})

applicationElement.addEventListener("click", event => {
	event.preventDefault();
	if (event.target.id === "allSnacks") {
		showSnackList();
	}
})

applicationElement.addEventListener("change", event => {
	
	if(event.target.id === "navlist") {
		console.log("event", event.target.value)
		let toppingSelection = event.target.value
		filteredSnacks(toppingSelection)
		.then(response => {
			let filteredArray = [];
			response.forEach(topping => {
				filteredArray.push(topping.snack)
			})
			const listElement = document.querySelector("#mainContent")
			console.log("filter", filteredArray)
			listElement.innerHTML = SnackList(filteredArray);
		})
	}
})

const showDetails = (snackObj) => {
	const listElement = document.querySelector("#mainContent");
	listElement.innerHTML = SnackDetails(snackObj);
}
//end snack listeners

//Add type listener
applicationElement.addEventListener("click", event => {
	if(event.target.id === "addType") {
		applicationElement.innerHTML = "";
		showNavBar();
		showTypeForm();
	}
})

applicationElement.addEventListener("click", event => {
	if(event.target.id === "typeSubmit") {
		const typeObj = {
			name: document.querySelector("#typeName").value
		}
		registerType(typeObj)
		startLDSnacks();
	}
	
})

applicationElement.addEventListener("click", event => {
	if(event.target.id === "formCancel") {
		cancelType();
	}
})

const cancelType = () => {
	const cancelElement = document.querySelector(".container");
	cancelElement.innerHTML = startLDSnacks();
}

const showTypeForm = () => {
	applicationElement.innerHTML += `${addType()}`;
}

const showToppingForm = () => {
	applicationElement.innerHTML += `${addTopping()}`;
}

applicationElement.addEventListener("click", event => {
	if(event.target.id === "addTopping") {
		applicationElement.innerHTML = "";
		showNavBar();
		showToppingForm();
	}
})

applicationElement.addEventListener("click", event => {
	if(event.target.id === "toppingSubmit") {
		const toppingObj = {
			name: document.querySelector("#toppingName").value
		}
		registerTopping(toppingObj)
		startLDSnacks();
	}
	
})


const checkForUser = () => {
	if (sessionStorage.getItem("user")) {
		setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
		startLDSnacks();
	} else {
		applicationElement.innerHTML = "";
		//show login/register
		showNavBar()
		showLoginRegister();
	}
}

const showLoginRegister = () => {
	//template strings can be used here too
	applicationElement.innerHTML += `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
}

const showNavBar = () => {
	applicationElement.innerHTML += NavBar();
}



const showSnackList = () => {
	getSnacks().then(allSnacks => {
		const listElement = document.querySelector("#mainContent")
		listElement.innerHTML = SnackList(allSnacks);
	})
}

const showFooter = () => {
	applicationElement.innerHTML += Footer();
}

const displayToppingList = () => {
	const toppingElement = document.querySelector(".form-select");
	loadToppings().then(response => {
		response.forEach((toppingObj, index) => {

			toppingElement.options[index + 1] = new Option(toppingObj.name, toppingObj.id)
		})
	})
}

const startLDSnacks = () => {
	applicationElement.innerHTML = "";
	showNavBar();
	applicationElement.innerHTML += `<div id="mainContent"></div>`;
	showSnackList();
	showFooter();
	displayToppingList();

}


checkForUser();