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
			startYear: "",
			endYear:"",
			results: [],
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
						<h2 className="text-center"><u>New York Times Article Scrubber</u></h2>
						<p className="text-center">Search for and annotate articles of interest!</p>
					</div>

					<div className="col-md-6">
					
						<Form setTopic={this.setTopic} setStartYear={this.setStartYear} setEndYear={this.setEndYear}/>

					</div>

					<div className="col-md-6">
				
						{/*<Results result{i}={this.state.result} />*/}

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