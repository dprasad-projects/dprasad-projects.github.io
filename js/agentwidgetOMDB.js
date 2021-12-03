var updateCallback = function(data) 
{
	console.log("***updateCallback****"); // Do something with the returning data//
	console.log(JSON.stringify(data)); //

	var path = data.key;
	var value = data.newValue;
	var index = value.length - 1;
	var movieObj = value[index];

	console.log("***index****", index);
	console.log("***index****", JSON.stringify(movieObj));

	if (movieObj.source === "visitor") 
	{	
		console.log("Input Text", movieObj.text);
		fetch("https://www.omdbapi.com?t=" + movieObj.text + "&apikey=adc5c705")
		.then(response => response.json())
		.then(res => {
			console.log("Result array",res)
			
			if (res.Response === "True") 
			{
				document.getElementById("Title").innerHTML = res.Title;
				document.getElementById("Year").innerHTML = res.Year;
				document.getElementById("Rated").innerHTML = res.Rated;	
				document.getElementById("Actors").innerHTML = res.Actors;
				document.getElementById("Genre").innerHTML = res.Genre;
				document.getElementById("Plot").innerHTML = res.Plot;
				document.getElementById("Released").innerHTML = res.Released;
				document.getElementById("Runtime").innerHTML = res.Runtime;
				document.getElementById("Director").innerHTML = res.Director;
				document.getElementById("Awards").innerHTML = res.Awards;
				document.getElementById("imdbRating").innerHTML = res.imdbRating;
			} else {				
				appDiv.innerHTML = res.Error;
			}
		})
		.catch(err => {
			console.log(err);
		});

	}
};