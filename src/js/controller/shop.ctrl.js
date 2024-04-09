export function ShopCtrl(
  app,
  $scope,
  $rootScope,
  $routeParams,
  $anchorScroll,
  $loadingOff
) {
  $rootScope.page = "shop";

  app
    .init()
    .then(function () {
      $scope.categorize = {};
      $scope.$apply(function () {
        $rootScope.categoryList.forEach((category) => {
          $scope.categorize[category] = false;
        });
        if ($routeParams.category) {
          $scope.categorize[$routeParams.category] = true;
        }
        $scope.sortOptions = [
          { text: "Update time", value: "id" },
          { text: "Price", value: "price" },
          { text: "Rating", value: "rating" },
        ];

        $scope.filteredProducts = $rootScope.products;
        $scope.productLimit = 20;

        $scope.begin = 0;
        $scope.$watch("filteredProducts", reloadPagination, true);
      });
    })
    .then($loadingOff);

  $scope.paginating = function (value) {
    $anchorScroll();
    $scope.begin = value;
  };
  $scope.shopFilter = function (p = null) {
    if (p) {
      const { categorize, priceRange } = $scope,
        { searchKeywords } = $rootScope;
      let isCategoryMatching = true,
        isPriceRangeMatching = true,
        isKeywordsMatching = true;
      if (Object.values(categorize).some((b) => b)) {
        isCategoryMatching = Object.keys(categorize).some((c) => {
          return categorize[p.category];
        });
      }
      const afterDiscount = (p.price * (100 - p.discountPercentage)) / 100;

      if (priceRange) {
        const { from, to } = priceRange;
        if (from && !(afterDiscount >= from)) isPriceRangeMatching = false;
        if (to && !(afterDiscount <= to)) isPriceRangeMatching = false;
      }

      if (searchKeywords) {
        isKeywordsMatching = [
          p.title.toLowerCase().includes(searchKeywords),
          p.description.toLowerCase().includes(searchKeywords),
        ].some((b) => b);
      }

      return isCategoryMatching && isPriceRangeMatching && isKeywordsMatching;
    } else {
      $scope.filteredProducts = $rootScope.products;
    }
  };
  $rootScope.shopFilter = $scope.shopFilter;

  function reloadPagination() {
    $scope.begin = 0;
    $scope.paginationCount = [];
    $scope.pageCount = Math.ceil(
      $scope.filteredProducts.length / $scope.productLimit
    );
    for (let index = 0; index < $scope.pageCount; index++)
      $scope.paginationCount.push(index + 1);
  }
}
