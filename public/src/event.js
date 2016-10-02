
$(document).ready(function() {
    var elementCount = document.forms[0].elements.length;
        for(var i = 0; i < elementCount; i++) {
            document.forms[0].elements[i].disabled = true;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/category?category=' + window.category._id, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
            console.log(xhr.responseText);
            var eventList = JSON.parse(xhr.responseText).map(function(event) {
                return {
                    "start" : new Date(event.startDate),
                    "end" : new Date(event.finishDate)
                }
            });
            console.log(eventList);
           $("#calendar").fullCalendar({
                header: {
                    left: 'prev,next, today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                defaultDate: new Date(),
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                dayClick: function(date) {
                    location.href = "/trip?date="+date + "&category=" + window.category._id;
                },
                events: eventList
           });
        }
    }
    xhr.send(null);

});


