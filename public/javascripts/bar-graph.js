


function Graph(){
	this.drawGraph = function(canvas, width, height, data){
		canvas.attr("width", width);
		canvas.attr("height", height);
    	var ctx = canvas.get(0).getContext("2d");
    	var chart = createGraph(ctx, data);
    }



	var createGraph = function(context, data){
				var graph = new Chart(context).Bar(data,
				{
					responsive : true
				}
				);
				return graph;
			}


}