export function ShopCtrl(app, $scope, $rootScope, $anchorScroll) {
  $rootScope.page = "shop";

  app.init().then(function () {
    $scope.$apply(function () {
      $scope.viewProducts = $rootScope.products;
      $scope.pageCount = Math.ceil($scope.viewProducts.length / 20);
      reloadPagination();

      $scope.begin = 0;
    });
  });
  $scope.paginating = function (value) {
    $anchorScroll();
    $scope.begin = value;
  };
  function reloadPagination() {
    $scope.paginationCount = [];
    for (let index = 0; index < $scope.pageCount; index++)
      $scope.paginationCount.push(index + 1);
  }
}
