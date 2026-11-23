function getContainerDimensions() {
    const container = document.querySelector('.map-container');
    const computedStyle = window.getComputedStyle(container);
    const containerWidth = container.clientWidth - 
        parseFloat(computedStyle.paddingLeft) - 
        parseFloat(computedStyle.paddingRight);
    
    // Adjust height ratio based on screen width
    let heightRatio = 0.6; // Default ratio
    if (window.innerWidth >= 768 && window.innerWidth < 992) {
        heightRatio = 0.85; // Increased ratio for medium screens to make map taller
    }
    
    const height = containerWidth * heightRatio;
    
    // Adjust scale factor based on container width
    let scaleFactor;
    if (window.innerWidth >= 768 && window.innerWidth < 992) {
        scaleFactor = 1.2; // Increased scale for medium screens
    } else {
        scaleFactor = containerWidth > 1120 ? 0.9 : 0.8;
    }
    
    return { 
        width: containerWidth, 
        height, 
        scaleFactor 
    };
}

function updateMapDimensions() {
    const dimensions = getContainerDimensions();
    
    // Update SVG viewBox
    svg.attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`);

    // Update projection with width-dependent scaling
    projection
        .scale(dimensions.width * dimensions.scaleFactor)
        .translate([dimensions.width / 2, dimensions.height / 2]);

    // Update all paths
    svg.selectAll(".state")
        .attr("d", path);

    // Update legend position - move it up for larger widths
    const legendY = dimensions.width > 1120 ? dimensions.height - 200 : dimensions.height - 180;
    svg.select(".legend")
        .attr("transform", `translate(20, ${legendY})`);
}







// Replace the static width/height declarations
const dimensions = getContainerDimensions();
let width = dimensions.width;
let height = dimensions.height;

const chartWidth = 380;
const chartHeight = 300;

const svg = d3.select("#map")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("display", "block")
    .style("margin", "0");


const chartSvg = d3.select("#bar-chart")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight);

const projection = d3.geoAlbersUsa()
    .scale(width * 1.2)
    .translate([width / 2, height / 2]);

// Add resize listener
window.addEventListener('resize', () => {
    const newDimensions = getContainerDimensions();
    width = newDimensions.width;
    height = newDimensions.height;
    updateMapDimensions();
});

const path = d3.geoPath().projection(projection);

const spendingColorScale = d3.scaleSequential()
    .domain([1, 7])
    .interpolator(d3.interpolateRdYlBu)
    .clamp(true);

function closeChart() {
    d3.select(".chart-container").style("display", "none");
}

function createBarChart(data, state) {
    console.log("Creating bar chart for:", state);
    console.log("Data:", data.properties);

    // Check for sufficient data
    if (!data.properties.n_responses || data.properties.n_responses < 30) {
        d3.select(".chart-container")
            .style("display", "block")
            .html(`
                <div class="chart-header">
                    <h3>Data for ${state}</h3>
                    <button class="close-button" onclick="closeChart()">×</button>
                </div>
                <div class="insufficient-data">
                    <p>Insufficient data available to generate chart.</p>
                    <p class="note">This state has fewer than 30 survey responses needed for reliable analysis.</p>
                </div>
            `);
        return;
    }

    const margin = {top: 20, right: 20, bottom: 60, left: 40};
    const innerWidth = chartWidth - margin.left - margin.right;
    const innerHeight = chartHeight - margin.top - margin.bottom;

    // Clear previous chart
    chartSvg.selectAll("*").remove();

    // Extract income spending data
    const incomeData = [
        {percentile: "0-16", value: data.properties.mean_spending_0_16_spending},
        {percentile: "17-33", value: data.properties.mean_spending_17_33_spending},
        {percentile: "34-67", value: data.properties.mean_spending_34_67_spending},
        {percentile: "68-95", value: data.properties.mean_spending_68_95_spending},
        {percentile: "96-100", value: data.properties.mean_spending_96_100_spending}
    ];

    console.log("Income data:", incomeData);

    const g = chartSvg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(incomeData.map(d => d.percentile))
        .range([0, innerWidth])
        .padding(0.1);

    const y = d3.scaleLinear()
        .domain([1, 7])
        .range([innerHeight, 0]);

    // Add axes
    g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    g.append("g")
        .call(d3.axisLeft(y));

    // Add bars with data check
    g.selectAll(".bar")
        .data(incomeData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.percentile))
        .attr("width", x.bandwidth())
        .attr("y", d => {
            return d.value ? y(Math.max(1, d.value)) : y(1);
        })
        .attr("height", d => {
            return d.value ? innerHeight - y(Math.max(1, d.value)) : 0;
        })
        .append("title")
        .text(d => `Value: ${d.value ? d.value.toFixed(2) : 'No data'}`);

    // Add labels
    g.append("text")
        .attr("class", "axis-label")
        .attr("x", innerWidth / 2)
        .attr("y", innerHeight + margin.bottom - 10)
        .style("text-anchor", "middle")
        .text("Income Percentile");

    g.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("x", -innerHeight / 2)
        .attr("y", -30)
        .style("text-anchor", "middle")
        .text("Government Spending Support (1-7)");

    // Show the container
    d3.select(".chart-container")
        .style("display", "block");
}

function updateLegendPosition() {
    const dimensions = getContainerDimensions();
    const legend = svg.select(".legend");
    
    // Adjust legend position based on screen width
    if (window.innerWidth >= 768 && window.innerWidth < 992) {
        // Position legend higher up for medium screens
        legend.attr("transform", `translate(20, ${dimensions.height - 150})`);
    } else {
        legend.attr("transform", `translate(20, ${dimensions.height - 180})`);
    }
}

window.addEventListener('resize', updateLegendPosition);



function createLegend() {
    const legendData = [
        {value: 7, label: "Strong Support (7)"},
        {value: 5.5, label: "High Support (5-6)"},
        {value: 4, label: "Moderate Support (4)"},
        {value: 2.5, label: "Low Support (2-3)"},
        {value: 1, label: "Minimal Support (1)"},
        {value: null, label: "Insufficient Data"}
    ];

    const legend = svg.append("g")
        .attr("class", "legend");

    const legendItems = legend.selectAll(".legend-item")
        .data(legendData)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 25})`);

    legendItems.append("rect")
        .attr("width", 20)
        .attr("height", 20)
        .attr("fill", d => d.value ? spendingColorScale(d.value) : "#ddd");

    legendItems.append("text")
        .attr("x", 30)
        .attr("y", 15)
        .text(d => d.label);

    // Position the legend initially
    updateLegendPosition();
}


function clicked(event, d) {
    console.log("State clicked:", d.properties.NAME);
    createBarChart(d, d.properties.NAME);
}

function showTooltip(event, d) {
    const metric = d3.select("#dataSelect").property("value");
    const value = d.properties[metric];
    
    d3.select(".tooltip")
        .style("opacity", 1)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY - 10) + "px")
        .html(`
            <strong>${d.properties.NAME}</strong><br/>
            ${metric.replace(/_/g, ' ').toUpperCase()}: ${value ? value.toFixed(2) : 'N/A'}<br/>
            Responses: ${d.properties.n_responses || 0}
        `);
}

function hideTooltip() {
    d3.select(".tooltip").style("opacity", 0);
}

// Initialize the map
Promise.all([
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),
    d3.json("dataviz/states_spending.geojson")
]).then(function([us, spendingData]) {
    console.log("Loaded spending data:", spendingData);
    
    const states = topojson.feature(us, us.objects.states);
    
    svg.selectAll(".state")
        .data(spendingData.features)
        .join("path")
        .attr("class", "state")
        .attr("d", path)
        .attr("fill", d => {
            const value = d.properties.mean_spending;
            return value && d.properties.n_responses >= 30 ? spendingColorScale(value) : "#ddd";
        })
        .on("click", clicked)
        .on("mouseover", showTooltip)
        .on("mouseout", hideTooltip);

    createLegend();
}).catch(function(error) {
    console.error("Error loading the data:", error);
});

// Add event listener for dropdown changes
d3.select("#dataSelect").on("change", function() {
    const metric = this.value;
    svg.selectAll(".state")
        .attr("fill", d => {
            const value = d.properties[metric];
            if (metric === "mean_spending") {
                return value && d.properties.n_responses >= 30 ? spendingColorScale(value) : "#ddd";
            } else {
                return value ? d3.interpolateBlues(value/1000) : "#ddd";
            }
        });
});