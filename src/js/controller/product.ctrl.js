export function ProductCtrl(app, $scope, $rootScope, $routeParams) {
  $rootScope.page = "product";

  app.init().then(function () {
    console.log("I am product");
    console.log($routeParams.id);
  });
}
