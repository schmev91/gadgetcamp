export function HomeCtrl($scope, $rootScope, $http, $interval, app) {
  $rootScope.page = "home";

  app.init().then(function () {
    //GET BANNER DATA
    $http.get("./src/json/home.banners.json").then(({ data }) => {
      $scope.banners = data;
    });

    const homeHandler = async function () {
      //load sale products
      $scope.saleProducts = [];
      const probSortByDiscount = $rootScope.products.sort(
        (p1, p2) => p2.discountPercentage - p1.discountPercentage
      );
      for (let i = 0; i < 2; i++) {
        $scope.saleProducts.push(probSortByDiscount.slice(i * 6, (i + 1) * 6));
      }

      //load best rated products
      $scope.bestRatedProducts = [];
      const prodSortByRating = $rootScope.products.sort(
        (p1, p2) => p2.rating - p1.rating
      );
      for (let i = 0; i < 3; i++) {
        $scope.bestRatedProducts.push(
          prodSortByRating.slice(i * 5, (i + 1) * 5)
        );
      }

      //load daily suggestion

      $scope.dailySug_data = [
        {
          name: "tab-foryou",
          text: "For you",
          icon: {
            class: "fa-heart",
            color: "#ff8787",
          },
          banner: "./src/img/banner/foryou-banner.jpg",
          products: shuffleArray($rootScope.products, 22),
        },
        {
          name: "tab-tech",
          text: "Tech",
          icon: {
            class: "fa-microchip",
            color: "#5200ff",
          },
          banner: "./src/img/banner/tech-banner.jpg",
          products: $rootScope.products.filter(({ category }) =>
            ["smartphones", "laptops", "automotive"].includes(category)
          ),
        },
        {
          name: "tab-new_arrivals",
          text: "New Arrivals",
          icon: {
            class: "fa-bell",
            color: "#ffd43b",
          },
          banner: "./src/img/banner/new_arrivals-banner.jpg",
          products: $rootScope.products
            .sort((p1, p2) => p2.id - p1.id)
            .slice(0, 22),
        },
      ];
    };
    homeHandler();

    // SALE-SECTION
    // sale countdown
    var now = new Date(),
      endOfDay = new Date(now);

    endOfDay.setHours(23, 59, 59, 999);

    function calculateCountdown() {
      var remainingTime = endOfDay.getTime() - now.getTime();

      $scope.countdown = {
        hours: Math.floor(remainingTime / (1000 * 60 * 60)),
        minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
      };

      for (const unit in $scope.countdown) {
        if ($scope.countdown[unit] < 10)
          $scope.countdown[unit] = "0" + $scope.countdown[unit];
      }
    }

    // Calculate countdown initially
    calculateCountdown();

    // Update countdown every second
    var intervalPromise = $interval(function () {
      now = new Date();
      calculateCountdown();
    }, 1000);

    // Cancel interval on controller destruction to prevent memory leaks
    $scope.$on("$destroy", function () {
      $interval.cancel(intervalPromise);
    });
  });
}

function shuffleArray(array, length) {
  const shuffledArray = array.slice(); // Create a shallow copy of the original array
  for (let i = shuffledArray.length - 1; i > length - 1; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray.slice(0, length); // Return a new array with specified length
}
