// from data.js
var tableData = data;
var submit = d3.select("#filter-btn");

// YOUR CODE HERE!
var tbody = d3.select("tbody");

function tableRender(arr){
    arr.forEach((ufodata) => {
        var row = tbody.append("tr");
        Object.entries(ufodata).forEach(([key, value]) => {
            var cell = tbody.append("td");
            cell.text(value);
        });
    });
}

tableRender(tableData);

submit.on("click", function() {
    d3.event.preventDefault();

    tbody.selectAll("*").remove();

    var filter = {};

    var datevalue = d3.select("#datetime").property("value").trim();
    var cityvalue = d3.select("#city").property("value").toLowerCase().trim();
    var statevalue = d3.select("#state").property("value").toLowerCase().trim();
    var countryvalue = d3.select("#country").property("value").toLowerCase().trim();
    var shapevalue = d3.select("#shape").property("value").toLowerCase().trim();
    
    if (datevalue != "")
        filter['datetime'] = datevalue;
    if(cityvalue != "")
        filter['city'] = cityvalue;
    if(statevalue != "")
        filter['state'] = statevalue;
    if(countryvalue != "")
        filter['country'] = countryvalue;
    if(shapevalue != "")
        filter['shape'] = shapevalue;

    var filterdata = tableData.filter(function(ufo) {
        for (var key in filter) {
            if (ufo[key] === undefined || ufo[key] != filter[key])
            return false;
        }
        return true;
    });

    if (datevalue === "" && cityvalue === "" && statevalue === "" && countryvalue === "" && shapevalue === ""){
        filterdata = tableData;
    }

    tableRender(filterdata);

});