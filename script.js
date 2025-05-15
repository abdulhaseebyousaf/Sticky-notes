const boxContainer = document.getElementById('boxContainer');
const fullBody = document.getElementById('body');
let draggedBox = null;
let offsetX, offsetY;

function createBox(id, content = '', top, left) {
const newBox = document.createElement("div");
newBox.className = "box bg-white shadow-lg rounded-md border border-gray-300 w-64 max-w-full  absolute cursor-move";
newBox.draggable = true;
// Set random position if top/left are not provided
newBox.style.top = top || (Math.floor(Math.random() * 300) + 50 + 'px');
newBox.style.left = left || (Math.floor(Math.random() * 500) + 50 + 'px');
  newBox.id = id || `box-${Date.now()}`;
  newBox.innerHTML = `
    <div class="flex justify-between items-center p-2 bg-gray-100 border-b border-gray-300 rounded-t-md">
      <button class="text-red-500 hover:text-red-700 font-semibold edit-btn">Edit</button>
      <button class="text-red-500 hover:text-red-700 font-semibold save-btn">Save</button>
      <button class="text-red-500 hover:text-red-700 font-semibold delete-btn">Delete</button>
    </div>
    <textarea class="note-content w-full h-28 p-2 resize-none focus:outline-none" placeholder="Write your note here...">${content}</textarea>
  `;
  // Button functionality
  const textArea = newBox.querySelector('textarea');
  newBox.querySelector('.edit-btn').onclick = () => {
    textArea.focus();
  };
  newBox.querySelector('.save-btn').onclick = () => {
    if (textArea.value.trim() === '') {
      alert('Please write something in the note');
      return;
    }
    saveNote(newBox.id, textArea.value, newBox.style.top, newBox.style.left);
  };
  newBox.querySelector('.delete-btn').onclick = () => {
    if (confirm('Are you sure you want to delete this note?')) {
      localStorage.removeItem(newBox.id);
      newBox.remove();
    }
  };
  // Drag functionality
  newBox.addEventListener('dragstart', (e) => {
    draggedBox = newBox;
    offsetX = e.offsetX;
    offsetY = e.offsetY;
  });
  newBox.addEventListener('dragend', () => {
    if (textArea.value.trim() !== '') {
      saveNote(newBox.id, textArea.value, newBox.style.top, newBox.style.left);
    }
  });
  boxContainer.appendChild(newBox);
}
function saveNote(id, content, top, left) {
  localStorage.setItem(id, JSON.stringify({ content, top, left }));
}
// Load notes from localStorage
window.addEventListener('DOMContentLoaded', () => {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('box-')) {
      const { content, top, left } = JSON.parse(localStorage.getItem(key));
      createBox(key, content, top, left);
    }
  });
});
// Handle dropping of notes
fullBody.addEventListener('dragover', (e) => e.preventDefault());
fullBody.addEventListener('drop', (e) => {
  if (draggedBox) {
    const left = e.clientX - offsetX + 'px';
    const top = e.clientY - offsetY + 'px';
    draggedBox.style.left = left;
    draggedBox.style.top = top;

    const textArea = draggedBox.querySelector('textarea');
    if (textArea.value.trim() !== '') {
      saveNote(draggedBox.id, textArea.value, top, left);
    }
    draggedBox = null;
  }
});