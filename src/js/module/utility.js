function getUserlist() {
  let userList = sessionStorage.getItem("userList");
  if (!userList) userList = [];
  else userList = JSON.parse(userList);

  return userList;
}
function saveUserlist(newUserlist) {
  sessionStorage.setItem("userList", JSON.stringify(newUserlist));
}

export function addUser(userData) {
  let userList = getUserlist();
  userList.push(new user(...Object.values(userData)));

  saveUserlist(userList);
}

export function getUser(searching_username) {
  let userList = getUserlist();

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
