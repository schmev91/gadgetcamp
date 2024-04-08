export function AccountCtrl($scope, $rootScope, app, $loadingOff) {
  $rootScope.page = "account";
  app
    .init()
    .then(function () {})
    .then($loadingOff);
}
