export function HomeCtrl($scope, $rootScope, $http) {
  $rootScope.page = "home";
  $http.get("https://dummyjson.com/products/categories").then((res) => {
    $scope.categoryList = res.data;
  });
}
