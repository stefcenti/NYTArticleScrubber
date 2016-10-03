// Include React 
var React = require('react');

// Include Helper Functions
var helpers = require('../utils/helpers')

// This is the Search component. 
var Search = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			topic: "",
			start: "",
			end: "",
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){
		console.log("CHANGE");
		//console.log("|"+event.target.id+"|"+event.target.value+"|");
    
    	// Here we create syntax to capture any change in text to the search topics (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;

    	this.setState(newState);
	},

	// When a user clicks Search... 
	handleClick: function(){
		console.log("CLICK");
		console.log("DATE: "+Date.now());

		// Set to default values if none are entered
		// TODO: change default dates for 1 year prior up to current date
		if(this.state.topic.trim() == "") this.state.topic = "news";
		if(this.state.start.trim() == "") this.state.start = "01012016";
		if(this.state.end.trim() == "")   this.state.end   = "12122016";

		// Update the state of the Main form
		this.props.setTopic(this.state.topic);
		this.props.setStart(this.state.start);
		this.props.setEnd(this.state.end);

		helpers.runQuery(this.state.topic, this.state.start, this.state.end);		
	},

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h2 className="panel-title text-center"><strong>Search</strong></h2>
				</div>
				<div className="panel-body text-center">

						<form>
							<div className="form-group">
								{/*Note how each of the input form elements has an id that matches the state. This is not necessary but it is convenient.
									Also note how each has an onChange event associated with our handleChange event. 
								*/}
								<h5 className=""><strong>Topic</strong></h5>
								<input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>

								<h5 className=""><strong>Start Date</strong></h5>
								<input type="text" className="form-control text-center" id="start" onChange= {this.handleChange} required/>

								<h5 className=""><strong>End Date</strong></h5>
								<input type="text" className="form-control text-center" id="end" onChange= {this.handleChange} required/>

								<br/>
								<button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
							</div>

						</form>
				</div>
			</div>



		)
	}
});

// Export the component back for use in other files
module.exports = Search;