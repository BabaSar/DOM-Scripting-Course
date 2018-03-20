//<form id="registrar">
const form = document.querySelector('#registrar');
// const input = document.querySelector('#registrar > input'); better alternative below
    //We can use querySelctor on the form itself, as opposed to on the document. So we get closer to our target
const input = form.querySelector('input');


form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value;
    input.value = "";
    
    const ul = document.querySelector('#invitedList');
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);

    
});
