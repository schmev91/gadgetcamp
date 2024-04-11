import * as u from "./module/utility.js";
import { HomeCtrl } from "./controller/home.ctrl.js";
import { AccountCtrl } from "./controller/account.ctrl.js";
import { CartCtrl } from "./controller/cart.ctrl.js";
import { ShopCtrl } from "./controller/shop.ctrl.js";
import { ProductCtrl } from "./controller/product.ctrl.js";
import { AuthCtrl } from "./controller/auth.ctrl.js";
import { AdminCtrl } from "./controller/admin.ctrl.js";

angular
  .module("App", ["ngRoute"])
  .run(function ($rootScope, $location) {
    //escape to turn off loading
    $rootScope.isLoading = true;
    $rootScope.toShop = function () {
      $location.path("shop");
    };
    $rootScope.setKeywords = function (keywords) {
      $rootScope.searchKeywords = keywords.toLowerCase();
      if ($rootScope.page == "shop") $rootScope.shopFilter();
    };

    u.addUser({
      username: "saito",
      email: "saito@hogwarts.edu.us",
      password: "123",
      isAdmin: true,
    });
  })
  .service("app", function ($rootScope, $http, $anchorScroll, $loadingOn) {
    this.init = async function () {
      $anchorScroll();
      //escape to turn off loading
      $loadingOn();

      if (!$rootScope.isDataLoaded) {
        let activeUser = sessionStorage.getItem("activeUser"),
          requiredData = [
            {
              name: "products",
              url: "https://dummyjson.com/products?limit=100",
            },
            {
              name: "categoryList",
              url: "https://dummyjson.com/products/categories",
            },
            {
              name: "banners",
              url: "./src/json/home.banners.json",
            },
          ];

        if (activeUser) $rootScope.activeUser = JSON.parse(activeUser);

        await Promise.all(
          requiredData.map(async ({ name, url }) => {
            let fetchedData = sessionStorage.getItem(name);
            if (!fetchedData) {
              await $http.get(url, { cache: true }).then(({ data }) => {
                if (name == "products") fetchedData = data.products;
                else fetchedData = data;
                sessionStorage.setItem(name, JSON.stringify(fetchedData));
              });
            } else {
              fetchedData = JSON.parse(fetchedData);
            }
            $rootScope[name] = fetchedData;
          })
        );

        $rootScope.isDataLoaded = true;
      } else return Promise.resolve();
    };
  })
  .factory("$loadingOn", function ($rootScope) {
    return function () {
      $rootScope.isLoading = true;
    };
  })
  .factory("$loadingOff", function ($rootScope) {
    return function () {
      setTimeout(() => {
        $rootScope.$apply(function () {
          $rootScope.isLoading = false;
        });
      }, 600);
    };
  })
  .service("getBestRated", function ($rootScope) {
    return function () {
      return $rootScope.products.sort((p1, p2) => p2.rating - p1.rating);
    };
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when("/admin", {
        templateUrl: "./src/template/admin.html",
        controller: "AdminController",
      })
      .when("/home", {
        templateUrl: "./src/template/home.html",
        controller: "HomeController",
      })
      .when("/shop", {
        templateUrl: "./src/template/shop.html",
        controller: "ShopController",
      })
      .when("/shop/category/:category", {
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
  .controller("AdminController", AdminCtrl)
  .controller("HomeController", HomeCtrl)
  .controller("ShopController", ShopCtrl)
  .controller("ProductController", ProductCtrl)
  .controller("AccountController", AccountCtrl)
  .controller("AuthController", AuthCtrl)
  .controller("CartController", CartCtrl)
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
