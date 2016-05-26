appModule.filter('atcLimit', function atcLimit() {
  return function(input, limit) {
      if(!limit || !input || input.length < limit) {
          return input;
      } else {
          return input.to(limit);
      }
  };
});

