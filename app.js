const getBtn = document.querySelector("#get");
const postBtn = document.querySelector("#post");
const getIdBtn = document.querySelector("#getID");
const updateBtn = document.querySelector("#put");
const deleteBtn = document.querySelector("#delete");
const searchBox = document.querySelector(".inputSearch");
const min = document.querySelector("#min");
const max = document.querySelector("#max");
const setAgeBtn = document.querySelector("#setAge");
const clearBtn = document.querySelector(".clear");
const divUsers = document.querySelector(".listUsers");

let users = [];
var index = 0;

getUsers();

function getUsers() {
  getBtn.addEventListener("click", () => {
    axios
      .get("https://fronttest.ekookna.pl/")
      .then(function (response) {
        console.log(response);
        users = response.data.users;
        displayUsers();
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  });
}

clearBtn.addEventListener("click", () => {
  divUsers.innerHTML = "";
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
const addUserBtn = document.querySelector("#post");

const inputName = document.querySelector("#inputName");
const inputLastName = document.querySelector("#inputLastName");
const inputCity = document.querySelector("#inputCity");
var inputAge = document.querySelector("#inputAge");
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
addUserBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (
    inputName.value !== "" &&
    inputLastName.value !== "" &&
    inputCity.value !== "" &&
    inputAge.value > "" &&
    inputPostCode.value !== "" &&
    inputStreet.value !== ""
  ) {
    // inputAge = parseInt(inputAge.value);

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
  } else return alert("Wypełnij pola prawidłowo");
  alert("Użytkownik został dodany do bazy");
});

getIdBtn.addEventListener("click", () => {
  let id = prompt("Podaj ID użytkownika którego chcesz wyświetlić");

  axios
    .get(`https://fronttest.ekookna.pl/user/${id} `)
    .then(function (response) {
      // handle success
      console.log(response);

      users.push(response.data.user);
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

updateBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let updateIdUser = prompt("Podaj ID użytkownika którego chcesz edytować");

  if (
    inputName.value !== "" &&
    inputLastName.value !== "" &&
    inputCity.value !== "" &&
    inputAge.value !== "" &&
    inputPostCode.value !== "" &&
    inputStreet.value !== ""
  ) {
    axios
      .get(`https://fronttest.ekookna.pl/user/${updateIdUser} `)
      .then(function (response) {
        console.log(response);

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
  } else return alert("Wypełnij wszystkie pola prawidłowo!");
  alert("Użytkownik został zaktualizowany");
});

deleteBtn.addEventListener("click", () => {
  let deleteIdUser = prompt("Podaj ID użytkownika którego chcesz usunać");
  if (deleteIdUser.length != "") {
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

        alert("Użytkownik został usunięty z");
        getUsers();
        displayUsers();
      })
      .catch(function (err) {
        throw err;
      });
  } else alert("Wprowadz poprawny numer ID");
});

searchBox.addEventListener("keydown", (e) => {
  const searchText = e.target.value.toLowerCase();

  for (let i = 0; i < users.length; i++) {
    if (`${users[i].last_name.toLowerCase()}`.includes(searchText)) {
      users = users.filter(function (user) {
        return user.last_name.toLowerCase().includes(searchText);
      });
    } else {
      users = users;
    }
    displayUsers();
  }
});

setAgeBtn.addEventListener("click", () => {
  if (max.value != 0 && min.value != 0) {
    getUsers();
    for (let i = 0; i < users.length; i++) {
      function checkMin(user) {
        return user.age >= min.value && user.age <= max.value;
      }
      users = users.filter(checkMin);
      displayUsers();
    }
  } else alert("Ustaw poprawnie przedział min i max");
});
