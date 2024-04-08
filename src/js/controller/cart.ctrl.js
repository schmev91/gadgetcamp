export function CartCtrl($scope, $rootScope, app, $loadingOff) {
  $rootScope.page = "cart";

  app
    .init()
    .then(function () {})
    .then($loadingOff);
}
