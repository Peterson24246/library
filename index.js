let myLibrary = [
    new Book('Test1', 'Author1', 123, false),
    new Book('Test2', 'Author2', 456, false),
    new Book('Test3', 'Author3', 789, true)
]

let bookList = document.querySelector('.book-list')

function Book(title, author, pages, read) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
};

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'read' : 'not read yet'}`
}

function addBookToLibrary(library, book) {
    library.push(book);
}
// Renders all of the books in the library
function displayBooks(library) {
    library.forEach(book => {
        renderBook(book);
    })
}

// Renders an individual book
function renderBook(book) {
    // Creates the overall div
    let bookElement = document.createElement('div');
    bookElement.classList.add('book');
    bookElement.textContent = book.info();
    
    // Adds relevant text divs
    let content = [
        document.createElement('p'),
        document.createElement('p'),
        document.createElement('p')
    ]
    content[0].classList.add('title');
    content[1].classList.add('author');
    content[2].classList.add('page-count');
    console.log(content[0])
    content.forEach(item => bookElement.append(item))
    bookList.appendChild(bookElement);
    


}

displayBooks(myLibrary);