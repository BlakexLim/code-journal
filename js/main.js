'use strict';
const $imageLink = document.getElementById('newUrl');
const $image = document.querySelector('img');
const $form = document.querySelector('form');
const $ul = document.querySelector('ul');
if (!$imageLink) throw new Error('$getImage query failed');
if (!$image) throw new Error('$image query failed');
if (!$form) throw new Error('$form query failed');
if (!$ul) throw new Error('$ul query failed');
// add event listener to the variable assigned with the photo-link input
// assign event.target to a variable and use type assertion as HTMLInputElement
// reassign src attribute of the img tag to value of eventTarget
$imageLink.addEventListener('input', (event) => {
  const eventTarget = event.target;
  $image.src = eventTarget.value;
});
$form.addEventListener('submit', (event) => {
  event.preventDefault();
  const $formElements = $form.elements;
  const formData = {
    title: $formElements.title.value,
    newUrl: $formElements.newUrl.value,
    notes: $formElements.notes.value,
    entryId: data.nextEntryId,
  };
  data.nextEntryId++;
  data.entries.unshift(formData);
  $ul.prepend(renderEntry(formData));
  viewSwap('entries');
  toggleNoEntries();
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});
function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', 'entryId');
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
  const $fontAwesomePencil = document.createElement('i');
  $fontAwesomePencil.setAttribute('class', 'fa-solid fa-pencil column-fourth');
  $li.appendChild($entryImage);
  $entryImage.appendChild($viewUrl);
  $li.appendChild($entryContent);
  $entryContent.appendChild($viewTitle);
  $entryContent.appendChild($viewNotes);
  $viewTitle.append($fontAwesomePencil);
  return $li;
}
document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    $ul.appendChild(renderEntry(data.entries[i]));
  }
  viewSwap(data.view);
  toggleNoEntries();
});
const $toggle = document.querySelector('#no-entries');
if (!$toggle) throw new Error('$toggle query failed');
function toggleNoEntries() {
  if (!$toggle) throw new Error('$toggle query failed');
  if (data.entries.length !== 0) {
    $toggle.className = 'hidden';
  } else {
    $toggle.className = 'show';
  }
}
const $divEntryForm = document.querySelector('div[data-view="entry-form"]');
const $divEntries = document.querySelector('div[data-view="entries"]');
if (!$divEntryForm) throw new Error('$dataEntryForm query failed');
if (!$divEntries) throw new Error('$div query failed');
function viewSwap(view) {
  if (view === 'entry-form') {
    $divEntryForm?.classList.remove('hidden');
    $divEntries?.classList.add('hidden');
  } else if (view === 'entries') {
    $divEntries?.classList.remove('hidden');
    $divEntryForm?.classList.add('hidden');
  }
  data.view = view;
}
const $navEntries = document.querySelector('.click-entries');
const $navNew = document.querySelector('.click-new');
if (!$navEntries) throw new Error('$clickNavBar query failed');
if (!$navNew) throw new Error('$navNew query failed');
function clickNavEntries() {
  viewSwap('entries');
}
function clickNavEntryForm() {
  viewSwap('entry-form');
}
$navEntries.addEventListener('click', clickNavEntries);
$navNew.addEventListener('click', clickNavEntryForm);
const $formImg = document.querySelector('img');
const $title = document.getElementById('title');
const $notes = document.getElementById('notes');
const $pageTitle = document.querySelector('h1');
if (!$title) throw new Error('$title query failed');
if (!$notes) throw new Error('$notes query failed');
if (!$pageTitle) throw new Error('$pageTitle query failed');
$ul.addEventListener('click', (event) => {
  viewSwap('entry-form');
  const $eventTarget = event.target;
  if ($eventTarget.tagName === 'I') {
    const closest = $eventTarget.closest('li');
    const eventAttr = closest?.getAttribute('data-entry-id');
    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === Number(eventAttr)) {
        data.editing = data.entries[i];
        $image.src = data.editing.newUrl;
        $imageLink.value = data.editing.newUrl;
        $title.value = data.editing.title;
        $notes.value = data.editing.notes;
      }
    }
  }
  $pageTitle.textContent = 'Edit Entry';
});
