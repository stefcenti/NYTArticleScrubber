// Include React 
var React = require('react');

// This is the form component. 
var Form = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			topic: "",
			startYear: "",
			endYear: "",
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){

    	// Here we create syntax to capture any change in text to the search topics (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);

	},

	// When a user submits... 
	handleClick: function(){
		console.log("CLICK");
		console.log(this.state.topic);

		// If a search topic is entered, set the parent's topic
		if(this.state.topic.trim() != "")
			this.props.setTopic(this.state.topic);
		if(this.state.startYear.trim() != "")
			this.props.setStartYear(this.state.startYear);
		if(this.state.topic.trim() != "")
			this.props.setEndYear(this.state.endYear);
	},

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Search</h3>
				</div>
				<div className="panel-body text-center">

						<form>
							<div className="form-group">
								<h4 className=""><strong>Topic</strong></h4>

								{/*Note how each of the form elements has an id that matches the state. This is not necessary but it is convenient.
									Also note how each has an onChange event associated with our handleChange event. 
								*/}
								<input type="text" className="form-control text-center" id="topic" onChange= {this.handleChange} required/>
								<br />
								<input type="text" className="form-control text-center" id="startYear" onChange= {this.handleChange} required/>
								<br />
								<input type="text" className="form-control text-center" id="endYear" onChange= {this.handleChange} required/>
								<br />
								<button type="button" className="btn btn-primary" onClick={this.handleClick}>Search</button>
							</div>

						</form>
				</div>
			</div>



		)
	}
});

// Export the component back for use in other files
module.exports = Form;