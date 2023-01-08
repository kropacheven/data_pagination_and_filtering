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

function displayPage(list) {
 //  let startIndex = (page * itemsPerPage) - itemsPerPage;
 //  let endIndex = (page * itemsPerPage);
   const listPage = document.querySelector('.student-list');
   listPage.innerHTML = '';
   
   for (let i = 0; i < list.length; i++) {
      console.log(list[i]);
      listPage.innerHTML += 
      `
      <li class="student-item cf">
      <div class="student-details">
        <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
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

displayPage(data);



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions
