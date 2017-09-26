var SnippetsView = {
	  el: '#snippetsList',
	  data: {
	    snippets: []
	  },
	  ready: function() {
	    var that;
	    that = this;
		var req = new Request({
			url: "/users/1/snippets.json", 
			callback: function(res) {
				console.log(res);
	        	that.snippets = res;
	      	}
		}).send(); 
	},
	methods: {
		onClickButton: function(){
			console.log(this.snippets);
		}
	}
}


// window.onload = function(){
	snippets = new Vue(SnippetsView);
// }m


