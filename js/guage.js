// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);
    // Create a variable that holds the samples array. 
    var samples = data.samples;
    var metadata = data.metadata;
    // Create a variable that filters the samples for the object with the desired sample number.
    var sampleNumber = samples.filter(sampleObj => sampleObj.id == sample);
    console.log(sampleNumber)
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var sampleMeta = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var firstSample = sampleNumber[0];
    console.log(firstSample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var sampleMeta = sampleNumber[0];
    console.log(sampleMeta);

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    //otu_ids
    var otu_ids = firstSample.otu_ids;
    var otuidsslice = otu_ids.slice(0,10).map(otu_ids => 'OTU ${otu_id}').reverse();
    console.log(otuidsslice);
    
    //otu_labels
    var otu_labels = firstSample.otu_labels;
    var otulabelsslice = otu_labels.slice(0,10).reverse();
    console.log(otulabelsslice);

    //sample values
    var sample_values = firstSample.sample_values;
    var samplevaluesslice = sample_values.slice(0,10).reverse();
    console.log(samplevaluesslice);
    // 3. Create a variable that holds the washing frequency.
    var washFreq = result.wfreq
    console.log(washFreq)
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot();
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
     
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot();
  });
}
