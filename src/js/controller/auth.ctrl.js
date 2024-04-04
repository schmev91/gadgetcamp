import * as u from "../module/utility.js";
export function AuthCtrl($scope, $rootScope, $routeParams, $location) {
  if ($location.path() == "/auth/logout") {
    sessionStorage.removeItem("activeUser");
    $rootScope.activeUser = undefined;
    $location.path("home");
  }
  if ($rootScope.activeUser) $location.path("home");

  $scope.register = function () {
    let userData = angular.copy($scope.userRegister);
    delete userData.reenterPassword;

    const isUserExist = !u.isEmpty(u.getUser(userData.username));
    if (isUserExist) {
      $scope.form.username.$invalid = true;
      $scope.userRegister.username = null;
      alert("Username exist");
    } else {
      u.addUser(userData);
      alert("Register successful");
      $location.path("auth/login");
    }
  };

  $scope.login = function () {
    if ($scope.form.$valid) {
      u.passwordVerification(...Object.values($scope.userLogin))
        .then((loginResult) => {
          if (!loginResult) return Promise.reject();
          else
            sessionStorage.setItem("activeUser", JSON.stringify(loginResult));
          $rootScope.activeUser = loginResult;
          $location.path("/home");
        })
        .catch(function () {
          alert("Invalid login credentials");
          $scope.userLogin.username = null;
          $scope.userLogin.password = null;
        });
    }
  };
}
