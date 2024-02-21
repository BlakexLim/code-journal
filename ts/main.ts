/* global data */
// create an object to store input values
interface FormElements extends HTMLFormControlsCollection {
  title: HTMLInputElement;
  newUrl: HTMLInputElement;
  notes: HTMLTextAreaElement;
}

interface DataValues {
  title: string;
  newUrl: string;
  notes: string;
  entryId?: number;
}

// query the DOM for the photo input element
// query the DOM for the img element
// the input value is going to listen for an event and assign the event.value to the src attribute of the img element
const $imageLink = document.getElementById('newUrl');
const $image = document.querySelector('img');
// query the DOM for the form element and give it a type of HTMLFormELement
const $form = document.querySelector('form') as HTMLFormElement;

if (!$imageLink) throw new Error('$getImage query failed');
if (!$image) throw new Error('$image query failed');
if (!$form) throw new Error('$form query failed');

// add event listener to the variable assigned with the photo-link input
// assign event.target to a variable and use type assertion as HTMLInputElement
// reassign src attribute of the img tag to value of eventTarget
$imageLink.addEventListener('input', (event: Event) => {
  const eventTarget = event.target as HTMLInputElement;
  $image.src = eventTarget.value;
});

$form.addEventListener('submit', (event: Event) => {
  event.preventDefault();
  const $formElements = $form.elements as FormElements;
  const formData: DataValues = {
    title: $formElements.title.value,
    newUrl: $formElements.newUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(formData);
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});

function renderEntry(entry: DataValues): HTMLLIElement {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');

  const $entryImage = document.createElement('div');
  $entryImage.setAttribute('class', 'column-half view-entry');

  const $viewUrl = document.createElement('img');
  $viewUrl.setAttribute('src', entry.newUrl);

  const $entryContent = document.createElement('div');
  $entryContent.setAttribute('class', 'column-half');

  const $viewTitle = document.createElement('h2');
  $viewTitle.textContent = entry.title;

  const $viewNotes = document.createElement('p');
  $viewNotes.textContent = entry.notes;

  $entryImage.appendChild($li);
  $viewUrl.appendChild($entryImage);
  $entryContent.appendChild($li);
  $viewTitle.appendChild($entryContent);
  $viewNotes.appendChild($entryContent);

  return $li;
}

console.log(renderEntry);
