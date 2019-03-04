var sections = [
	{
		title: 'Test Section1',
		body: 'text body1',
		viz: 'chart1',
	},
	{
		title: 'Test Section2',
		body: 'text body2',
		viz: 'chart1',
	},
	{
		title: 'Test Section3',
		body: 'text body3',
		viz: 'chart2',
	},
	{
		title: 'Test Section4',
		body: 'text body4',
		viz: 'chart2',
	},
	{
		title: 'Test Section1',
		body: 'text body1',
		viz: 'chart3',
	},
	{
		title: 'Test Section2',
		body: 'text body2',
		viz: 'chart3',
	},
	{
		title: 'Test Section3',
		body: 'text body3',
		viz: 'chart3',
	},
	{
		title: 'Test Section4',
		body: 'text body4',
		viz: 'chart4',
	},
];

var narrative = d3.select('#sections');

var narrativeDiv = narrative
	.selectAll('div')
	.data(sections)
	.enter()
	.append('div')
	.attr('id', 'section');

narrativeDiv
	.append('div')
	.attr('id', 'section-text')
	.html(function(d) {
		return '<h1>' + d.title + '</h1><p>' + d.body + '</p>';
	});

//CHARTS ARRAY SETUP
var charts = [
	{
		title: 'chart1',
	},
	{
		title: 'chart2',
	},
	{
		title: 'chart3',
	},
	{
		title: 'chart4',
	},
];

charts.forEach(function(element) {
	var chartSections = sections.filter(function(section) {
		return section.viz === element.title;
	});

	element.firstSectionIndex = sections.indexOf(chartSections[0]);
	element.lastSectionIndex = sections.indexOf(chartSections[chartSections.length - 1]);
	element.currentPos = 0;
	element.vert_margin = 0;
	element.transitionIndex = 0;
});
console.log(charts);

var vizzes = d3.select('#charts');

var chart = vizzes
	.selectAll('div')
	.data(charts)
	.enter()
	.append('div')
	.attr('id', 'chart');

var chartLabel = chart.append('div').attr('id', 'chart-text');

function chartPositions() {
	chartLabel.html(function(d) {
		return '<h1>' + d.title + '</h1><p>' + d.currentPos + '</p><p>' + d.transitionIndex + '</p>';
	});
	chart.style('margin-top', function(d) {
		return d.vert_margin + 'px';
	});
}

var transitionScale = d3
	.scaleLinear()
	.domain([window.innerHeight * 0.2, window.innerHeight - window.innerHeight * 0.2])
	.range([0, 100])
	.clamp(true);

chartPositions();

function setActiveSection(index, scroll) {
	sections.forEach(function(element) {
		element.active = false;
	});
	sections[index].active = true;
	console.log(index, scroll);
	charts.forEach(function(element) {
		if (index === element.lastSectionIndex) {
			element.vert_margin = -scroll;
		} else if (index >= element.firstSectionIndex && index < element.lastSectionIndex) {
			element.currentPos = transitionScale(scroll);
			element.transitionIndex = index - element.firstSectionIndex;
			element.vert_margin = 0;
		} else if (index > element.lastSectionIndex) {
			element.vert_margin = -window.innerHeight;
		}
	});
	chartPositions();
}
