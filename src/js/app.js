import { HomeCtrl } from "./controller/home.ctrl.js";
import { AccountCtrl } from "./controller/account.ctrl.js";
import { CartCtrl } from "./controller/cart.ctrl.js";
import { ShopCtrl } from "./controller/shop.ctrl.js";
import { ProductCtrl } from "./controller/product.ctrl.js";
import { AuthCtrl } from "./controller/auth.ctrl.js";

angular
  .module("App", ["ngRoute"])
  .service("app", function ($rootScope, $http) {
    this.init = function () {
      if (!$rootScope.isDataLoaded) {
        let activeUser = sessionStorage.getItem("activeUser");
        if (activeUser) $rootScope.activeUser = JSON.parse(activeUser);

        return Promise.all([
          $http.get("https://dummyjson.com/products?limit=100", {
            cache: true,
          }),
          $http.get("https://dummyjson.com/products/categories", {
            cache: true,
          }),
        ]).then(([{ data: productsData }, { data: categoriesData }]) => {
          $rootScope.products = productsData.products;
          $rootScope.categoryList = categoriesData;
          $rootScope.isDataLoaded = true;
        });
      } else return Promise.resolve();
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "./src/template/home.html",
        controller: "HomeController",
      })
      .when("/shop", {
        templateUrl: "./src/template/shop.html",
        controller: "ShopController",
      })
      .when("/products/:id", {
        templateUrl: "./src/template/product.html",
        controller: "ProductController",
      })
      .when("/products/category/:category", {
        templateUrl: "./src/template/search.html",
        controller: "HomeController",
      })
      .when("/account", {
        templateUrl: "./src/template/account.html",
        controller: "AccountController",
      })
      .when("/auth/login", {
        templateUrl: "./src/template/login.html",
        controller: "AuthController",
      })
      .when("/auth/register", {
        templateUrl: "./src/template/register.html",
        controller: "AuthController",
      })
      .when("/auth/logout", {
        templateUrl: "./src/template/login.html",
        controller: "AuthController",
      })
      .when("/cart", {
        templateUrl: "./src/template/cart.html",
        controller: "CartController",
      })
      .otherwise({
        redirectTo: "/home",
      });
  })
  .controller("HomeController", HomeCtrl)
  .controller("ShopController", ShopCtrl)
  .controller("AccountController", AccountCtrl)
  .controller("AuthController", AuthCtrl)
  .controller("CartController", CartCtrl)
  .controller("ProductController", ProductCtrl)
  .directive("maintainRatio", function () {
    return {
      restrict: "A",
      link: function (scope, element) {
        const observer = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target === element[0]) {
              element.css("height", element[0].clientWidth + "px");
            }
          }
        });
        observer.observe(element[0]);

        // Clean up the observer when the directive is destroyed
        scope.$on("$destroy", function () {
          observer.unobserve(element[0]);
        });
      },
    };
  });
