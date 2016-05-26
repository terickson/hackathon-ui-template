appModule
	.directive('wwtUserTypeahead', wwtUserTypeahead);

function wwtUserTypeahead() {
	return {
	    restrict: 'EA',

	    templateUrl: 'wwtusertypeahead/wwtusertypeahead.html',

	    scope: {
	        wwtUserTypeaheadFocus: "@",
	        wwtUserTypeaheadModel: "=",
	        wwtUserTypeaheadIsSnuser: "@",
	        wwtUserTypeaheadTabIndex: "@",
	        wwtUserTypeaheadOnSelect: "&",
	        wwtUserTypeaheadInputName: "@",
	        wwtUserTypeaheadInputRequired: "@"
	    },

	    replace: true,

	    controller: 'WwtUserTypeaheadCtrl'
	};
}
