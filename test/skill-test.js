var assert = require('assert');
var bst = require('bespoken-tools');
var child_process = require('child_process');

describe('RivescriptChatbot', function() {
  var alexa = null;
  var handler = null;

  beforeEach(function (done) {
    console.log(process.cwd());
    var options = {
      encoding: 'utf8',
      timeout: 10000,
      maxBuffer: 2000*1024,
      killSignal: 'SIGTERM',
      cwd: './../src',
      env: null,
      shell: true
    };
    handler = child_process.spawn('/usr/local/bin/bstpy', ['-l', 'index.lambda_handler'], options);
    console.log('Handler: ' + handler);
    handler.stdout.on('data', function(data) {
      console.log('STDOUT: ' + data);
    });

    handler.stdout.on('readable', function(data) {
      console.log('readable: ' + data);
    });

    handler.stdout.on('error', function(data) {
      console.log('error: ' + data);
    });

    handler.stderr.on('data', function(error) {
      console.log('STDERR: ' + error);
    });

    handler.on('error', function(error) {
      console.log('ERROR');
    });

    handler.on('close', function(error) {
      console.log('CLOSED');
    });

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
      handler.kill('SIGTERM');
      alexa.stop(function () {
        done();
      });
  });

  describe('Basic Test', function() {
    it('Launches and then plays first', function (done) {
        this.timeout(10000);
        setTimeout(function () {
          done();
        }, 10000);
        // Launch the skill via sending it a LaunchRequest
        // alexa.launched(function (error, payload) {
        //     console.log('Payload: ' + payload);
        //     // Check that the introduction is play as outputSpeech
        //     assert.equal(payload.response.outputSpeech.ssml, '<speak> <audio src="https://s3.amazonaws.com/bespoken/streaming/bespokenspodcast-INTRODUCTION.mp3" />You can say play, scan titles, or about the podcast </speak>');
        //
        //     // Emulate the user saying 'Play'
        //     alexa.spoken('Play', function (error, payload) {
        //         // Ensure the correct directive and audioItem is returned
        //         assert.equal(payload.response.directives[0].type, 'AudioPlayer.Play');
        //         assert.equal(payload.response.directives[0].playBehavior, 'REPLACE_ALL');
        //         assert.equal(payload.response.directives[0].audioItem.stream.token, '0');
        //         assert.equal(payload.response.directives[0].audioItem.stream.url, 'https://traffic.libsyn.com/bespoken/TIP103.mp3?dest-id=432208');
        //         done();
        //     });
        // });
    });
  });
});
