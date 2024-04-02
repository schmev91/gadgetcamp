import { HomeCtrl } from "./controller/home.ctrl.js";
import { AccountCtrl } from "./controller/account.ctrl.js";
import { CartCtrl } from "./controller/cart.ctrl.js";
import { ProductsCtrl } from "./controller/products.ctrl.js";
import { ShopCtrl } from "./controller/shop.ctrl.js";

angular
  .module("App", ["ngRoute"])
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
      .when("/products/:category", {
        templateUrl: "./src/template/search.html",
        controller: "HomeController",
      })
      .when("/account", {
        templateUrl: "./src/template/account.html",
        controller: "AccountController",
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
  .controller("CartController", CartCtrl)
  .controller("ProductsController", ProductsCtrl)
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
