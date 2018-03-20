//<form id="registrar">
const form = document.querySelector('#registrar');
// const input = document.querySelector('#registrar > input'); better alternative below
    //We can use querySelctor on the form itself, as opposed to on the document. So we get closer to our target
const input = form.querySelector('input');
const ul = document.querySelector('#invitedList');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value;
    input.value = '';

    const li = createLI(text);

    //append listItem to the parent ul
    ul.appendChild(li);
});

function createLI(text){
    //create listItem
    const li = document.createElement('li');
    li.textContent = text;

    //create label
    const label = document.createElement('label');
    label.textContent = 'Confirmed';

    //create checkbox input
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';

    //append checkbox input to label
    label.appendChild(checkbox);
    //append label to listItem
    li.appendChild(label);

    //create edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    li.appendChild(editButton);

    //create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    //append remove button to listItem
    li.appendChild(removeButton); 

    return li;
}

// Event handler on the ul, when any of the checkboxes are checked. Thanks to event bubbling.
ul.addEventListener('change', (event) =>{
    console.log(event.target.type);
    const checkbox = event.target;
    const checked = checkbox.checked;
    const listItem = checkbox.parentNode.parentNode;
    
    if(checked){
        listItem.className = 'responded';
    }else{
        listItem.className = '';        
    }
});

ul.addEventListener('click', (event) => {

    if (event.target.tagName === 'BUTTON'){
        const button = event.target;

        if (button.textContent === 'Remove'){
            const listItem = button.parentNode;
            ul.removeChild(listItem);
        }else{
            if (button.textContent === 'Edit'){
                //add input field 
                const textInput = createTextInput();
                button.parentNode.appendChild(textInput);
                //clear the li textContent
                button.parentNode.textContent = '';
                button.textContent = 'Save';
                
            }else if (button.textContent === 'Save'){
                
                button.textContent = 'Edit';
            }
        }
    }
});

function createTextInput(){
    const textInput = document.createElement('input');
    textInput.type = 'text';

    return textInput;
}