const getBtn = document.querySelector("#get");
const postBtn = document.querySelector("#post");
const getIdBtn = document.querySelector("#getID");
const updateBtn = document.querySelector("#put");
const deleteBtn = document.querySelector("#delete");
const searchBox = document.querySelector(".inputSearch");
let users = [];
var index = 0;
const divUsers = document.querySelector(".listUsers");
getBtn.addEventListener("click", () => {
  // Make a request for a user with a given ID
  axios
    .get("http://fronttest.ekookna.pl/")
    .then(function (response) {
      // handle success
      console.log(response);
      users = response.data.users;
      displayUsers();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});
function pCreator() {
  const pUser = document.createElement("p");
  pUser.setAttribute("id", `${index++}`);
  pUser.setAttribute("class", `pList`);

  divUsers.appendChild(pUser);
  pList = document.querySelectorAll(".pList");
}

function displayUsers() {
  divUsers.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    pCreator();
    let firstName = users[i].first_name;
    let lastName = users[i].last_name;
    let age = users[i].age;
    let city = users[i].city;
    let street = users[i].street;
    let postCode = users[i].postal_code;
    let idUser = users[i].id;

    pList[
      i
    ].textContent = `ID:${idUser} - ${firstName} ${lastName}  ${age}lat ${city} ${street} ${postCode} `;
  }
}
const form = document.querySelector("form");

// postBtn.addEventListener("click", (e) => {
//   e.preventDefault();

const inputName = document.querySelector("#inputName");
const inputLastName = document.querySelector("#inputLastName");
const inputCity = document.querySelector("#inputCity");
const inputAge = document.querySelector("#inputAge");
const inputStreet = document.querySelector("#inputStreet");
const inputPostCode = document.querySelector("#inputPostCode");

var user = {
  first_name: inputName.value,
  last_name: inputLastName.value,
  age: inputAge.value,
  city: inputCity.value,
  postal_code: inputPostCode.value,
  street: inputStreet.value,
};
form.addEventListener("submit", (e) => {
  e.preventDefault();

  var bodyFormData = new FormData();
  bodyFormData.append("first_name", inputName.value);
  bodyFormData.append("last_name", inputLastName.value);
  bodyFormData.append("age", inputAge.value);
  bodyFormData.append("city", inputCity.value);
  bodyFormData.append("postal_code", inputPostCode.value);
  bodyFormData.append("street", inputStreet.value);

  axios({
    method: "post",
    url: "https://fronttest.ekookna.pl/user",
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      throw err;
    });
});

getIdBtn.addEventListener("click", () => {
  let id = prompt("Podaj ID użytkownika którego chcesz wyświetlić");

  axios
    .get(`http://fronttest.ekookna.pl/user/${id} `)
    .then(function (response) {
      // handle success
      console.log(response);
      console.log(users);

      users.push(response.data.user);
      console.log(users);
      displayUsers();
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
});

updateBtn.addEventListener("click", () => {
  let updateIdUser = prompt("Podaj ID użytkownika którego chcesz edytować");

  axios
    .get(`https://fronttest.ekookna.pl/user/${updateIdUser} `)
    .then(function (response) {
      console.log(response);

      console.log(response.data.user.first_name);

      var bodyFormData = new FormData();
      bodyFormData.append("first_name", inputName.value);
      bodyFormData.append("last_name", inputLastName.value);
      bodyFormData.append("age", inputAge.value);
      bodyFormData.append("city", inputCity.value);
      bodyFormData.append("postal_code", inputPostCode.value);
      bodyFormData.append("street", inputStreet.value);
      bodyFormData.append("id", updateIdUser);
      bodyFormData.append("_method", "put");

      axios({
        method: "post",
        url: `https://fronttest.ekookna.pl/user/${updateIdUser}`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (err) {
          throw err;
        });
    });
});

deleteBtn.addEventListener("click", () => {
  let deleteIdUser = prompt("Podaj ID użytkownika którego chcesz usunać");

  var bodyFormData = new FormData();

  bodyFormData.append("id", deleteIdUser);
  bodyFormData.append("_method", "delete");

  axios({
    method: "post",
    url: `https://fronttest.ekookna.pl/user/${deleteIdUser}`,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      throw err;
    });
});

// searchBox.addEventListener("input", (e) => {
//   pList = [...document.querySelectorAll(".pList")];
//   let oldList = divUsers;
//   const searchText = e.target.value.toLowerCase();

//   let newPList = [...pList];
//   var displaySeaching = [];
//   for (let i = 0; i < pList.length; i++) {
//     let stringP = pList[i].innerHtml;
//     console.log(stringP);
//     var word = stringP.split(" ");

//     var lastName = word[3];
//     console.log(lastName);

//     console.log(lastName.toLowerCase().includes(searchText));
//     if (lastName.toLowerCase().includes(searchText)) {
//       displaySeaching.push(pList[i]).innerHtml;
//       console.log(displaySeaching);
//       console.log(" zdziala?");
//     } else {
//       console.log("nie dziala?");
//     }
//   }
//   divUsers.innerHtml = "";
//   displaySeaching.forEach((e) => {
//     let pSearching = document.createElement("p");
//     pSearching.innerHtml = e.innerHtml;
//     console.log(divUsers);
//     divUsers.appendChild(pSearching);
//   });
// });
searchBox.addEventListener("input", (e) => {
  console.log(users);

  users.forEach((e) => {
    console.log(e.lastName);
  });
});
