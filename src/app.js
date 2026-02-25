// /*
// 1 - CREATE
// 2 - READ
// 3 - UPDATE
// 4 - DELETE

// <li
//             class="flex w-full bg-fuchsia-950 rounded-md border border-transparent text-fuchsia-500 justify-between p-3"
//           >
//             <span>To study React fundamentals</span>
//             <span class="flex items-center gap-2"
//               ><button
//                 class="w-8 cursor-pointer h-8 flex justify-center items-center"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill="currentColor"
//                     d="M9 16.17L5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41z"
//                   />
//                 </svg></button
//               ><button
//                 class="w-8 cursor-pointer h-8 flex justify-center items-center"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     fill="none"
//                     stroke="currentColor"
//                     stroke-linecap="round"
//                     stroke-linejoin="round"
//                     stroke-width="2"
//                     d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"
//                   />
//                 </svg></button
//             ></span>
//           </li>
// */
// // create todo
// let input = document.querySelector("#taskInput");
// let addButton = document.querySelector("#addBtn");
// let todoList = document.querySelector("#todos");
// let todoCount = document.querySelector("#todo_count");
// let currentCount = 0;
// addButton.addEventListener("click", (e) => {
//   let content = input.value.trim();
//   if (content.length > 0) {
//     let listItem = document.createElement("li");
//     listItem.innerHTML = `
//   <li
//             class="flex w-full bg-fuchsia-950 rounded-md items-center border border-transparent text-fuchsia-500 justify-between p-3"
//           >
//             <span>${content}</span>
//             <span class="flex items-center gap-2"
//               >
//               <img id="complete" class="cursor-pointer"  width="32px" src="https://www.freeiconspng.com/uploads/simple-red-checkmark-png-background-32.png" />
//               <img id="delete"  class="cursor-pointer" width="32px" src="https://img.icons8.com/fluent-systems-regular/512/FA5252/trash.png" />
//               </span>
//           </li>
//   `;
//     currentCount += 1;
//     todoCount.innerHTML = currentCount;
//     input.value = "";
//     todoList.append(listItem);
//   }
// });
// // read
// document.addEventListener("click", (e) => {
//   let targetElement = e.target;
//   switch (targetElement.id) {
//     case "complete":
//       targetElement.parentElement.parentElement.classList.toggle(
//         "line-through",
//       );
//       break;
//     case "delete":
//       targetElement.parentElement.parentElement.remove();
//       currentCount -= 1;
//       todoCount.innerHTML = currentCount;
//   }
// });
// let user = { name: "Ahmad", age: 25 };
// // JSON.stringify(obj)
// let jsonUser = JSON.stringify(user);
// // console.log(jsonUser, typeof jsonUser);

// // console.log(user);
// // console.log(typeof user);
// // localestorage
// localStorage.setItem("user", jsonUser);
// localStorage.clear();
// let newUser = localStorage.getItem("user");
// newUser = JSON.parse(newUser);
// console.log(newUser);
