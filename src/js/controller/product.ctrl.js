export function ProductCtrl(app, $scope, $rootScope, $routeParams) {
  $rootScope.page = "product";

  app.init().then(function () {
    console.log("I am product");
    const productId = $routeParams.id;
    $scope.p = $rootScope.products.find(({ id }) => id == productId);

    console.log($scope.p);
  });
}
