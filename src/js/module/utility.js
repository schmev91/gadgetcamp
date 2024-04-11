export function getUserList() {
  let userList = sessionStorage.getItem("userList");
  if (!userList) userList = [];
  else userList = JSON.parse(userList);

  return userList;
}

function saveUserlist(newUserlist) {
  sessionStorage.setItem("userList", JSON.stringify(newUserlist));
}

export function addUser(userData) {
  let userList = getUserList(),
    isUserExist = userList.find(
      ({ username }) => userData.username == username
    );

  if (!isUserExist) {
    userList.push(new user(...Object.values(userData)));

    saveUserlist(userList);
  }
}
export function updateUser(username, updatedUserData) {
  let userList = getUserList();
  let userIndex = userList.findIndex((user) => user.username === username);

  if (userIndex !== -1) {
    // Update the user data
    userList[userIndex] = updatedUserData;

    // Save the updated user list
    saveUserlist(userList);
    return true; // Return true to indicate success
  }

  return false; // Return false if the user was not found
}
export function deleteUser(index) {
  let userList = getUserList().filter((u, i) => i != index);

  saveUserlist(userList);
}

export function getUser(searching_username) {
  let userList = getUserList();

  return userList.find(({ username }) => username == searching_username);
}

export function isUsernameExist(username) {
  return !isEmpty(getUser(username));
}

export function passwordVerification(username, password) {
  const user = getUser(username);
  return Promise.resolve(
    !isEmpty(user) && user.password == password ? user : null
  );
}

export function isEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

function user(username, email, password, isAdmin = null) {
  return {
    username,
    email,
    password,
    isAdmin,
  };
}

export function shuffleArray(array, length) {
  const shuffledArray = array.slice(); // Create a shallow copy of the original array
  for (let i = shuffledArray.length - 1; i > length - 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0, length); // Return a new array with specified length
}

export function getSuggestionsCarousel(products, amount, page) {
  let suggestionProducts = shuffleArray(products, amount * page),
    carousel = [];
  suggestionProducts.forEach((p) => {
    carousel.push(suggestionProducts.splice(0, amount));
  });
  return carousel;
}

export function getProducts() {
  let products = sessionStorage.getItem("products");
  if (!products) products = [];
  else products = JSON.parse(products);

  return products;
}

export function saveProducts(newProducts) {
  sessionStorage.setItem("products", JSON.stringify(newProducts));
}

export function addProduct(data) {
  let products = getProducts();
  products.push({
    id: products.length,
    ...data,
  });
  saveProducts(products);
}

export function fileToBase64(file, callback) {
  var reader = new FileReader();
  reader.onload = function (event) {
    callback(event.target.result);
  };
  reader.readAsDataURL(file);
}
