var windowKit = new windowKit({
	account: 36180654
	skillId: 12341234 - optional skill ID
});

//connect to LE
windowKit.connect();

//when the agent sends a text message
windowKit.onAgentTextEvent(function(text) {
	//append the message's contents to the DOM
	$('#your_bot_container_here').append('<div class="agentText">' + text + '</div>');
	//grab all the agent texts so far
	var botTexts = document.getElementsByClassName('agentText');
	//find the last one
	var latestText = botTexts[botTexts.length - 1]
	//scroll the window to the last text. This is used to create a scroll effect in the conversation.
	$('body, html').animate({ scrollTop: $(latestText).offset().top }, 1000);
	console.log('Agent: ' + text);
});

//when the agent sends a rich content message
windowKit.onAgentRichContentEvent(function(content) {
	//render the structured content using JsonPollock
  var structuredText = JsonPollock.render(content);
	//append the results of the render to the DOM
	$('#your_bot_container_here').append(structuredText);
	//next three rows create the same scrolling effect as above
	var botTextsSC = document.getElementsByClassName('lp-json-pollock');
	var latestSC = botTextsSC[botTextsSC.length - 1];
	$('body, html').animate({ scrollTop: $(latestSC).offset().top }, 1000);
	console.log('Agent: ', structuredText);
	//when a user clicks on a structured content button
	$('.lp-json-pollock-element-button').on('click', function () {
		//grab the text of the button
		var scText = $(this).text();
		//send the text to LE for the bot to process
		windowKit.sendMessage(scText);
		//append the text to the DOM so it shows up as the user's side of the conversation
		$('#your_bot_container_here').append('<div class="consumerText">' + scText + '</div>');
		//same scroll effect as above
		var consumerTexts = document.getElementsByClassName('consumerText');
		var latestConsumerText = consumerTexts[consumerTexts.length - 1];
		$('body, html').animate({ scrollTop: $(latestConsumerText).offset().top }, 1000);
	});
});
