let myLibrary = [
    new Book('Test1', 'Author1', 123, false),
    new Book('Test2', 'Author2', 456, false),
    new Book('Test3', 'Author3', 789, true)
]

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

function displayBooks(library) {
    let bookList = document.querySelector('.book-list')
    library.forEach(book => {
        let bookElement = document.createElement('div');
        console.log(book)
        bookElement.classList.add('book');
        bookElement.textContent = book.info();
        bookList.appendChild(bookElement);
    })
}

displayBooks(myLibrary);