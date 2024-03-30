export function HomeCtrl($scope, $rootScope, $http) {
  $rootScope.page = "home";

  if (!$rootScope.categoryList) {
    $http.get("https://dummyjson.com/products/categories").then((res) => {
      $rootScope.categoryList = res.data;
    });
  }

  $http.get("https://dummyjson.com/products/2").then((res) => {
    $scope.p = res.data;
  });
}
