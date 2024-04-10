function getUserList() {
  let userList = sessionStorage.getItem("userList");
  if (!userList) userList = [];
  else userList = JSON.parse(userList);

  return userList;
}
function saveUserlist(newUserlist) {
  sessionStorage.setItem("userList", JSON.stringify(newUserlist));
}

export function addUser(userData) {
  let userList = getUserList();
  userList.push(new user(...Object.values(userData)));

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

function user(username, email, password) {
  return {
    username,
    email,
    password,
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
