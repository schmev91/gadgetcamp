export function HomeCtrl($scope, $rootScope, $http) {
  $rootScope.page = "home";
  // banner data
  $scope.banners = [
    {
      link: "",
      active: true,
      image: "./src/img/banner/iphonexs-banner.jpg",
    },
    {
      link: "",
      image: "./src/img/banner/macbookpro-banner.jpg",
    },
    {
      link: "",
      image: "./src/img/banner/furniture-banner.jpg",
    },
    {
      link: "",
      image: "./src/img/banner/womens_fashion-banner.jpg",
    },
  ];

  if (!$rootScope.categoryList) {
    $http.get("https://dummyjson.com/products/categories").then((res) => {
      $rootScope.categoryList = res.data;
    });
  }

  if (!$rootScope.products) {
    $http.get("https://dummyjson.com/products?limit=100").then((res) => {
      $rootScope.products = res.data.products;
      $scope.viewProducts = $rootScope.products.slice(0, 12);
      // console.log(
      //   $rootScope.products.filter(({ category }) => {
      //     if (category == "automotive") return true;
      //   })
      // );
    });
  } else {
    $scope.viewProducts = $rootScope.products.slice(0, 12);
  }
}
