// Include React 
var React = require('react');

// This is the results component
var Saved = React.createClass({

	// Here we render the function
	render: function(){

		return(

			<div className="panel panel-default">
				<div className="panel-heading">
					<h3 className="panel-title text-center">Saved Articles</h3>
				</div>
				<div className="panel-body text-center">
					{/* Here we use a map function to loop through an array in JSX*/}
					{this.props.saved.map(function(result, i)
						{
{/*							return <p key={i}>{search.location} - {search.date}</p> */}
						}
					)}
				</div>
			</div>

		)
	}
});

// Export the component back for use in other files
module.exports = Saved;