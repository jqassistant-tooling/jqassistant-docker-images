var csvData = d3.csvParse($data);
var circleDataRoot = convert(csvData);
var w = 800, h = 800, margin = 20;
var diameter = w;
var view, node, circle;
drawCirclePacking(circleDataRoot);

function drawCirclePacking(circleDataRoot) {
    
    var svg = d3.select(element).append("svg:svg")
            .attr("width", w)
            .attr("height", h);
    var g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
    var format = d3.format(",d");

    var pack = d3.pack()
        .size([diameter - margin, diameter - margin]);

    var root = d3.hierarchy(circleDataRoot)
        .sum(function (d) {
            return d.size;
        })
        .sort(function (a, b) {
            return b.value - a.value;
        });

    var focusElem = root,
        nodes = pack(root).descendants();

    node = g.selectAll(".node")
        .data(pack(root).descendants())
        .enter().append("g")
        .attr("class", function (d) {
            return d.children ? "node" : "leaf node";
        })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        });

    node.append("title")
        .text(function (d) {
            return d.data.name + "\n" + format(d.value);
        });

    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .on("click", function(d) { if (focusElem !== d) zoom(d, focusElem), d3.event.stopPropagation(); });

    circle = g.selectAll("circle");

    var text = g.selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
        .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
        .text(function(d) { return d.data.name; });

    node = g.selectAll(".node,text");

    svg
        .on("click", function() { zoom(root, focusElem); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);
}

function zoom(d, focusElem) {
    var focus0 = focusElem; focusElem = d;

    var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focusElem.x, focusElem.y, focusElem.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focusElem || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focusElem ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focusElem) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focusElem) this.style.display = "none"; });
}

function zoomTo(v) {
    var k = diameter / v[2]; view = v;
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
}

function convert(data) {
    var components = _.keyBy(_.map(data, function (element) {
        return {
            id : element.Parent_Fqn,
            name: element.Parent_Fqn,
            size: 50,
            parent: null,
            children: []
        };
    }), 'id');
    var types = _.keyBy(_.map(data, function (element) {
        if (element.Child_Is_Leaf == "True") {
            return {
                id : element.Child_Fqn,
                name: element.Child_Name,
                size: 50,
                parent: null,
                children: []
            };
        }
    }), 'id');    
    _.forEach(data, function (element) {
        var parent = components[element.Parent_Fqn];        
        var child;    
        if (element.Child_Is_Leaf == "True") {
            child = types[element.Child_Fqn];
        } else {
            child = components[element.Child_Fqn];
        }
        if (child !== null && parent.children.indexOf(child) === -1) {
            parent.children.push(child);
            child.parent = parent;
        }
    });    

    var rootComponents = _.filter(_.values(components), function (component) {
        return !component.parent;
    });
    return {
        name: "SARF",
        children: rootComponents
    }
}
