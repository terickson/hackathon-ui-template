appModule.directive('backgroundImage', function backgroundImageDirective($timeout) {

    return function(scope, element, attrs){
        var url = attrs.backgroundImage;
        console.log(url);
        element.css({
            'background-image': 'url(' + url +')',
            'background-position': 'center center',
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            'border-radius': '50%',
            'content': ''
        });
    };
});
