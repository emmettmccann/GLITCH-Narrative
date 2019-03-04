window.onbeforeunload = function() {
	window.scrollTo(0, 0);
};

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
		return (
			'<h1>' +
			d.title +
			'</h1><h2>' +
			d.subTitle +
			'</h2><p>' +
			d.body +
			'</p><p class="comment">' +
			d.comment +
			'</p>'
		);
	});

charts.forEach(function(element) {
	var chartSections = sections.filter(function(section) {
		return section.viz === element.title;
	});

	element.firstSectionIndex = sections.indexOf(chartSections[0]);
	element.lastSectionIndex = sections.indexOf(chartSections[chartSections.length - 1]);
	element.currentPos = 0;
	element.vert_margin = 0;
	element.transitionIndex = 0;
	element.active = false;
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

chart.attr('id', function(d) {
	d.update(d3.select(this));
	return 'chart';
});

function updateCharts() {
	chart.attr('class', function(d, i) {
		if (d.active) {
			d.update(d3.select(this));
			return 'activeChart';
		}
		return 'inactiveChart';
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

updateCharts();

function setActiveSection(index, scroll) {
	sections.forEach(function(sec) {
		sec.active = false;
	});
	sections[index].active = true;
	charts.forEach(function(element) {
		if (index === element.lastSectionIndex) {
			//moving to next element
			element.vert_margin = -scroll;
		} else if (index >= element.firstSectionIndex && index < element.lastSectionIndex) {
			//active
			element.currentPos = transitionScale(scroll);
			element.transitionIndex = index - element.firstSectionIndex;
			element.vert_margin = 0;
		} else if (index > element.lastSectionIndex) {
			//passed
			element.vert_margin = -window.innerHeight;
		}

		if (index >= element.firstSectionIndex && index < element.lastSectionIndex) {
			element.active = true;
		} else {
			element.active = false;
		}
	});
	updateCharts();
}
