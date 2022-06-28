const books = document.querySelector("#books");
const main = document.querySelector("main");
const createBtn = document.querySelector("#createBtn");
const deleteBtn = document.getElementsByClassName("deleteBtn");
const form = document.querySelector(".form");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pageNumber = document.getElementById("pageNumber");
const radioButtons = document.querySelectorAll('input[name="readingStatus"]');
const readbtn = document.getElementsByClassName("readbtn");
const formShow = document.getElementById("formShow");
//
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
const changeReadStatus = () => {
  for (const btn of readbtn) {
    btn.addEventListener("click", (e) => {
      let text =
        e.target.parentElement.firstElementChild.firstElementChild.textContent;
      if (btn.classList.contains("read")) {
        btn.innerHTML = "Not Read";
        btn.classList.add("notread");
        btn.classList.remove("read");

        for (let i = 0; i < myLibrary.length; i++) {
          if (myLibrary[i].title === text) {
            myLibrary[i].read = false;
          }
        }
      } else {
        btn.innerHTML = "Read";
        btn.classList.remove("notread");
        btn.classList.add("read");
        for (let i = 0; i < myLibrary.length; i++) {
          if (myLibrary[i].title === text) {
            myLibrary[i].read = true;
          }
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
<div class="book noselect">
<ul>
<li>Title : <span>${book.title}</span> </li>
<li>Author : ${book.author}</li>
<li>Pages : ${book.pages}</li>

<li class="readbtn  ${book.read == true ? "read" : "notread"}">${
    book.read === true ? "read" : "Not Read"
  }</li>
<button class="btn  deleteBtn">Delete</button>
</ul>
</div>
`;

  books.appendChild(div);
}

createBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let readingStatusOption;
  for (var radioButton of radioButtons) {
    if (radioButton.checked) {
      readingStatusOption = radioButton.value;

      if (radioButton.value == "False") {
      }
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
  <div class="book noselect">
  <ul>
  <li>Title : <span>${newBook.title}</span> </li>
  <li>Author : ${newBook.author}</li>
  <li>Pages : ${newBook.pages}</li>
  <li class="readbtn  ${radioButton.value == "True" ? "read" : "notread"}">${
    radioButton.value === "True" ? "read" : "Not Read"
  }</li>
  <button class="btn  deleteBtn">Delete</button>
  </ul>
  </div>
  `;
  books.appendChild(div);
  changeReadStatus();
  deleteBooks();
  formShow.classList.remove("hidden");
  form.classList.add("hidden");

  clearField();
});
formShow.addEventListener("click", () => {
  formShow.classList.add("hidden");
  form.classList.toggle("hidden");
});
changeReadStatus();
deleteBooks();
