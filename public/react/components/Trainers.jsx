import React from 'react';
import ReactDOM from 'react-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import TimePicker from 'material-ui/TimePicker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';

BigCalendar.momentLocalizer(moment);
injectTapEventPlugin();



class  Timetable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Paper>
                <BigCalendar
                      events={this.props.myEventsList}
                      view='day'
                      toolbar={false}
                      date={new Date(window.date)}
                    />
            </Paper>
        );
    }

    static get childContextTypes() {
        return {
             muiTheme: React.PropTypes.object
        }   
    };

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }
}

class TripForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value : null
        }
    }

    changeTrainer(e, key, payload) {
        this.setState({
            value: payload
        });
    }

    render() {
        return(
            <Paper id="tripForm">
                <TimePicker hintText="Планируемая дата начала" ref="startDate" format="24hr"/>
                <TimePicker hintText="Планируемая дата окончания" ref="finishDate" format="24hr"/>
                <TextField ref='peopleAmount' hintText="Количество человек" floatingLabelText="Количество человек" />
                <SelectField value={this.state.value} floatingLabelText="Инструктор" onChange={this.changeTrainer.bind(this)}>
                     {
                         this.props.trainers.map(function(trainer, index) {
                             return <MenuItem key={index} value={trainer.id} primaryText={trainer.name.first + " " + trainer.name.last} />
                         })
                     }
                </SelectField>
                <TextField ref="extraInfo" hintText="Доп. информация" floatingLabelText="Доп. информация" rows={3}/>
                <RaisedButton label="Отправить" primary={true} onClick={this.submitForm.bind(this)}/>
            </Paper>
        );
    }

    submitForm(e) {
        e.preventDefault();
        var trip = {}
        trip.startDate = this.refs.startDate.state.time;
        trip.finishDate = this.refs.finishDate.state.time;
        trip.peopleAmount = +this.refs.peopleAmount.input.value;
        trip.extraInfo = this.refs.extraInfo.input.value;
        trip.category = window.category;
        trip.trainer = this.state.value;
        var xhr = new XMLHttpRequest();
        var content = JSON.stringify(trip);
        xhr.open('POST', '/trip', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        var self = this;
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status == 200) {
                self.props.addEvent(new Date(trip.startDate),  new Date(trip.finishDate));
            }
        }
        xhr.send(content);
    }    

    static get childContextTypes() {
        return {
            muiTheme: React.PropTypes.object
        }   
    };

    getChildContext() {
        return { 
            muiTheme: getMuiTheme(baseTheme) 
        };
    }

}

class Trainer extends React.Component {
    constructor(props) {
        super(props);
    }

    static get defaultProps() {
        return {
            name : {
                first : "Name",
                last  : "Surname"
            },
            avatar: "/images/empty_avatar.jpg",
            email : "admin@keystonejs.com",
            description: "trainer skills"
        }
    }

    static get childContextTypes() {
        return {
             muiTheme: React.PropTypes.object
        }   
    }

    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) };
    }

    getFullName() {
        return this.props.name.first + " " + this.props.name.last;
    }

    render() {
        console.log(this.props);
        return( 
            <Card>
                <CardHeader
                    title={this.getFullName()}
                    subtitle={this.props.email}
                    avatar={this.props.avatar}
                    actAsExpander={true}
                />
                <CardText>
                   <div dangerouslySetInnerHTML = {this.props.description}></div>
                </CardText>
                <CardActions>
                    <FlatButton label="Посмотреть комментарии"  />
                </CardActions>
            </Card>
        );
    }
};

 class TrainerList extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    this.props.trainers.map(function(trainer) {
                        console.log(trainer);
                        return <Trainer key         = {trainer.id} 
                                        name        = {trainer.name}
                                        avatar      = {trainer.avatar}
                                        email       = {trainer.email}
                                        description = { {
                                            __html: trainer.description.html
                                        }}/> 
                    })
                }
            </div>
        );
    }
};

 class UserTrip  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            trainers: [],
            myEventsList: []
        }
    }

    static get childContextTypes() {
        return {
            muiTheme: React.PropTypes.object
        }   
    }

    getChildContext() {
        return { 
            muiTheme: getMuiTheme(baseTheme) 
        };
    }

    getHandleTrainers(req) {
         var responseTrainersData = JSON.parse(req.responseText);
         var getTrainers = responseTrainersData.map(function(trainer) {
            return {
                "id"     : trainer._id,
                "name"   : trainer.name,
                "avatar" : trainer.avatar.url,
                "email"  : trainer.email,
                "description" : trainer.description
            }
         });
        this.setState({
            "trainers": getTrainers
        });
    }

    getHandleTrips() {
        var newEvents =  window.trips.map(function(e) {
            return {
                start: new Date(e.startDate),
                end: new Date(e.finishDate)
            }
        });
        this.loadEvents(newEvents);
    }

    componentWillMount() {
      
        var trainerReq = new XMLHttpRequest();
       // var eventReq = new XMLHttpRequest();
        trainerReq.open('GET', '/trainers', true);
      //  eventReq.open('GET', '/trip/'+Date.now(), true);
        var self = this;
        trainerReq.onreadystatechange = function() {
            if (trainerReq.readyState === XMLHttpRequest.DONE && trainerReq.status == 200) {
                self.getHandleTrainers(trainerReq);
            }
        };
     /*   eventReq.onreadystatechange = function() {
            if (eventReq.readyState === XMLHttpRequest.DONE && eventReq.status == 200) {
                self.getHandleTrips(eventReq);
            }
        };*/
        trainerReq.send(null);

      //  eventReq.send();
    }

    componentDidMount() {
        this.getHandleTrips();
    }

    loadEvents(newEvents) {
        this.setState({
            myEventsList: newEvents
        }, function() {
            console.log("all events are added");
        });
    }

    addNewEvent(startDate, endDate) {
        var events = this.state.myEventsList.slice();
        events.push({
            start: startDate,
            end: endDate
        });
        this.setState({
            myEventsList : events
        });
    }

    render() {
        return ( 
            <div> 
                <div className='col-md-4'>
                    <p className='title'> Расписание </p>
                     <Timetable myEventsList={this.state.myEventsList}/>
                    
                </div>
                <div className='col-md-4'>
                    <p className='title'> Данные планируемого мероприятия </p>
                     <TripForm trainers={this.state.trainers} addEvent={this.addNewEvent.bind(this)}/>
                </div>
                <div className='col-md-4'>
                    <p className='title'> Инструкторы </p>
                   <TrainerList trainers={this.state.trainers}/>
                </div>              
            </div>
            );
    }
}

ReactDOM.render(<UserTrip />, document.getElementById("userTrip"));