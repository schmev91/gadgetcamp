import { getSuggestionsCarousel } from "../module/utility.js";

export function ProductCtrl(
  $scope,
  $rootScope,
  $routeParams,
  app,
  $loadingOff
) {
  $rootScope.page = "product";

  app
    .init()
    .then(function () {
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
          ({ id, category }) =>
            $scope.p.id != id && $scope.p.category == category
        );
        $scope.relatedProductsCarousel = [];

        relatedProducts.forEach((p, index) => {
          if (index % 4 == 0)
            $scope.relatedProductsCarousel.push(relatedProducts.splice(0, 4));
        });

        $scope.suggestionCarousel = getSuggestionsCarousel(
          $rootScope.products,
          6,
          4
        );

        //end apply
      });
    })
    .then($loadingOff);

  $scope.amountUp = function () {
    $scope.productAmount++;
  };
  $scope.amountDown = function () {
    if ($scope.productAmount > 1) $scope.productAmount--;
  };
}
