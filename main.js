song_burst="";
song_turbo="";
 leftWristX ="";
 leftWristY ="";
 rightWristX ="";
 rightWristY ="";
scoreleftwrist = "";
scorerightwrist = "";

 function setup(){
   canvas = createCanvas(500,400);
   canvas.center();
   canvas.position(440,200);

   video = createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video, modelLoaded);
   poseNet.on('pose', gotPoses);
}

function modelLoaded(){
console.log("PoseNet is initialized!");
}

function gotPoses(results){
if(results.length > 0){
    console.log(results);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("LeftWristX ="+ leftWristX +"LeftWristY"+ leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("RightWristX ="+ rightWristX + "RightWristY ="+ rightWristY);

    scoreleftwrist = results[0].pose.keypoints[9].score;
    console.log("score left wrist is"+ scoreleftwrist);

    scorerightwrist = results[0].pose.keypoints[10].score;
    console.log("score right wrist is "+ scorerightwrist);
}
}
function draw(){
    image(video,0,0,500,400);

    fill('red');
    stroke('red'); 

    if(scorerightwrist > 0.2){

    circle(rightWristX,rightWristY,15);
    if(rightWristY > 0 && rightWristY <= 100){
     document.getElementById("speed").innerHTML = "Speed = 0.5x";
     song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1.0);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2.0);
    }
    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
}
if(scoreleftwrist > 0.2){
    circle(leftWristX,leftWristY,15);

    NumberleftwristY = number(leftWristY);
    remove_decimals = floor(NumberleftwristY);

    volume = remove_decimals/500;
    document.getElementById("Volume").innerHTML ="volume"+ volume;
    song.setVolume(volume);
}  
}

function preload(){
    song = loadSound("");
}

function play(){
song.play();
song.setVolume(0.7);
song.rate(1);
}