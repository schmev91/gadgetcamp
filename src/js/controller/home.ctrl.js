export function HomeCtrl($scope, $rootScope, $http) {
  $rootScope.page = "home";

  if (!$rootScope.categoryList) {
    $http.get("https://dummyjson.com/products/categories").then((res) => {
      $rootScope.categoryList = res.data;
    });
  }

  if (!$rootScope.products) {
    $http.get("https://dummyjson.com/products?limit=100").then((res) => {
      $rootScope.products = res.data.products;
      $scope.viewProducts = $rootScope.products.splice(0, 12);
    });
  }
}
