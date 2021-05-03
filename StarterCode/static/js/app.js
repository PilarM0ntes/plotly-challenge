const file = "samples.json";

// Variables
let names;
let metadata;
let samples;

// Read the JSON file & populate the dropdown
function startFile(){
    d3.json(file).then(function(data){
        //console.log(data);
        names = data.names;
        metadata = data.metadata;
        samples = data.samples;
        // Create the dropdown options
        let menu = d3.select("#selDataset");
        names.forEach((element) => {
            menu.append("option")
            .text(element)
            .attr("value", element);
        });
    });
}

function buildHorBar(nameID){
    d3.json(file).then(function(data){
        let samples = data.samples;
        samples.forEach((sample) =>{
            if (sample["id"] === nameID) {
                // Sort value by sample values
                
                let result = Object.keys(sample)
                    .map(key => {return {key, val: sample[key]}})
                    .sort((a,b) => parseInt(b.sample_values) - parseInt(a.sample_values));

                
                // Assign variables & get the top 10

                let chart_values = result[2]["val"].slice(0,10).reverse();
                let labels = result[1]["val"].slice(0,10).reverse();
                let hover_text = result[3]["val"].slice(0,10).reverse();

                // Add "OTU" to the labels
                labels = labels.map(item => "OTU " + item);

                console.log(chart_values);

                let bar_data = [{
                    type: 'bar',
                    x: chart_values,
                    y: labels,
                    text: hover_text,
                    orientation: 'h'
                }];

                let bar_layout = {
                    width: 500,
                    height: 800,
                    margin:{
                        l: 100,
                        r: 100,
                        t: 10,
                        b: 100
                    }
                }

                Plotly.newPlot("bar", bar_data, bar_layout);
            }
        });

    });
}

// Event listener for dropdown
function optionChanged(nameID){
    console.log(nameID);
    buildHorBar(nameID);
}



startFile();

//Event Listener for 

//createDropdown(bellyData.names);
// const dataPromise = d3.json(file);
// console.log("Data promise: ", dataPromise);
