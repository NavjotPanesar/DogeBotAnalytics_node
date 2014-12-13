


function Graph(){
	this.drawGraph = function(canvas, data){
    	var ctx = canvas.get(0).getContext("2d");
    	var chart = createGraph(ctx, data);
    }

    this.getGraphImage64 = function(width, height, data){
		//create a canvas in memory to draw to, but dont actually display it
		var canvas =
			$('<canvas/>',{'class':'radHuh'})
			.width(width)
			.height(height);
		var context = canvas.get(0).getContext("2d");
		var graph = createGraph(context, data);
		document.write(graph.toBase64Image());
    }


	var createGraph = function(context, data){
				var graph = new Chart(context).Bar(data,
				{
					responsive : true,
				}
				);
				return graph;
			}


}