import {
  addUser,
  deleteUser,
  getUserList,
  isUsernameExist,
  updateUser,
  fileToBase64,
  addProduct,
  getProducts,
  saveProducts,
} from "../module/utility.js";

export function AdminCtrl($scope, $rootScope, app, $loadingOff, $location) {
  $rootScope.page = "admin";

  if (!$rootScope.activeUser && !$rootScope.activeUser.isAdmin)
    $location.path("/home");

  app
    .init()
    .then(function () {
      $scope.$apply(function () {
        // start apply
        $scope.tablesData = [
          {
            name: "tab-users",
            text: "Users",
            icon: {
              class: "fa-solid fa-user",
            },
          },
          {
            name: "tab-products",
            text: "Products",
            icon: {
              class: "fa-brands fa-product-hunt",
            },
          },
        ];
        $scope.usersList = getUserList();

        $scope.sortOptions = [
          { text: "Update time", value: "id" },
          { text: "Price", value: "price" },
          { text: "Rating", value: "rating" },
        ];

        // end apply
      });
    })
    .then($loadingOff);

  $scope.addUser = function () {
    const { addUser: user, usersList } = $scope;
    if (!isUsernameExist(user.username)) {
      addUser(user);
      usersList.push(user);
    } else alert("Username exist");
  };
  $scope.openUpdateUser = function (index) {
    $scope.updateUser = angular.copy($scope.usersList[index]);
    $scope.onUpdateUsername = $scope.updateUser.username;
  };
  $scope.updatingUser = function () {
    const { updateUser: user, usersList } = $scope;
    updateUser($scope.onUpdateUsername, user);
    $scope.usersList = getUserList();
  };
  $scope.deleteUser = function (index) {
    deleteUser(index);
    $scope.usersList = getUserList();
  };

  $scope.resetBegin = function () {
    $scope.begin = 0;
    $scope.searchText = "";
  };

  $scope.paginating = function (value) {
    $scope.begin = value;
  };

  $scope.addingProduct = function () {
    var file = document.getElementById("upload-productImg").files[0];
    if (file) {
      const { addProduct: pData } = $scope;
      fileToBase64(file, function (base64) {
        pData.images = [base64];
        pData.thumbnail = base64;
        pData.id = $rootScope.products.length;
        $rootScope.products.push(pData);
      });
    } else console.log("you have to upload the image my little chick");
  };
  $scope.deleteProduct = function (index) {
    let products = getProducts().filter((p) => p.id != index);
    saveProducts(products);
    $rootScope.products = getProducts();
  };
  $scope.openUpdateProduct = function (index) {
    $scope.updatingProduct = angular.copy(
      $rootScope.products.find((p) => p.id == index)
    );
  };
  $scope.updateProduct = function () {
    let products = getProducts(),
      pIndex = products.findIndex((p) => p.id == $scope.updatingProduct.id);
    products[pIndex] = $scope.updatingProduct;
    saveProducts(products);
    $rootScope.products = getProducts();
  };
}
