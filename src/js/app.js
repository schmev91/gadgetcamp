import { HomeCtrl } from "./controller/home.ctrl.js";
import { AccountCtrl } from "./controller/account.ctrl.js";
import { CartCtrl } from "./controller/cart.ctrl.js";
import { ProductsCtrl } from "./controller/products.ctrl.js";

angular
  .module("App", ["ngRoute"])
  .config(function ($routeProvider) {
    $routeProvider
      .when("/home", {
        templateUrl: "./src/template/home.html",
        controller: "HomeController",
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
  .controller("AccountController", AccountCtrl)
  .controller("CartController", CartCtrl)
  .controller("ProductsController", ProductsCtrl);
