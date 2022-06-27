const books = document.querySelector("#books");
const main = document.querySelector("main");
const createBtn = document.querySelector("#createBtn");
const deleteBtn = document.getElementsByClassName("deleteBtn");
const form = document.querySelector(".form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pageNumber = document.getElementById("pageNumber");
const radioButtons = document.querySelectorAll('input[name="readingStatus"]');
const formShow = document.getElementById("formShow");
// 8
const myLibrary = [];
const deleteBooks = () => {
  for (const db of deleteBtn) {
    db.addEventListener("click", () => {
      let text =
        db.parentElement.firstElementChild.firstElementChild.textContent;
      for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === text) {
          myLibrary.splice(i, 1);
          db.parentElement.parentElement.remove();
        }
      }
    });
  }
};

const clearField = () => {
  title.value = "";
  author.value = "";
  pageNumber.value = "";
};

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, I have ${
      this.read ? "read this book." : "not read this book yet."
    }`;
  };
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book(
  "Brief Answers to the Big Questions",
  "Stephen Hawking",
  "256",
  true
);
const book2 = new Book(
  "Astrophysics for People in a Hurry",
  "Neil deGrasse Tyson",
  "132",
  true
);
const book3 = new Book(
  "21 Lessons for the 21st Century",
  "Yuval Noah Harari",
  "269",
  false
);
const book4 = new Book(
  "A Brief History of Time",
  "Stephen Hawking",
  "256",
  true
);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);

for (book of myLibrary) {
  const div = document.createElement("div");
  div.innerHTML = `
<div class="book">
<ul>
<li>Title : <span>${book.title}</span> </li>
<li>Author : ${book.author}</li>
<li>Pages : ${book.pages}</li>
<li>Read : ${book.read}</li>
<button class="btn deleteBtn">Delete</button>
</ul>
</div>
`;
  books.appendChild(div);
}

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let readingStatusOption;
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      readingStatusOption = Boolean(radioButton.value);
      break;
    }
  }
  const newBook = new Book(
    title.value,
    author.value,
    pageNumber.value,
    readingStatusOption
  );

  addBookToLibrary(newBook);
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="book">
  <ul>
  <li>Title : <span>${newBook.title}</span> </li>
  <li>Author : ${newBook.author}</li>
  <li>Pages : ${newBook.pages}</li>
  <li>Read : ${newBook.read}</li>
  <button class="btn deleteBtn">Delete</button>
  </ul>
  </div>
  `;
  books.appendChild(div);
  deleteBooks();
  formShow.classList.remove("hidden");
  form.classList.add("hidden");

  clearField();
});
deleteBooks();

formShow.addEventListener("click", () => {
  formShow.classList.add("hidden");
  form.classList.toggle("hidden");
});
