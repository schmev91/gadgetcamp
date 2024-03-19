angular
  .module("App", ["ngRoute"])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "./src/template/home.html",
        controller: "HomeController",
      })
      .when("/product", {
        templateUrl: "./src/template/home.html",
        controller: "ProductController",
      })
      .when("/cart", {
        templateUrl: "cart.html",
        controller: "CartController",
      })
      .otherwise({
        // redirectTo: "/",
        template: "<h1>404 not found</h1>",
      });

    // $locationProvider.html5Mode(true);
  })
  .controller("HomeController", function () {
    console.log("aa");
  })
  .controller("ProductController", function () {
    // Controller logic for product page
  })
  .controller("CartController", function () {
    // Controller logic for cart page
  });
