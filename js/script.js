/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

const listPage = document.querySelector('.student-list');

/**
 * [showPage - This function will create and insert/append the elements needed to display a "page" of nine students]
 *
 * @param {[array of objects]} list - [array of student objects - further when calling a function it will be from data.js file]
 * @param {[number]} page - [page number, each page will consist of 9 students]
 * @returns {[objects]} [inserts 9 students on each page in the browser window]
 */

function showPage(list, page) {
   let startIndex = (page * 9) - 9;  // if 1page --0  2page --9  3page --18 4page --27 5page --36
   let endIndex = (page * 9);        // if 1page --8  2page --17 3page --26 4page --35 5page --44
   if (endIndex > list.length) {   // extra if statement -added to handle error for the last page and first on search;  
      endIndex = list.length;
   }
   const listPage = document.querySelector('.student-list'); // - selecting main 'ul' element
   listPage.innerHTML = '';
   
   for (let i = startIndex;  i >= startIndex && i < endIndex; i++) {
      //console.log(list[i]);
      listPage.insertAdjacentHTML( 'beforeend',
      `
      <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${list[i].picture.thumbnail}" alt="${list[i].name.first} ${list[i].name.last}">
        <h3> ${list[i].name.first} ${list[i].name.last}</h3>
        <span class="email"> ${list[i].email} </span>
      </div>
      <div class="joined-details">
        <span class="date">Joined ${list[i].registered.date}</span>
      </div>
      </li>
      `
      );
   }
}


/**
 * addPagination - This function will create and insert/append the elements needed for the pagination buttons
 *
 * @param {[array of objects]} list - [array of student objects - further it will be from data.js file]
 * @returns {[objects]} [inserts 5 buttons at the bottom of th page and makes them inderactive by calling show page function inside addEventListener]
 */

let pages;

function addPagination(list) {
   pages = parseInt((Math.floor(list.length/9))+1);
   //console.log(pages);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= pages; i++) {
      linkList.insertAdjacentHTML('beforeend',  `
      <li>
         <button type="button">${i}</button>
      </li>
      `
      );
      //console.log(i);
   }
   const active = linkList.firstElementChild.firstElementChild;
   active.className = 'active';

   showPage(list, 1);
   linkList.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
         showPage(list, event.target.textContent);

         //console.log( showPage(list, event.target.textContent) );
         const lis = linkList.children;
         //console.log(lis);
         for (let i = 0; i < lis.length; i++ ) {
            lis[i].firstElementChild.removeAttribute("class");
         };
         event.target.className = 'active';
      }

      
   });
}

// Call addPagination function with data array of objects as an argument:
addPagination(data);


//------------------------------------------- Extra Credit -------------------------------------------------//

// 1. Add search component interactively:
const header = document.querySelector('header');
window.addEventListener('load', (e) => {
   header.insertAdjacentHTML( 'beforeend', 
   `
   <form id='searchBar'>
      <label for="search" class="student-search">
      <span>Search by name</span>
      <input id="search" placeholder="Search by name..."s>
      <button id='submit' type="submit" name="submit" value="submit"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   </form>
   `
   );

// 2. Add functionlity to search component:
const form = document.querySelector('#searchBar');
const input = form.querySelector('#search');
const submit = form.querySelector('#submit');
let studentAll = data;

//console.log(form);
//console.log(input);
//console.log(submit);
//console.log(studentAll);


/* 1) submit listener */
submit.addEventListener('click', (event) => {
   event.preventDefault();
   let matchStudent = [];
   for (const student of studentAll) {
      let sumName = `${student.name.first} ${student.name.last}`.toLowerCase();
      if (sumName.includes( input.value.toLowerCase() ) ) {
         matchStudent.push(student);
      }
   }
   //showPage(matchStudent) - insert a filtered data list of students to addPagination function;;
   //console.log(matchStudent);
   addPagination(matchStudent);   
   // if there is no match new <p> element with content not-found will be inserted, but disappears when there is a match
    if (matchStudent.length === 0) {
       listPage.insertAdjacentHTML('beforebegin', '<p class="not-found">No results</p>');
    } else {
      const notFound = document.querySelectorAll('.not-found');
      for (let i = 0; i < notFound.length; i++) {
      notFound[i].style.display = 'none';
      }
    }
 });
 

 
 /* 2) keyup listener */
 input.addEventListener('keyup', () => {
   let matchStudent = [];
   for (const student of studentAll) {
      let sumName = `${student.name.first} ${student.name.last}`.toLowerCase();
      if (sumName.includes( input.value.toLowerCase() ) ) {
         matchStudent.push(student);
      } 
      
   }
   //showPage(matchStudent) - insert a filtered data list of students to addPagination function;
   //console.log(matchStudent);
   addPagination(matchStudent); 
   // if there is no match new <p> element with content not-found will be inserted, but disappears when there is a match
    if (matchStudent.length === 0) {
       listPage.insertAdjacentHTML('beforebegin', '<p class="not-found">No results</p>');
    } else {
      const notFound = document.querySelectorAll('.not-found');
      for (let i = 0; i < notFound.length; i++) {
      notFound[i].style.display = 'none';
      }
    }

 });

});

// * - Code block for submit and keyup event listeners is the same except for an event object

