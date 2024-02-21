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

const $imageLink = document.getElementById('newUrl');
const $image = document.querySelector('img');
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

  $li.appendChild($entryImage);
  $entryImage.appendChild($viewUrl);
  $li.appendChild($entryContent);
  $entryContent.appendChild($viewTitle);
  $entryContent.appendChild($viewNotes);

  return $li;
}

const $ul = document.querySelector('ul');

if (!$ul) throw new Error('$ul query failed');

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
});

const $toggle = document.querySelector('p');
if (!$toggle) throw new Error('$toggle query failed');

function toggleNoEntries(): void {
  if (data.entries.length === 0) {
    $toggle?.classList.remove('show');
  }
}

console.log(toggleNoEntries());

const $divEntryForm = document.querySelector('.entry-form');
const $divEntries = document.querySelector('.entries');
if (!$divEntryForm) throw new Error('$dataView query failed');
if (!$divEntries) throw new Error('$div query failed');

function viewSwap(view: string): string {
  if (!$divEntryForm) throw new Error('$dataView query failed');
  if (!$divEntries) throw new Error('$div query failed');
  if (view === 'entry-form') {
    $divEntries.className = 'entries hidden';
    $divEntryForm.className = 'entry-form';
  } else {
    $divEntryForm.className = 'entry-form hidden';
    $divEntries.className = 'entries';
  }
  data.view = view;
  return data.view;
}

console.log(viewSwap('entries'));
