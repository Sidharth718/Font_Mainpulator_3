function preload()
{

}

nose_x = 0;
nose_y = 0;
lwx = 0;
rwx = 0;
difference = 0;

function setup(){
    canvas = createCanvas(450, 450)
    canvas.position(800,150)
    video = createCapture(VIDEO)
    video.size(400, 400)
    video.position(200,180)
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
}

function gotPoses(results){

    if (results.length > 0){
        console.log(results);
        nose_x = results[0].pose.nose.x;
        nose_y = results[0].pose.nose.y;
        console.log("Nose X = " + nose_x + "and Nose y = " + nose_y);
        lwx = results[0].pose.leftWrist.x;
        rwx = results[0].pose.rightWrist.x;
        console.log("Left Wrist X = " + lwx + "and Right Wrist X = " + rwx);
        difference = lwx - rwx;
        Rounded_number = Math.round(difference);
        document.getElementById("size_measurements").innerHTML = "The width and high of the text is " + Rounded_number;
    }
}

function modelLoaded(){
    console.log("Model Successfuly loaded")
}

function draw(){
    background('yellow');
    fill('orange');
    stroke('red');
    textSize(difference);
    text("Cool!", nose_x, nose_y)
}