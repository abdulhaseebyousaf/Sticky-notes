## Folder structure:
post-it-app/

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post it</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    <link rel="shortcut icon" href="/favicon/post-it.png" type="image/x-icon">
</head>
<!-- main content -->
<body id="body" class="bg-slate-300 min-h-screen overflow-scroll relative">
    <!-- header -->
        <header class="text-4xl md:text-5xl font-semibold text-center mt-3 bg-gradient-to-r from-stone-700 to-orange-500 text-transparent bg-clip-text">
            Add notes
        </header>
        <!-- button -->
        <button type="button" id="addBtn" class="flex px-4 md:px-6 text-white py-2 md:py-3 active:scale-[.98] active:bg-neutral-400 my-4 mx-auto cursor-pointer rounded-xl bg-gradient-to-r from-blue-500 to-green-500">
            Add Note
        </button>
        <!-- box container -->
        <div id="boxContainer" class="max-sm:grid max-sm:grid-cols-1 max-sm:justify-items-center grid-cols-6  "></div>
    
    <script src="script.js"></script>
</body>
</html>
```

 ```# script.js
const addBoxBtn = document.getElementById('addBtn');
const boxContainer = document.getElementById('boxContainer');
const fullBody = document.getElementById('body');
let draggedBox = null, offsetX, offsetY;


function saveNote(id, content, top, left) {
    const noteData = { content, top, left };
    localStorage.setItem(id, JSON.stringify(noteData));
}

function createBox(id, content = '', top = '60px', left = '50px') {
    const box = document.createElement('div');
    box.draggable = true;
    box.id = id;
    box.style.margin = '10px';    
    box.style.top = top;
    box.style.left = left;

    if (window.innerWidth <= 640) {
        box.style.position = 'unset';
    }
    else {  
        box.style.position = 'absolute';
    }
    
    box.classList.add('bg-white', 'shadow-lg', 'rounded-md', 'cursor-move', 'border', 'w-64', 'max-w-full', 'border-gray-300');

    const header = document.createElement('div');
    header.classList.add('flex', 'justify-between', 'items-center', 'p-2', 'bg-gray-100', 'border-b', 'border-gray-300', 'rounded-t-md');

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('text-red-500', 'cursor-pointer', 'hover:text-red-700', 'font-semibold');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.classList.add('text-red-500', 'cursor-pointer', 'hover:text-red-700', 'font-semibold');

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('text-red-500', 'cursor-pointer', 'hover:text-red-700', 'font-semibold');

    const textArea = document.createElement('textarea');
    textArea.classList.add('note-content', 'w-full', 'h-28', 'p-2', 'resize-none', 'focus:outline-none');
    textArea.value = content;
    textArea.placeholder = 'Write your note here...';

    editButton.addEventListener('click', () => textArea.focus());

    saveButton.addEventListener('click', () => {
        saveNote(box.id, textArea.value, box.style.top, box.style.left);
    });

    deleteButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete this note?')) {
            localStorage.removeItem(box.id);
            box.remove();
        }
    });

    box.addEventListener('dragstart', (e) => {
        draggedBox = box;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    });

    header.appendChild(editButton);
    header.appendChild(saveButton);
    header.appendChild(deleteButton);
    box.appendChild(header);
    box.appendChild(textArea);
    boxContainer.appendChild(box);
}

window.addEventListener('DOMContentLoaded', () => {
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith('box-')) {
            const { content, top, left} = JSON.parse(localStorage.getItem(key));
            createBox(key, content, top, left);
        }
    });
});

addBoxBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = `box-${Date.now()}`;
    const randomTop = Math.floor(Math.random() * 300) + 50 + 'px';
    const randomLeft = Math.floor(Math.random() * 500) + 50 + 'px';
    createBox(id, '', randomTop, randomLeft);
    saveNote(id, '', randomTop, randomLeft);
});

fullBody.addEventListener('dragover', (e) =>  e.preventDefault());

fullBody.addEventListener('drop', (e) => {
    if (draggedBox) {
        const left = e.clientX - offsetX + 'px';
        const top = e.clientY - offsetY + 'px';
        draggedBox.style.left = left;
        draggedBox.style.top = top;
        const ta = draggedBox.querySelector('textarea');
        saveNote(draggedBox.id, ta.value, top, left);
    }
    draggedBox = null;
});
```


## Post-It Notes Web App

This is a simple sticky notes application built with plain JavaScript and TailwindCSS. Notes are draggable (on desktop), editable, and persist using localStorage.

##  Deployment
Deployed on Vercel (or deploy using the "Import GitHub repo" button at https:\\sticky-notes-ten-puce.vercel.app).

## Features
- Add sticky notes
- Edit, save, and delete notes
- Drag & drop positioning (desktop)
- Auto-save to localStorage

##  Run Locally
1. Clone the repo
```bash
https://github.com/abdulhaseebyousaf/Sticky-notes.git


