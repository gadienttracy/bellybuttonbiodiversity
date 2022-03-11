function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleNumber = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(sampleNumber)
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = sampleNumber[0];
    console.log(firstSample);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
     //otu_ids
     var otu_ids = firstSample.otu_ids;
     
     
     //otu_labels
     var otu_labels = firstSample.otu_labels;
     var otulabelsslice = otu_labels.slice(0,10).reverse();
     
 
     //sample values
     var sample_values = firstSample.sample_values;
     var samplevaluesslice = sample_values.slice(0,10).reverse();
     

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    var yticksotu = otu_ids.slice(0,10).map(otuID => 'OTU ${otuID}').reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [{
      y: yticksotu,
      x: samplevaluesslice,
      text: otulabelsslice,
      type: "bar",
      orientation: "h",
    }
      
    ];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t:30, l: 150}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);

    // 1. Create the trace for the bubble chart.
    var bubbleData = [{
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale:'BuGr',
        }
      }
      ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title: "OTU ID"},
      hovermode: "closest",

    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout); 

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
    // Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    // 2. Create a variable that holds the first sample in the metadata array.
    var sampleMeta = sampleNumber[0];
    console.log(sampleMeta);

    // Create variables that hold the otu_ids, otu_labels, and sample_values.

    // 3. Create a variable that holds the washing frequency.
    var washFreq = result.wfreq
    var washFreqFloat = parseFloat(washFreq).toFixed(2)
    console.log(washFreqFloat)
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      title: {text: "Scrubs per Week", font: {size:18}},
      type: "indicator",
      mode: "gauge+number",
      value: washFreq,
      gauge: {
          axis: { range: [null, 10], dtick: 2, tick0:0},
          bar: {color: "black"},
          bgcolor: "white",
          borderwidth: 2,
          steps: [
            { range: [0, 2], color: "red" },
            { range: [2, 4], color: "orange" },
            { range: [4, 6], color: "yellow" },
            { range: [6, 8], color: "lightgreen" },
            { range: [8, 10], color: "green" },
          ]},
      }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      title: "Belly Button Washing Frequency",
      titlefont:{"size":25}
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}