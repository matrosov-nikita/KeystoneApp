
$(document).ready(function() {
	var elementCount = document.forms[0].elements.length;
		for(var i = 0; i < elementCount; i++) {
			document.forms[0].elements[i].disabled = true;
	}
	$("#calendar").fullCalendar({
		header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			defaultDate: '2016-06-12',
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			dayClick: function(date) {
				alert(date);
			},

			events: [
				{
					title: 'All Day Event',
					start: '2016-06-01'
				},
				{
					title: 'Long Event',
					start: '2016-06-07',
					end: '2016-06-10'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2016-06-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2016-06-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2016-06-11',
					end: '2016-06-13'
				},
				{
					title: 'Meeting',
					start: '2016-06-12T10:30:00',
					end: '2016-06-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2016-06-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2016-06-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2016-06-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2016-06-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2016-06-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2016-06-28'
				}
			]

	});
});


