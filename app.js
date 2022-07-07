const form = document.querySelector('#register')
const formInput = form.querySelector('input')
const ulInvitelist = document.querySelector('#invitedList');
const mainDiv = document.querySelector('.main')


// creating the filtered checkbox
const filteredDiv = document.createElement('div');

// const filteredLabel = document.createElement('label');
// filteredLabel.textContent = "Hide those who havn't responded"

filteredDiv.appendChild(createElement('label', 'textContent', 'Hide those who havn\'t responded'));

const filteredInput = createElement('input', 'type', 'checkbox');
// filteredInput.type = 'checkbox'
filteredDiv.appendChild(filteredInput);

mainDiv.insertBefore(filteredDiv, ulInvitelist)
// filtering checked invitees
filteredInput.addEventListener('change', (event) => {
   const state = event.target.checked;
   const listElement = ulInvitelist.children;
   if (state) {
      for (list of listElement) {
         if (list.className != 'responded') {
            list.style.display = 'none';
         }
      }
   } else {
      for (list of listElement) {
         list.style.display = 'block';
      }
   }
})

//creating different element 
function createElement(elementName, property, value) {
   const element = document.createElement(elementName)

   element[property] = value;
   return element;
}

//form submiting and adding to ul
form.addEventListener('submit', (event) => {
   event.preventDefault();
   if (formInput.value != '') {
      const inputContent = formInput.value;

      const li = document.createElement('li');
      //function
      // Appending to element, default to li element
      function appendToLi(elementName, property, value) {
         const element = createElement(elementName, property, value)

         li.appendChild(element);

         return element;
      }
      // const span = document.createElement('span');
      // span.textContent = inputContent;
      // const span = createElement('span', 'textContent', inputContent)
      // li.appendChild(span);
      appendToLi('span', 'textContent', inputContent);
      // const label = document.createElement('label');
      // label.textContent = 'Confirmed';
      // const label = createElement('label', 'textContent', 'Confirmed')

      // const labelInput = document.createElement('input');
      // labelInput.type = 'checkbox';
      // const labelInput = createElement('input', 'type', 'checkbox');

      // label.appendChild(labelInput);
      // li.appendChild(label);

      appendToLi('label', 'textContent', 'Confirmed').appendChild(createElement('input', 'type', 'checkbox'));

      // const editBtn = document.createElement('button');
      // editBtn.textContent = 'Edit';
      // const editBtn = createElement('button', 'textContent', 'Edit')
      // li.appendChild(editBtn);
      appendToLi('button', 'textContent', 'Edit');

      // const rmvBtn = document.createElement('button');
      // rmvBtn.textContent = 'Remove';
      // const rmvBtn = createElement('button', 'textContent', 'Remove')
      // li.appendChild(rmvBtn);
      appendToLi('button', 'textContent', 'Remove');


      ulInvitelist.appendChild(li);
      // form value null
      formInput.value = '';
   } else {
      alert('Provide invitees name');
   }
})

//Single list checked active class 
ulInvitelist.addEventListener('change', (event) => {
   const inputChanged = event.target;
   const li = inputChanged.parentNode.parentNode;

   // if input checkbox true
   if (inputChanged.checked) {
      li.classList.add('responded');
   } else {
      li.classList.remove('responded')
   }
})

ulInvitelist.addEventListener('click', (event) => {
   if (event.target.tagName === 'BUTTON') {
      const button = event.target;
      //remove button
      if (button.textContent == 'Remove') {
         button.parentNode.remove();
      }
      //edit button
      else if (button.textContent == 'Edit') {
         const span = document.querySelector('#invitedList li span');
         const spanContent = span.textContent

         // console.log(spanContent);
         // input element before span element
         // const input = document.createElement('input');
         // input.setAttribute('type', 'text');
         // input.value = spanContent
         const input = createElement('input', 'type', spanContent);

         span.before(input);
         span.remove();

         //converting edit button to save button
         button.textContent = 'Save';
         button.style.backgroundColor = 'rgb(0 97 160)'

      } else if (button.textContent == 'Save') {
         const input = document.querySelector('#invitedList li input')
         const inputContent = input.value
         // creating span element
         // const span = document.createElement('span')
         // span.textContent = inputContent;
         const span = createElement('span', 'textContent', inputContent);
         input.before(span);
         //again converting to edit button (note: check button spelling)
         button.textContent = 'Edit';
         // remove input & style
         input.remove()
         button.removeAttribute('style');
      }
   }
})