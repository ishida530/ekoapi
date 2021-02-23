const getBtn = document.querySelector("#get");
const postBtn = document.querySelector("#post");

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
  pUser.setAttribute("id", `${index}`);
  pUser.setAttribute("class", `pList`);

  divUsers.appendChild(pUser);
  pList = document.querySelectorAll(".pList");
}

function displayUsers() {
  for (let i = 0; i < users.length; i++) {
    pCreator();
    let firstName = users[index].first_name;
    let lastName = users[index].last_name;
    let age = users[index].age;
    let city = users[index].city;
    let street = users[index].street;
    let postCode = users[index].postal_code;
    let idUser = users[index].id;

    pList[
      index
    ].textContent = `ID:${idUser} - ${firstName} ${lastName}  ${age}lat ${city} ${street} ${postCode} `;
    index++;
  }
}

postBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const inputName = document.querySelector("#inputName");
  const inputLastName = document.querySelector("#inputLastName");
  const inputcity = document.querySelector("#inputCity");
  const inputAge = document.querySelector("#inputAge");
  const inputStreet = document.querySelector("#inputStreet");
  const inputPostCode = document.querySelector("#inputPostCode");

  //   send a POST request

  axios
    .post("http://fronttest.ekookna.pl/user", {
      first_name: inputName,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});
