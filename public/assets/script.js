let handleFail = function(err){
    console.log("Error : ", err);
};

//Query containers
let remoteContainer = document.getElementById('remote-container');
let canvasContainer = document.getElementById('canvas-container');

//Add video stream

function addVideoStream(streamId){
    let streamDiv = document.createElement('div');
    streamDiv.id = streamId;
    streamDiv.style.transform='rotateY(180deg)';
    remoteContainer.appendChild(streamDiv);
} 

//Remove video stream

function removeVideoStream(evt) {
    let stream = evt.stream;
    stream.stop();
    let remDiv = document.getElementById(stream.getId());
    remDiv.parentNode.removeChild(remDiv);
    console.log("Remote stream is removed" + stream.getId());
}

//Add canvas

function addCanvas(streamID){
    let video = document.getElementById(`video${streamId}`);
    let canvas = document.createElement('canvas');
    canvasContainer.appendChild(canvas);
    let ctx = canvas.getContext('2d');

    video.addEventListener('loadmetadata', function(){
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    });

    video.addEventListener('play', function() {
        var $this = this;
         (function loop() {
             if(!$this.paused && !$this.ended){
                 if($this.width == canvas.width){
                     canvas.width = video.videoWidth;
                     canvas.height = video.videoHeight;
                 }
                 ctx.drawImage($this, 0, 0);
                 setTimeout(loop, 1000/30)
             }
         })();
}, 0);

} 

let client = AgoraRTC.createClient({
    mode: 'live',
    codec: 'h264'
});

//Initialise a stream
client.init('f8bfc6e6ef824ef9b719490b994d6a96', ()=> console.log("client initialized"));

//Join a stream
const token ='006f8bfc6e6ef824ef9b719490b994d6a96IAADCzz/GenK3tJnHs2xOFpw5k0CTYquthRwbfCW9ik/MqDfQtYAAAAAEAD27b1wPROuXQEAAQA8E65d'
client.join(token, 'demo', null, (uid)=>{
    let localStream = AgoraRTC.createStream({
        streamID: uid,
        audio: true,
        video: true,
        screen: false,
    });

    //Initialise stream
    localStream.init(function(){
        localStream.play('me');
        client.publish(localStream,handleFail);

        //Listen for stream added events
        client.on('stream-added', function(evt) {
            client.subscribe(evt.stream, handleFail);
        });

        //After subscribing to a stream
        client.on('stream-subscribed', function(evt){
            let stream = evt.stream;
            addVideoStream(stream.getId());
            stream.play(stream.getId());
            addCanvas(stream.getId());
        });

        client.on('stream-removed', removeVideoStream);
    }, handleFail); 
}, handleFail); 

