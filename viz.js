const imgWidth = 2000;
const imgHeight = 1500;
const colWidth = 40;

function cap(toCap) {
	if (toCap < 0) return 0;
	if (toCap > 1) return 1;
	return toCap;
}

function glitchHeader(div) {
	if (this.setup === undefined) {
		var width = div.node().getBoundingClientRect().width;
		var height = div.node().getBoundingClientRect().height;
		var bannerHeight = 2880; //imgHeight for eyeBanner
		var bannerWidth = 5120; //imgWidth for eyeBanner

		if (height / width > bannerHeight / bannerWidth) {
			//scale image properly
			height = (width * bannerHeight) / bannerWidth;
		} else {
			width = (height * bannerWidth) / bannerHeight;
		}
		div.html(function(d) {
			return '<img src="mount_result.jpg" alt="fulleye" style="width:' + width + 'px;height:' + height + 'px;"/>';
			//return '<img src="data/5rep.png" alt="fulleye" style="width:'+width+'px;height:'+height+'px;"/>';
		});
		this.setup = true;
	}
}

function imgToGlitch(div) {
	var self = this;
	if (self.setup === undefined) {
		var width = div.node().getBoundingClientRect().width;
		var height = div.node().getBoundingClientRect().height;
		//setup for first time
		if (height / width > imgHeight / imgWidth) {
			//scale image properly
			height = (width * imgHeight) / imgWidth;
		} else {
			width = (height * imgWidth) / imgHeight;
		}
		div.html(function() {
			return (
				'<div style="position: relative; align-self:flex-start"> <img src="5rep.png" alt="5rep" id:"frontImage" style="z-index:50;width:' +
				width +
				'px;height:' +
				height +
				'px;position: absolute;left: 0px;top: ' +
				(div.node().getBoundingClientRect().height - height) / 2 +
				'px;"/>' +
				'<img src="fulleye.png" alt="fulleye" style="width:' +
				width +
				'px;height:' +
				height +
				'px;position: absolute;left: 0px;top: ' +
				(div.node().getBoundingClientRect().height - height) / 2 +
				'px;"/></div>'
			);
		});
		self.setup = true;
	}

	//updates
	div.select('img').style('opacity', self.currentPos / 100);
}

function column(div) {
	var self = this;
	var width = div.node().getBoundingClientRect().width;
	var height = div.node().getBoundingClientRect().height;
	if (height / width > imgHeight / imgWidth) {
		//scale image properly
		height = (width * imgHeight) / imgWidth;
	} else {
		width = (height * imgWidth) / imgHeight;
	}
	var interpPoint = self.currentPos / 100;

	var xMap = d3
		.scaleLinear()
		.domain([0, imgWidth])
		.range([0, width]);

	if (this.setup === undefined) {
		//setup for first time

		self.svg = div
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background-color', '#fff');

		self.colRepImage = self.svg
			.selectAll('image')
			.data([0])
			.enter()
			.append('svg:image')
			.attr('id', 'endImg')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height)
			.attr('opacity', 0)
			.attr('xlink:href', '1colRep.png');

		self.startImage = self.svg
			.selectAll('image')
			.filter('#startImg')
			.data([0])
			.enter()
			.append('svg:image')
			.attr('id', 'startImg')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height)
			.attr('xlink:href', 'fulleye.png');

		self.yPositionScale = d3
			.scaleLinear()
			.domain([0, imgHeight])
			.range([0, height]);

		self.redScale = function(d) {
			return d3.interpolateRgb('white', 'red')(d.rStart / 255);
		};

		self.blueScale = function(d) {
			return d3.interpolateRgb('white', 'blue')(d.bStart / 255);
		};

		self.greenScale = function(d) {
			return d3.interpolateRgb('white', 'green')(d.gStart / 255);
		};

		self.redScaleEnd = function(d) {
			return d3.interpolateRgb('white', 'red')(d.rEnd / 255);
		};

		self.blueScaleEnd = function(d) {
			return d3.interpolateRgb('white', 'blue')(d.bEnd / 255);
		};

		self.greenScaleEnd = function(d) {
			return d3.interpolateRgb('white', 'green')(d.gEnd / 255);
		};

		d3.csv('col650.csv').then(function(data) {
			self.data = data.filter(function(d) {
				return d.yPos % 2 === 0;
			});
			self.redPoints = self.svg
				.selectAll('rect')
				.filter('#red')
				.data(self.data)
				.enter()
				.append('rect')
				.attr('id', 'red');

			self.bluePoints = self.svg
				.selectAll('rect')
				.filter('#blue')
				.data(self.data)
				.enter()
				.append('rect')
				.attr('id', 'blue');

			self.greenPoints = self.svg
				.selectAll('rect')
				.filter('#green')
				.data(self.data)
				.enter()
				.append('rect')
				.attr('id', 'green');

			self.redPoints.attr('fill', self.redScale);
			self.bluePoints.attr('fill', self.blueScale);
			self.greenPoints.attr('fill', self.greenScale);

			self.redPoints
				.attr('width', 0)
				.attr('height', (height / imgHeight) * 2)
				.attr('x', xMap(650) - colWidth / 2)
				.attr('y', function(d) {
					return self.yPositionScale(d.yPos);
				});

			self.bluePoints
				.attr('width', 0)
				.attr('height', (height / imgHeight) * 2)
				.attr('x', xMap(650) - colWidth / 2)
				.attr('y', function(d) {
					return self.yPositionScale(d.yPos);
				});

			self.greenPoints
				.attr('width', 0)
				.attr('height', (height / imgHeight) * 2)
				.attr('x', xMap(650) - colWidth / 2)
				.attr('y', function(d) {
					return self.yPositionScale(d.yPos);
				});

			var points = div
				.select('svg')
				.selectAll('rect')
				.filter('#point')
				.data(data)
				.enter()
				.append('rect');
			points
				.attr('width', 0)
				.attr('height', (height / imgHeight) * 2)
				.attr('x', xMap(650))
				.attr('y', function(d) {
					return self.yPositionScale(d.yPos);
				})
				.attr('fill', function(d) {
					return d3.rgb(d.rStart, d.gStart, d.bStart);
				})
				.style('z-index', 20);
			self.points = points;

			var histBoxes = d3
				.nest()
				.key(function(d) {
					return d.bStart - (d.bStart % 4);
				})
				.entries(self.data);

			self.data.forEach(function(element) {
				var box = histBoxes.find(function(possibleBox) {
					return possibleBox.key == element.bStart - (element.bStart % 4);
				});
				element.histCount = box.values.indexOf(element);
			});

			self.histogramScale = d3
				.scaleLinear()
				.domain(
					d3.extent(self.data, function(d) {
						return d.histCount;
					})
				)
				.range([50, (width - colWidth) * 0.95]);

			//self.points.on('mouseover', self.handleMouseOver).on('mouseout', self.handleMouseOut);

			//self.redPoints.on('mouseover', self.handleMouseOver).on('mouseout', self.handleMouseOut);

			//self.bluePoints.on('mouseover', self.handleMouseOver).on('mouseout', self.handleMouseOut);

			//self.greenPoints.on('mouseover', self.handleMouseOver).on('mouseout', self.handleMouseOut);
		});

		self.intensityScale = d3
			.scaleLinear()
			.domain([0, 255])
			.range([0, height]);

		self.intensityAxis = d3.axisLeft(self.intensityScale).tickValues([32, 64, 96, 128, 160, 192, 224]);
		self.axis = self.svg.append('g').attr('transform', `translate(49,0)`);
		self.axis.call(self.intensityAxis);
		self.axis.attr('opacity', 0);

		self.cascade = function(i, index) {
			if (index == 0) return 0;
			var midDex = 1.1 * index - i / imgHeight;
			if (midDex > 0 && midDex <= 0.1) return 10 * midDex;
			else if (midDex < 0) return 0;
			return 1;
		};

		self.handleMouseOver = function(dThis) {
			console.log("mouseOver");
			self.svg
				.selectAll('rect')
				.filter(function(d) {
					return d.yPos === dThis.yPos;
				})
				.attr('stroke', '#ff0')
				.attr('stroke-width', 5);
		};

		self.handleMouseOut = function(dThis) {
			self.svg
				.selectAll('rect')
				.filter(function(d) {
					return d.yPos === dThis.yPos;
				})
				.attr('stroke-width', 0);
		};

		//done with setup
		self.setup = true;

		return;
	}

	if (self.transitionIndex === 0) {
		self.startImage.attr('opacity', d3.interpolate(1, 0)(d3.easeCubicInOut(cap(interpPoint * 1.3))));
		self.points
			.attr('x', d3.interpolate(xMap(650), xMap(650) - colWidth / 2)(d3.easeCubicInOut(interpPoint)))
			.attr('width', d3.interpolate(0, colWidth)(d3.easeCubicInOut(interpPoint)))
			.attr('height', d3.interpolate((height / imgHeight) * 2, 5)(interpPoint));
		self.redPoints
			.attr('x', d3.interpolate(xMap(650), xMap(650) - colWidth / 2)(d3.easeCubicInOut(interpPoint)))
			.attr('width', d3.interpolate(0, colWidth)(d3.easeCubicInOut(interpPoint)));
		self.bluePoints
			.attr('x', d3.interpolate(xMap(650), xMap(650) - colWidth / 2)(d3.easeCubicInOut(interpPoint)))
			.attr('width', d3.interpolate(0, colWidth)(d3.easeCubicInOut(interpPoint)));
		self.greenPoints
			.attr('x', d3.interpolate(xMap(650), xMap(650) - colWidth / 2)(d3.easeCubicInOut(interpPoint)))
			.attr('width', d3.interpolate(0, colWidth)(d3.easeCubicInOut(interpPoint)));
	}

	if (self.transitionIndex === 1) {
		self.points.attr(
			'x',
			d3.interpolate(xMap(650) - colWidth / 2, (width / 6) * 4)(d3.easeCubicInOut(interpPoint))
		);
		self.redPoints.attr('x', d3.interpolate(xMap(650) - colWidth / 2, width / 6)(d3.easeCubicInOut(interpPoint)));
		self.bluePoints.attr(
			'x',
			d3.interpolate(xMap(650) - colWidth / 2, (width / 6) * 2)(d3.easeCubicInOut(interpPoint))
		);
		self.greenPoints.attr(
			'x',
			d3.interpolate(xMap(650) - colWidth / 2, (width / 6) * 3)(d3.easeCubicInOut(interpPoint))
		);
	}

	if (self.transitionIndex === 2) {
		self.redPoints.attr('opacity', d3.interpolate(1, 0)(cap(interpPoint * 2)));
		self.greenPoints.attr('opacity', d3.interpolate(1, 0)(cap(interpPoint * 2)));

		self.axis.attr('opacity', d3.interpolate(0, 1)(interpPoint));

		self.bluePoints
			.attr('x', function(d) {
				return d3.interpolate((width / 6) * 2, self.histogramScale(d.histCount))(interpPoint);
			})
			.attr('y', function(d) {
				return d3.interpolate(
					self.yPositionScale(d.yPos),
					self.intensityScale(d.bStart - (d.bStart % 4))
				)(interpPoint);
			})
			.attr('width', d3.interpolate(colWidth, self.histogramScale(1)-50)(interpPoint))
			.attr('height', d3.interpolate((height / imgHeight) * 2, height / 64)(interpPoint));

		self.points.attr('x', function(d) {
			return d3.interpolate((width / 6) * 4, width - colWidth)(interpPoint);
		});
	}

	if (self.transitionIndex === 3) {
		self.redPoints
			.attr('fill', function(d) {
				return self.redScaleEnd(d);
			})
			.attr('x', xMap(650) + colWidth);
		self.greenPoints
			.attr('fill', function(d) {
				return self.greenScaleEnd(d);
			})
			.attr('x', xMap(650) + 2 * colWidth);
	}

	if (self.transitionIndex === 3) {
		self.bluePoints
			.attr('y', function(d) {
				return d3.interpolate(
					self.intensityScale(d.bStart - (d.bStart % 4)),
					self.intensityScale(d.bEnd)
				)(interpPoint);
			})
			.attr('x', function(d) {
				return d3.interpolate(self.histogramScale(d.histCount), 50)(interpPoint);
			})
			.attr('fill', function(d) {
				return d3.interpolate(self.blueScale(d), self.blueScaleEnd(d))(interpPoint);
			})
			.attr('width', d3.interpolate(self.histogramScale(1)-50, colWidth)(interpPoint));

		self.points.attr('x', function(d) {
			return d3.interpolate(width - colWidth, (width / 6) * 4)(interpPoint);
		});
	}

	if (self.transitionIndex === 4) {
		self.axis.attr('opacity', d3.interpolate(1, 0)(interpPoint));

		self.bluePoints
			.attr('y', function(d) {
				return d3.interpolate(
					self.intensityScale(d.bEnd),
					self.yPositionScale(d.yPos)
				)(d3.easeCubicInOut(self.cascade(d.yPos, interpPoint)));
			})
			.attr('x', function(d) {
				return d3.interpolate(50, xMap(650) - colWidth)(self.cascade(d.yPos, interpPoint));
			})
			.attr('height', function(d) {
				return d3.interpolate(height / 64, (height / imgHeight) * 2)(self.cascade(d.yPos, interpPoint));
			});

		self.points.attr('x', function(d) {
			return d3.interpolate((width / 6) * 4, xMap(650))(self.cascade(d.yPos, interpPoint));
		});

		self.redPoints.attr('opacity', d3.interpolate(0, 1)(cap(interpPoint - 0.5) * 2));
		self.greenPoints.attr('opacity', d3.interpolate(0, 1)(cap(interpPoint - 0.5) * 2));
	}

	if (self.transitionIndex === 5) {
		self.points.attr('fill', function(d) {
			return d3.interpolate(d3.rgb(d.rStart, d.gStart, d.bStart), d3.rgb(d.rEnd, d.gEnd, d.bEnd))(interpPoint);
		});
		self.bluePoints
			.attr('x', d3.interpolate(xMap(650) - colWidth, xMap(650))(interpPoint))
			.attr('opacity', d3.interpolate(1, 0)(interpPoint));
		self.greenPoints
			.attr('x', d3.interpolate(xMap(650) + 2 * colWidth, xMap(650))(interpPoint))
			.attr('opacity', d3.interpolate(1, 0)(interpPoint));
		self.redPoints
			.attr('x', d3.interpolate(xMap(650) + colWidth, xMap(650))(interpPoint))
			.attr('opacity', d3.interpolate(1, 0)(interpPoint));
	}

	if (self.transitionIndex === 6) {
		var interpPoint = self.currentPos / 100;

		self.points.attr('width', d3.interpolate(colWidth, 0)(d3.easeCubicInOut(interpPoint)));
		self.colRepImage.attr('opacity', d3.interpolate(0, 1)(cap(interpPoint - 0.5) * 2));
	}
}

function rotate(div) {
	var self = this;
	var width = div.node().getBoundingClientRect().width;
	var height = div.node().getBoundingClientRect().height;
	if (height / width > imgHeight / imgWidth) {
		//scale image properly
		height = (width * imgHeight) / imgWidth;
	} else {
		width = (height * imgWidth) / imgHeight;
	}
	var interpPoint = self.currentPos / 100;

	if (self.setup === undefined) {
		//setup for first time

		self.svg = div
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.style('background-color', '#fff');

		self.endImg = self.svg
			.selectAll('image')
			.data([0])
			.enter()
			.append('svg:image')
			.attr('id', 'endImg')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height)
			.attr('xlink:href', '5rep.png');

		self.rep3 = self.svg
			.selectAll('image')
			.filter('#rep3')
			.data([0])
			.enter()
			.append('svg:image')
			.attr('id', 'rep3')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height)
			.attr('xlink:href', '3rep.png');

		self.rep1 = self.svg
			.selectAll('image')
			.filter('#rep1')
			.data([0])
			.enter()
			.append('svg:image')
			.attr('id', 'rep1')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height)
			.attr('xlink:href', '1rep.png');

		self.startImg = self.svg
			.selectAll('image')
			.filter('#startImg')
			.data([0])
			.enter()
			.append('svg:image')
			.attr('id', 'startImg')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width)
			.attr('height', height)
			.attr('xlink:href', '1colRep.png');

		self.setup = true;
	} else {
		if (self.transitionIndex == 0) self.startImg.attr('opacity', d3.interpolate(1, 0)(interpPoint));
		if (self.transitionIndex == 1) self.rep1.attr('opacity', d3.interpolate(1, 0)(interpPoint));
		if (self.transitionIndex == 2) self.rep3.attr('opacity', d3.interpolate(1, 0)(interpPoint));
	}
}
