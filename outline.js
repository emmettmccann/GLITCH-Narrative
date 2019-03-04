var sections = [
	{
		title: 'GLITCH',
		subTitle: '',
		body: '',
		comment: '', //Creating beautiful images with standard array functions
		viz: 'glitchHeader',
	},
	{
		title: '',
		subTitle: 'Intro',
		body: 'This site seeks to pull apart and explain the GLITCH image processing script. <p>Specifically, how does GLITCH take this image....</p>',
		comment: '',
		viz: 'imgToGlitch',
	},
	{
		title: '',
		subTitle: '',
		body: '...and turn it into this? <p></p><p>Let\'s dive in...</p>',
		comment: '',
		viz: 'imgToGlitch',
	},
	{
		title: '',
		subTitle: 'One at a time',
		body: 'The key to GLITCH is to split the image into columns and process each one separately. <p>We are going to follow one column through the script.</p>',
		comment: '',
		viz: 'column',
	},
	{
		title: '',
		subTitle: '',
		body: 'We now have one column, but let\'s actually dive a little deeper. <p>We want to look at the individual color channels (red, blue, and green) that make up this column.</p>',
		comment: '',
		viz: 'column',
    },
    {
		title: '',
		subTitle: '',
		body: 'Now, we are looking at the exact data that the computer uses! Each pixel is made up of red, blue, and green values that are added together to create normal looking colors. <p>GLITCH actually processes every color channel separately so we are going to zoom one more level and analyze the blue in this column of the image.</p>',
		comment: '',
		viz: 'column',
    },
	{
		title: '',
		subTitle: '',
		body: 'We can see that the blue in this column is concentrated in two spikes. The top one comes from the pupil (black is an absence of color) and the bottom spike comes from the skin. <p>GLITCH creates vibrant colors and cool artifacts by essentially flattening these color curves so that the range of possible blue values is covered.</p>',
		comment: 'Watch the edges (top and bottom) as we flatten',
		viz: 'column',
	},
	{
		title: '',
		subTitle: '',
		body: 'Now that we flattened the curves, we have pixels covering the full range of blue values. However, this doesn\'t look anything like the original column on the right! <p>The final step here is to put the blue pixels back in the right order for the image.</p>',
		comment: '',
		viz: 'column',
    },
    {
		title: '',
		subTitle: '',
		body: 'We did the same thing for the red and green channels and now it looks like the colors are matched up again! <p>Keep in mind that we actually changed the colors when we flattened the color curves for each channel. The full color points in the middle are still the old colors.<p/>',
		comment: 'Watch the original full color points carefully as we add the channels back together.',
		viz: 'column',
		},
		{
			title: '',
			subTitle: '',
			body: 'Look how much more vibrant that is! Scroll back up a little to watch that transition again. If we do that to every column of the image, the whole thing should be a lot more interesting. <p>Let\'s put all the processed columns back into an image.</p>',
			comment: '',
			viz: 'column',
			},
    {
		title: '',
		subTitle: '',
		body: 'There we go! This is one "rep" of the process, applied to the columns. To make it more interesting, we can repeat the process.... on rows.',
		comment: '',
		viz: 'column',
    },
    {
		title: '',
		subTitle: 'Rows!',
		body: 'Repeating the process the columns wouldn\'t do anything. However, if we do the process on the rows, we can further transform the image. <p>The process for rows is exactly the same as for columns so let\'s skip to the result.</p>',
		comment: 'Watch carefully as this fades from the current image to one rep later.',
		viz: 'rotate',
    },
    {
		title: '',
		subTitle: '',
		body: 'Now we have done 1 repetition on the columns, and 1 on the rows and it\'s starting to look more and more interesting. We can repeat this "columns then rows" process a few more times....',
		comment: '',
		viz: 'rotate',
    },
    {
		title: '',
		subTitle: '',
		body: 'This is after 3 passes over the columns and rows. Let\'s go just a few more to refine the piece! ',
		comment: 'Notice how this next change is a lot more subtle. As the process repeats, the changes get smaller and smaller until eventually they aren\'t noticable and we can call the process complete. Scroll back and forth on this next transition and try to find the small differences.',
		viz: 'rotate',
	},
	{
		title: '',
		subTitle: 'Done!',
		body: 'For this particular image, the process stops producing noticable changes around 5 repetitions and we are left with this final piece!',
		comment: '',
		viz: 'rotate',
	},
];

//CHARTS ARRAY SETUP
var charts = [
	{
        title: 'glitchHeader',
        update: glitchHeader,
	},
	{
        title: 'imgToGlitch',
        update: imgToGlitch,
    },
    {
        title: 'column',
        update: column,
    },
	{
        title: 'rotate',
        update: rotate,
	},
];