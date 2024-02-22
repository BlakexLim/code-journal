/* exported data */
interface DataEntry {
  view: string;
  entries: DataValues[];
  editing: null | DataValues;
  nextEntryId: number;
}

let data: DataEntry = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', () => {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', dataJSON);
});

const previousFormInputs = localStorage.getItem('javascript-local-storage');

if (previousFormInputs !== null) {
  data = JSON.parse(previousFormInputs);
}
