var formattedData = {
	labels : getLabels(),
	datasets : [
		{
			fillColor : "#48A497",
			strokeColor : "#48A4D1",
			data : getData()
		}
	]
}
var barData = {
	labels : ["#parrot","#meme"],
	datasets : [
		{
			fillColor : "#48A497",
			strokeColor : "#48A4D1",
			data : [20,40]
		}

	]
}
var graph = new Graph();
graph.drawGraph($("#canvas"), getWidth(), getHeight(), formattedData);