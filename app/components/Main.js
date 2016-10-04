// Include React 
var React = require('react');

// Here we include all of the sub-components
var Search = require('./children/Search');
var Results = require('./children/Results');
var Saved = require('./children/Saved');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			topic: "",
			start: "",
			end:"",
			results: [],
			saved: []
		}
	},	

	// This function allows childrens to update the parent.
	setTopic: function(topic){
		this.setState({
			searchTopic: topic
		});
	},

	// This function allows childrens to update the parent.
	setStart: function(date){
		console.log("Start: " + date);
		this.setState({
			start: date
		});
	},

	// This function allows childrens to update the parent.
	setEnd: function(date){
		console.log("EndYear: " + date);
		this.setState({
			end: date
		});
	},

	// If the component changes (i.e. if a search is entered)... 
	// This code is from the NYT search.  It is executed whenever the search
	// topic has changed.  Since we are not searching until "Search" is clicked
	// we don't need to do anything when the component is updated.
	// This code also saves the search data in the History (now Article) table.
	// Since we only save an article when the button associated with the article
	// is clicked, this functionality needs to be associated with each
	// button as they are created.
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTopic != this.state.searchTopic){
			console.log("UPDATED");

			// Run the query for the address
			helpers.runQuery(this.state.topic, this.state.start, this.state.end)
				.then(function(data){
					if (data != this.state.results)
					{
						console.log("Articles", data);

						/* TODO: fix this part to get the article text.
						this.setState({
							results: data
						});
						*/

						// After we've received the result... then post the search topic to our history. 
						helpers.postHistory(this.state.topic)
							.then(function(data){
								console.log("Updated!");

								// After we've done the post... then get the updated history
								helpers.getHistory()
									.then(function(response){
										console.log("Current History", response.data);
										if (response != this.state.history){
											console.log ("History", response.data);

											this.setState({
												history: response.data
											})
										}
									}.bind(this))	
							}.bind(this)
						)
					}
				}.bind(this))
				
			}
	},

	// The moment the page renders get the History
	componentDidMount: function(){

		// Get the latest history.
		helpers.getHistory()
			.then(function(response){
				if (response != this.state.history){
					console.log ("History", response.data);

					this.setState({
						history: response.data
					})
				}
			}.bind(this))
	},

	// Here we render the function
	render: function(){

		return(

			<div className="container">

				<div className="row">

					<div className="jumbotron">
						<h2 className="text-center"><u>New York Times Article Scrubber</u></h2>
						<p className="text-center">Search for and annotate articles of interest!</p>
					</div>

					<div className="col-md-6">
					
						<Search setTopic={this.setTopic} setStart={this.setStart} setEnd={this.setEnd} />

					</div>

					<div className="col-md-6">
				
						<Results results={this.state.results} />

					</div>

				</div>

				<div className="row">

					<Saved saved={this.state.saved} /> 

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;