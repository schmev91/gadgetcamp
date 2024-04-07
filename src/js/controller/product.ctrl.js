import { shuffleArray } from "../module/utility.js";

export function ProductCtrl($scope, $rootScope, $routeParams, app) {
  $rootScope.page = "product";

  app.init().then(function () {
    const productId = $routeParams.id;
    $scope.$apply(function () {
      //start apply
      $scope.p = $rootScope.products.find(({ id }) => id == productId);

      //total store rating
      let ratedProductCount = 0;
      $scope.storeRating =
        $rootScope.products.reduce((sum, { rating }) => {
          if (rating) {
            ratedProductCount++;
            return (sum += rating);
          }
        }, 0) / ratedProductCount;

      //load related products
      let relatedProducts = $rootScope.products.filter(
        ({ id, category }) => $scope.p.id != id && $scope.p.category == category
      );
      $scope.relatedProductsCarousel = [];

      relatedProducts.forEach((p, index) => {
        if (index % 4 == 0)
          $scope.relatedProductsCarousel.push(relatedProducts.splice(0, 4));
      });

      let suggestionProd_amount = 6,
        suggestionProd_page = 4,
        suggestionProducts = shuffleArray(
          $rootScope.products.filter(({ id }) => id != $scope.p.id),
          suggestionProd_amount * suggestionProd_page
        );
      $scope.suggestionCarousel = [];
      suggestionProducts.forEach((p) => {
        $scope.suggestionCarousel.push(
          suggestionProducts.splice(0, suggestionProd_amount)
        );
      });

      //end apply
    });
  });

  $scope.amountUp = function () {
    $scope.productAmount++;
  };
  $scope.amountDown = function () {
    if ($scope.productAmount > 1) $scope.productAmount--;
  };
}
