appModule.filter('atcTextSearch', function atcLimit() {
  return function(input, fields, searchText) {
      var filteredResult = [];

      function evaluateField(record) {

          return function(key, value) {
              if(value.type === 'Text' && record[key] && record[key].toLowerCase().has(searchText.toLowerCase())) {
                  filteredResult.push(record);
              }
          };
      }

      if(!fields || !input || !searchText) {
          return input;
      } else {
          for(var k=0; k < input.length; k++) {
              Object.keys(fields, evaluateField(input[k]));
          }
          return filteredResult.unique();
      }
  };
});

