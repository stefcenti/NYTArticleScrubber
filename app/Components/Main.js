// Include React 
var React = require('react');

// Here we include all of the sub-components
var Form = require('./Children/Form');
var Results = require('./Children/Results');
var History = require('./Children/History');

// Helper Function
var helpers = require('./utils/helpers.js');

// This is the main component. 
var Main = React.createClass({

	// Here we set a generic state associated with the number of clicks
	getInitialState: function(){
		return {
			searchTopic: "",
			result: "",
			startYear:"",
			endYear:"",
			history: [] /*Note how we added in this history state variable*/
		}
	},	

	// This function allows childrens to update the parent.
	setTopic: function(topic){
		this.setState({
			searchTopic: topic
		});
	},

	// This function allows childrens to update the parent.
	setStartYear: function(year){
		console.log("StartYear: " + year);
		this.setState({
			startYear: year
		});
	},

	// This function allows childrens to update the parent.
	setEndYear: function(year){
		console.log("EndYear: " + year);
		this.setState({
			endYear: year
		});
	},

	// If the component changes (i.e. if a search is entered)... 
	componentDidUpdate: function(prevProps, prevState){

		if(prevState.searchTopic != this.state.searchTopic){
			console.log("UPDATED");

			// Run the query for the address
			helpers.runQuery(this.state.searchTopic, this.state.startYear, this.state.endYear)
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
						helpers.postHistory(this.state.searchTopic)
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
						<h2 className="text-center">Address Finder!</h2>
						<p className="text-center"><em>Enter a landmark to search for its exact address (ex: "Eiffel Tower").</em></p>
					</div>

					<div className="col-md-6">
					
						<Form setTopic={this.setTopic} setStartYear={this.setStartYear} setEndYear={this.setEndYear}/>

					</div>

					<div className="col-md-6">
				
						<Results address={this.state.results} />

					</div>

				</div>

				<div className="row">

					<History history={this.state.history}/> 

				</div>

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;