export function AdminCtrl($scope, $rootScope, app, $loadingOff, $location) {
  $rootScope.page = "admin";

  app
    .init()
    .then(function () {
      console.log("admin desu yo");
    })
    .then($loadingOff);
}
