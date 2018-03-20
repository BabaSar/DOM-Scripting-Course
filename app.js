document.addEventListener('DOMContentLoaded', () => {
    //<form id="registrar">
    const form = document.querySelector('#registrar');
    // const input = document.querySelector('#registrar > input'); better alternative below
        //We can use querySelctor on the form itself, as opposed to on the document. So we get closer to our target
    const input = form.querySelector('input');
    const mainDiv = document.querySelector('div.main');
    const ul = document.querySelector('#invitedList');


    const div = document.createElement('div');
    const filterLabel = document.createElement('label');
    const filterCheckbox = document.createElement('input');

    filterLabel.textContent = 'Show only those who have responded';
    filterCheckbox.type = 'checkbox';
    div.appendChild(filterLabel);
    div.appendChild(filterCheckbox);
    //insert the div before the ul
    mainDiv.insertBefore(div, ul);

    //event handler on the filterCheckbox
    filterCheckbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        const lis = ul.children;

        if (isChecked) {
            for (let i=0; i<lis.length; i++){
                if (lis[i].className !== 'responded'){
                    lis[i].style.display = 'none';
                }
            }
        }else{
            for (let i=0; i<lis.length; i++){
                lis[i].style.display = '';
            }
        }
    });

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

        //create span tag to wrap around text
        const span = document.createElement('span');
        span.textContent = text;

        //append span to listItem
        li.appendChild(span);

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
            const li = button.parentNode;

            if (button.textContent === 'Remove'){
                ul.removeChild(li);
            }else{
                if (button.textContent === 'Edit'){
                    const span = li.firstElementChild;
                    const textInput = createTextInput();
                    textInput.value = span.textContent;
                    li.insertBefore(textInput, span);
                    li.removeChild(span);
            
                    button.textContent = 'Save';
                    
                }else if (button.textContent === 'Save'){
                    const textInput = li.firstElementChild;
                    const text = textInput.value;
                    const span = document.createElement('span');
                    span.textContent = text;
                    li.insertBefore(span, textInput);
                    li.removeChild(textInput)

                    console.log(text);
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
})






