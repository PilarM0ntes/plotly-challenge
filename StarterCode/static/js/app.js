const file = "samples.json";

// Variables
let bellyData;

// Read the JSON file & assign the info to bellyData
function readFile(){
    d3.json(file).then(function(data){
        console.log(data);
        bellyData = data;
    });

}

readFile();

// const dataPromise = d3.json(file);
// console.log("Data promise: ", dataPromise);
