export function ProductsCtrl($scope, $rootScope, $routeParams) {
  $rootScope.page = "products";
  $rootScope.title = $routeParams.category;
}
