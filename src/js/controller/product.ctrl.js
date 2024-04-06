export function ProductCtrl($scope, $rootScope, $routeParams, app) {
  $rootScope.page = "product";

  app.init().then(function () {
    const productId = $routeParams.id;
    $scope.$apply(function () {
      $scope.p = $rootScope.products.find(({ id }) => id == productId);

      //load best rated products
      $scope.bestRatedProducts = [];
      let prodSortByRating = $rootScope.products.sort(
          (p1, p2) => p2.rating - p1.rating
        ),
        productAmount = 3;

      prodSortByRating = prodSortByRating.filter(({ id }) => id != productId);
      for (let i = 0; i < 3; i++) {
        $scope.bestRatedProducts.push(
          prodSortByRating.slice(i * productAmount, (i + 1) * productAmount)
        );
      }
    });
  });
}
