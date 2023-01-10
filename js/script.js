/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/**
 * [showPage - This function will create and insert/append the elements needed to display a "page" of nine students]
 *
 * @param {[array of objects]} list - [array of student objects - further it will be from data.js file]
 * @param {[number]} page - [page number, each page will consist from 9 students]
 * @returns {[objects]} [inserts 9 students on each page in the browser window]
 */

function showPage(list, page) {
   let startIndex = (page * 9) - 9;  // 1page --0  2page --9  3page --18 4page --27 5page --36
   let endIndex = (page * 9);        // 1page --8  2page --17 3page --26 4page --35 5page --44
   if (endIndex > 42) {   // extra if statement -added to handle error console message when clicking on page 5  
      endIndex = 42;
   }
   const listPage = document.querySelector('.student-list');
   listPage.innerHTML = '';
   
   for (let i = startIndex;  i >= startIndex && i < endIndex; i++) {
//      console.log(list[i]);
      listPage.innerHTML += 
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
      ;
   }
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

/**
 * [addPagination - This function will create and insert/append the elements needed for the pagination buttons]
 *
 * @param {[array of objects]} lisr - [array of student objects - further it will be from data.js file]
 * @returns {[objects]} [inserts 5 buttons at the bottom of th page and makes them inderactive by calling show page function inside addEventListener]
 */


function addPagination(list) {
   let pages = 5;
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 1; i <= pages; i++) {
      linkList.innerHTML +=  `
      <li>
         <button class='active' type="button">${i}</button>
      </li>
      `
   }
   showPage(list, 1);
   linkList.addEventListener('click', (event) => {
      showPage(list, event.target.textContent);
      console.log( showPage(list, event.target.textContent) )
   });
}


//---------------------------------First (old) add event listener with loop structure chunk:
// let active = document.querySelectorAll('.active');
// console.log(active);
// for (let j = 0; j < active.length; j++) {
//    active[j].addEventListener('click', () => {
//    showPage(data, [j+1])
// });
// }


// Call functions:

//1) Show page:
//showPage(data, 1);

//2) Add pagination:
addPagination(data);




//---------- Extra Credit -------------------------//

// 1. Add search component:
const header = document.querySelector('header');

window.addEventListener('load', (e) => {
   header.innerHTML += 
   `
   <label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `
   ;
});

// 2. Add functionlity to search component: