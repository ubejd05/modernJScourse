class Book {
   constructor(title, author, isbn) {
      this.title = title;
      this.author = author;
      this.isbn = isbn;
   }
}

class UI {
   addBookToList(book) {
      const list = document.getElementById("book-list");
      // Create tr element
      const row = document.createElement("tr");
      // Insert cols
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a herf="#" class="delete">X</a></td>
      `;

      list.appendChild(row);
   }

   showAlert(message, className) {
      //Create div
      const div = document.createElement("div");
      // Add classes
      div.className = `alert ${className}`;
      //Add text
      div.appendChild(document.createTextNode(message));
      //Get parent
      const container = document.querySelector(".container");

      const form = document.querySelector("#book-form");

      container.insertBefore(div, form);

      // Timeout after 3 sec
      setTimeout(function () {
         document.querySelector(".alert").remove();
      }, 3000)
   };

   deleteBook(target) {
      if (target.className === "delete") {
         target.parentElement.parentElement.remove();
         // Show message
         this.showAlert("Book Removed!", "success");
      }
   };

   clearFields() {
      document.getElementById("title").value = "";
      document.getElementById("author").value = "";
      document.getElementById("isbn").value = "";
   }
};

// Local Storage Class 
class Store {
   static getBooks(){
      let books;
      if (localStorage.getItem('books') === null) {
         books = []
      } else {
         books = JSON.parse(localStorage.getItem('books'));
      }
      return books
   }

   static displayBooks(){
      const books = Store.getBooks();
      books.forEach(book => {
         const ui = new UI();

         // Add book to UI
         ui.addBookToList(book);
      });
   }

   static addBook(book){
      const books = Store.getBooks();

      books.push(book)
      localStorage.setItem('books', JSON.stringify(books))
   }

   static removeBook(isbn, target){
      console.log(isbn, target)
      const books = Store.getBooks();
      books.forEach(function(book, index) {
         if (book.isbn === isbn) {
            books.splice(index, 1)
          
         };
      localStorage.setItem('books', JSON.stringify(books));
      })
   }
}
// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)



document.getElementById("book-form").addEventListener("submit", function (e) {
   //Get form values
   const title = document.getElementById("title").value,
      author = document.getElementById("author").value,
      isbn = document.getElementById("isbn").value;

   // Instantiate book
   const book = new Book(title, author, isbn);
   // Instantiate UI
   const ui = new UI();

   // Validate
   if (title === "" || author === "" || isbn === "") {
      // Error alert
      ui.showAlert("Please fill in all fields!", "error")
   } else {
      // Add book to list
      ui.addBookToList(book);
      // Add to LS 
      Store.addBook(book);
      // Clear fields
      ui.clearFields();
      //Success alert
      ui.showAlert("Book added!", "success")
   }



   e.preventDefault();
});


// Event Listener for delete 
document.getElementById('book-list').addEventListener('click',
   function (e) {  
      const ui = new UI();
      ui.deleteBook(e.target);

      // Remove from LS 
      if (e.target.className === "delete") {
         Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
      }
      e.preventDefault()
});
