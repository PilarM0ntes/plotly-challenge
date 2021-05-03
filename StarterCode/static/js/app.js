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
        // Create the dropdown options
        let menu = d3.select("#selDataset");
        names.forEach((element) => {
            menu.append("option")
            .text(element)
            .attr("value", element);
        });
    });
}

function updateInformation(nameID){
    d3.json(file).then(function(data){
        console.log(data);
        
        let samples = data.samples;
        samples.forEach((sample) =>{
            if (sample["id"] === nameID) {
                createHorizontalChart(sample);
                createBubbleChart(sample);

            }
        });

        let metadata = data.metadata;
        metadata.forEach((metadataItem) =>{
            if(metadataItem["id"] === parseInt(nameID)){
                createDisplay(metadataItem);
            }
        });

    });
}



function createHorizontalChart(sample_data){
    // Sort value by sample values
                
    let result = Object.keys(sample_data)
    .map(key => {return {key, val: sample_data[key]}})
    .sort((a,b) => parseInt(b.sample_values) - parseInt(a.sample_values));
    
    // Assign variables & get the top 10
    let chart_values = result[2]["val"].slice(0,10).reverse();
    let labels = result[1]["val"].slice(0,10).reverse();
    let hover_text = result[3]["val"].slice(0,10).reverse();
    // Add "OTU" to the labels
    labels = labels.map(item => "OTU " + item);
    //console.log(chart_values);
    
    let bar_data = [{
        type: 'bar',
        x: chart_values,
        y: labels,
        text: hover_text,
        orientation: 'h'
    }];
    let bar_layout = {
        width: 900,
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

function createBubbleChart(sample_data){
    console.log("Bubble");
    console.log(sample_data);
    let bubble_data = [{
        x: sample_data["otu_ids"],
        y: sample_data["sample_values"],
        text: sample_data["otu_labels"],
        mode: 'markers',
        marker:{
            size: sample_data["sample_values"],
            color: sample_data["otu_ids"]
        }
    }];

    let bubble_layout = {
        xaxis:{
            title: `OTU ID ${sample_data["id"]}`,
        },         
        width: 1200,
        height: 800,
        margin:{
            l: 50,
            r: 100,
            t: 50,
            b: 100
        }
    }

    Plotly.newPlot("bubble", bubble_data, bubble_layout);
}

function createDisplay(metadataItem){
    console.log(metadataItem);
    let menu = d3.select("#sample-metadata");
    //Erase previous data
    menu.selectAll("#meta-info").remove();
    Object.entries(metadataItem).forEach(function([key, value]){
        menu.append("p")
        .text(`${key}: ${value}`)
        .attr("id", "meta-info");
    });
}


// Event listener for dropdown
function optionChanged(nameID){
    console.log(nameID);
    updateInformation(nameID);
}



startFile();

//Event Listener for 

//createDropdown(bellyData.names);
// const dataPromise = d3.json(file);
// console.log("Data promise: ", dataPromise);
