appModule.filter('offset', function offset() {
  return function(input, start) {
      if(start) {
          start = parseInt(start, 10);
          return input.slice(start);
      } else {
          return input;
      }
  };
});

