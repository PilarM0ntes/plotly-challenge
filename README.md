# plotly-challenge
## Objective
The objective of the project is to an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.
## Description
The dataset used for the interactive dashboard is located in StarterCode/samples.json.
Process:
- First the program populates the TEST Subject ID options for the dropdown menu with the startFile() function. Additionally, this methods displays default graphs  & information for subject ID 940.
- An event listener (function: optionChanged()) is activated every time a user selects a different Subject ID. Once, it reads the ID the updateInformation() function is triggered.
- The updateInformation() function gets the metadata and sample information from that specific ID and calls the following functions to create the graphs and display:
	- createHorizontalChart(): gets the sample information and builds a horizontal bar graph with the following information:
		- sample_values as the values for the bar chart
		- otu_ids as the labels for the bar chart
		- otu_labels as the hovertext for the chart
	- createBubbleChart(): gets the sample information and builds a bubble chart with the following information:
		- otu_ids for the x values
		- sample_values for the y values
		- sample_values for the marker size
		- out_ids dor the marker colors
		- otu_labels for the text values
	- createDisplay(): gets the metadata information and displays it on the "Demographic info" section
		- id, ethnicity, gender, age, location, bbtype and wfreq
 
