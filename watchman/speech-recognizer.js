var val;

(function($) {

    $(document).ready(function() {

        try {
            var recognition = new webkitSpeechRecognition();
        } catch(e) {
            var recognition = Object;
        }
        recognition.continuous = true;
        recognition.interimResults = true;

        var interimResult = '';
        var textArea = $('#speech-page-content');
        var textAreaID = 'speech-page-content';

        $('.startButton').click(function(){
		console.log('startButton was clicked');
            startRecognition();
        });

        $('.stopButton').click(function(){
            recognition.stop();
		var toDelete = document.getElementById('speech-page-content');
//		clearContents(toDelete);
		
        });

        var startRecognition = function() {
            $('.speech-content-mic').removeClass('speech-mic').addClass('speech-mic-works');
            textArea.focus();
		console.log('inside startRecognition');	
            recognition.start();
		console.log('does recognition.start happen?');
        };


	var val =  $("#speech-page-content").val();
        recognition.onresult = function (event) {
		console.log('onresult was entered');
            var pos = textArea.getCursorPosition() - interimResult.length;
            textArea.val(textArea.val().replace(interimResult, ''));
            interimResult = '';
            textArea.setCursorPosition(pos);
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    insertAtCaret(textAreaID, event.results[i][0].transcript);
                    // got new input
//                    var val =  $("#speech-page-content").val();
	                } else {
                    isFinished = false;
                    insertAtCaret(textAreaID, event.results[i][0].transcript + '\u200B');
                    interimResult += event.results[i][0].transcript + '\u200B';
                }
            }
        };

        recognition.onend = function() {
		console.log('onend was entered');
	        val = $("#speech-page-content").val();
		$('.speech-content-mic').removeClass('speech-mic-works').addClass('speech-mic');
	
		console.log('Val is: ' + val);
		console.log('How far do we get?');			
		var name = extractName(val);
		console.log(name);
		var match = findMatch(name);

	
		if(match == true)
			approve(name);
		else
			reject();

		

        };
    });
})(jQuery);
