export const addType = () => {
    return `
    <div class="container"
        <form class="typeForm">
            <h2>Add New Type</h2>
            <label for="typeName">Type Name: </label>
            <input type="text" name="typeName" id="typeName">
            <button type="button" id="typeSubmit">Submit</button>
            <button type="button" id="formCancel">Cancel</button>
        </form>
    </div>    
    `
}