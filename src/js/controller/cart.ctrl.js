import { getSuggestionsCarousel } from "../module/utility.js";

export function CartCtrl($scope, $rootScope, app, $loadingOff, getBestRated) {
  $rootScope.page = "cart";

  app
    .init()
    .then(function () {
      $scope.$apply(function () {
        //load best rated products
        $scope.bestRatedProductsCarousel = [];
        const prodSortByRating = getBestRated();
        for (let i = 0; i < 3; i++) {
          $scope.bestRatedProductsCarousel.push(
            prodSortByRating.slice(i * 6, (i + 1) * 6)
          );
        }
        $scope.suggestionCarousel = getSuggestionsCarousel(
          $rootScope.products,
          6,
          4
        );
      });
    })
    .then($loadingOff);
}
