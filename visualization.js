function setupVisualization(selector) {


}

function happyNumberVisualization(max, base, selector) {

    var nodes = [];
    var labelAnchors = [];
    var labelAnchorLinks = [];
    var links = [];

    var nodeMapping = [];

    function addNode(i) {
        var node = {
            label:(i).toString(base)
        };
        nodeMapping[i] = nodes.push(node) - 1;
        labelAnchors.push({
            node:node
        });
        labelAnchors.push({
            node:node
        });
    }


    happyNumberMap(max, base, function (i, happy) {
        if (nodeMapping[i] == undefined) {
            addNode(i);
        }
        if (nodeMapping[happy] == undefined) {
            addNode(happy);
        }

        links.push({
            source:nodeMapping[i],
            target:nodeMapping[happy],
            weight:1});
        labelAnchorLinks.push({
            source:nodeMapping[i],
            target:nodeMapping[happy],
            weight:1});
    });


    var w = 800, h = 800;

    var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([w, h])
        .linkDistance(10)
        .charge(-100)
        .on("tick", tick)
        .start();

    d3.select(selector + " *").remove();

    var svg = d3.select(selector).append("svg")
        .attr("width", w)
        .attr("height", h);

    // Per-type markers, as they don't inherit styles.
    svg.append("svg:defs").selectAll("marker")
        .data(["suit", "arrow"])
        .enter().append("svg:marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", -1.5)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("svg:path")
        .attr("d", "M0,-5L10,0L0,5");

    var path = svg.append("svg:g").selectAll("path")
        .data(force.links())
        .enter().append("svg:path")
        .attr("class", function (d) {
            return "link arrow";
        })
        .attr("marker-end", function (d) {
            return "url(#arrow)";
        });

    var circle = svg.append("svg:g").selectAll("circle")
        .data(force.nodes())
        .enter().append("svg:circle")
        .attr("r", 6)
        .call(force.drag);

    var text = svg.append("svg:g").selectAll("g")
        .data(force.nodes())
        .enter().append("svg:g");

    // A copy of the text with a thick white stroke for legibility.
    text.append("svg:text")
        .attr("x", 8)
        .attr("y", ".31em")
        .attr("class", "shadow")
        .text(function (d) {
            return d.label;
        });

    text.append("svg:text")
        .attr("x", 8)
        .attr("y", ".31em")
        .text(function (d) {
            return d.label;
        });

    function tick() {
        path.attr("d", function (d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy * 2);
            return "M" + d.source.x + "," + d.source.y + "," + d.target.x + "," + d.target.y;
        });

        circle.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

        text.attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });
    }
}