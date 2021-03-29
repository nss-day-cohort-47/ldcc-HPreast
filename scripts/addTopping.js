export const addTopping = () => {
    return `
    <div class="container"
        <form class="toppingForm">
            <h2>Add New Topping</h2>
            <label for="toppingName">Topping Name: </label>
            <input type="text" name="toppingName" id="toppingName">
            <button type="button" id="toppingSubmit">Submit</button>
            <button type="button" id="formCancel">Cancel</button>
        </form>
    </div>    
    `
}