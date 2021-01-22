class Book {
    constructor(title, author, pages, read) {
        this.title = title,
        this.author = author,
        this.pages = pages,
        this.read = read
    }
}

let myLibrary = [
    new Book('Test1', 'Author1', 123, false),
    new Book('Test2', 'Author2', 456, false),
    new Book('Test3', 'Author3', 789, true)
]

let bookList = document.querySelector('.book-list')
let addButton = document.querySelector('.add-button')
addButton.addEventListener('click', showBookForm)
let submitButton = document.querySelector('.submit-button')
submitButton.addEventListener('click', addBook)

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`
}

// Display form to add an additional book to library
function showBookForm(e) {
    bookForm = document.querySelector('.book-form')
    bookForm.style['display'] = 'flex';
}

// Submit the form and add the book to the library
function addBook(e) {
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let pages = document.querySelector('#pages');
    let read = document.querySelector('#read');
    let newBook = new Book(title.value, author.value, pages.value, read.checked);
    title.value = '';
    author.value = '';
    pages.value = '';
    read.checked = false;
    myLibrary.push(newBook);
    document.querySelector('.book-form').style['display'] = 'none';
    displayBooks(myLibrary);
}

// Renders all of the books in the library
function displayBooks(library) {
    // Begin by wiping old library
    while (bookList.firstChild) {
        bookList.removeChild(bookList.firstChild);
    }
    // Display every book
    library.forEach(book => {
        let position = library.indexOf(book);
        renderBook(book, position);
    })
    // Save new library to localStorage
    saveLocal()
}

// Renders an individual book
function renderBook(book, position) {
    // Creates the overall div
    let bookElement = document.createElement('div');
    bookElement.classList.add('book');
    // Give class of book-read if already completed
    if (book.read) {
        bookElement.classList.add('book-read');
    }
    bookElement.dataset.position = position;
    
    // Adds relevant text elements
    let content = [
        document.createElement('p'),
        document.createElement('p'),
        document.createElement('p')
    ]
    content[0].classList.add('title');
    content[0].textContent = book.title;
    content[1].classList.add('author');
    content[1].textContent = book.author;
    content[2].classList.add('page-count');
    content[2].textContent = `Number of Pages: ${book.pages}`;
    content.forEach(item => bookElement.append(item))

    // Add a button to toggle read status of book
    let readButton = document.createElement('button');
    readButton.textContent = 'Read/Unread';
    readButton.classList.add('read-button');
    readButton.addEventListener('click', toggleRead)
    bookElement.append(readButton);

    // Add a delete button to remove a book from the library
    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete Book';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', removeBook);
    bookElement.append(deleteButton)

    // Finally appends book element to the DOM
    bookList.appendChild(bookElement);   
}
// Changes the read property of a book between true/false
function toggleRead(e) {
    let position = e.target.parentNode.getAttribute('data-position');
    let book = myLibrary[position];
    // toggles book.read from true to false
    book.read = book.read ? false : true;
    e.target.parentNode.classList.toggle('book-read');
    saveLocal()
}
// Function removes book from library and calls displayBooks
function removeBook(e) {
    let position = e.target.parentNode.getAttribute('data-position')
    myLibrary.splice(position, 1)
    displayBooks(myLibrary)
}

function saveLocal() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
}

function getLocal() {
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'))
    if (myLibrary === null) {
        myLibrary = [];
    }
}

getLocal();
displayBooks(myLibrary);

