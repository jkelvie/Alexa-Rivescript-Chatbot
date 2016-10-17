var assert = require('assert');
var bst = require('bespoken-tools');
var child_process = require('child_process');

describe('RivescriptChatbot', function() {
  var alexa = null;

  beforeEach(function (done) {
    alexa = new bst.BSTAlexa('http://localhost:10000',
    '../speechAssets/IntentSchema.json',
    '../speechAssets/SampleUtterances.txt',
    'JPK');
    alexa.start(function (error) {
      if (error !== undefined) {
        console.error("Error: " + error);
      } else {
        done();
      }
    });
  });

  afterEach(function(done) {
    alexa.stop(function () {
      done();
    });
  });

  describe('Basic Test', function() {
    it('Launches and then says hello', function (done) {
      // Launch the skill via sending it a LaunchRequest
      alexa.launched(function (error, payload) {
        // Check that the introduction is play as outputSpeech
        assert.equal(payload.response.outputSpeech.ssml, '<speak>Hello, I\'m Chatter, lets start chatting.</speak>');

        // Emulate the user saying 'Play'
        alexa.intended('ChatBotIntent', {response: 'hello'}, function (error, payload) {
          // Ensure the correct directive and audioItem is returned
          assert(payload.response.outputSpeech.ssml);
          done();
        });
      });
    });

    it('Launches and then says what is your name', function (done) {
      // Launch the skill via sending it a LaunchRequest
      alexa.launched(function (error, payload) {
        // Check that the introduction is play as outputSpeech
        assert.equal(payload.response.outputSpeech.ssml, '<speak>Hello, I\'m Chatter, lets start chatting.</speak>');

        // Emulate the user saying 'Play'
        alexa.intended('ChatBotIntent', {response: 'what is your name'}, function (error, payload) {
          // Ensure the correct directive and audioItem is returned
          console.log(payload.response.outputSpeech.ssml);
          assert(payload.response.outputSpeech.ssml.indexOf('Chatter') !== -1);
          done();
        });
      });
    });
  });
});
