import { getSuggestionsCarousel } from "../module/utility.js";
import * as Cart from "../module/cart.methods.js";

export function CartCtrl(
  $scope,
  $rootScope,
  $http,
  app,
  $loadingOff,
  $location,
  getBestRated
) {
  $rootScope.page = "cart";

  app
    .init()
    .then(function () {
      $scope.$apply(async function () {
        // START APPLY
        const { activeUser, products } = $rootScope;
        if (activeUser) {
          const { username } = activeUser;
          let cart = Cart.getUserCart(username);
          //creat and add test data if don't have a cart yet
          if (!cart) {
            await $http.get("./src/json/testCart.json").then(({ data }) => {
              Cart.update(username, data);
              cart = { username, products: data };
            });
          }
          console.log(cart);

          $scope.cartItems = cart.products.map((cartP) => {
            return { ...cartP, ...products.find((p) => p.id == cartP.id) };
          });
          $scope.quantityCollection = [];
          $scope.cartItems.forEach(({ quantity }, i) => {
            $scope.quantityCollection[i] = quantity;
            $scope.$watch(`quantityCollection[${i}]`, function () {
              if (!$rootScope.isLoading) {
                $scope.cartItems.forEach((item, i) => {
                  $scope.cartItems[i].quantity = $scope.quantityCollection[i];
                });
                Cart.update(username, $scope.cartItems);
              }
            });
          });
        } else $location.path("auth/login");

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
        // END APPLY
      });
      $scope.getTotalBilling = function () {
        let checkedItems = [],
          checkboxs = document.getElementsByClassName("itemCheckbox"),
          sum = 0;

        for (let i = 0; i < checkboxs.length; i++) {
          if (checkboxs[i].checked) {
            const { price, discountPercentage, quantity } = $scope.cartItems[i];
            sum += (price - (price * discountPercentage) / 100) * quantity;
          }
        }

        return sum;
      };
      $scope.amountUp = function (index) {
        $scope.quantityCollection[index] += 1;
        // console.log($scope.quantityCollection);
      };
      $scope.update = Cart.update;
      $scope.amountDown = function (index) {
        if ($scope.quantityCollection[index] > 1)
          $scope.quantityCollection[index] -= 1;
      };
      $scope.deleteItem = function (username, id) {
        Cart.deleteItem(username, id);
        $scope.cartItems = $scope.cartItems.filter((item) => item.id != id);
      };
    })
    .then($loadingOff);
}
