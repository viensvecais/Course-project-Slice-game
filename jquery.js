//click on start/reset
    //are we playing?
        //yes
            //reload page
        //no
            //set score to 0
            //show trials left box
            //change button text to reset game
            //1,create random fruit
            //define random step (speed)
            //2,move fruit down one step every 30 sec
                //is fruit too low?
                    //no
                        //repeat nr2
                    //yes
                        //any trials left?
                            //yes
                                //repeat nr1
                            //no
                                //Game over, button text:start game
//slice a fruit
    //play sound
    //explode fruit

//------------------------------------------------------------------------------
var playing = false;
var score = 0;
var trialsLeft;
var fruit = ["apple.png", "banana.png", "cherries.png", "grapes.png", "mango.png", "orange.png", "peach.png", "pear.png", "watermelon.png"];
var randomFruit = "";
var step;
var action;
var score;
randomFruit = "images/" + fruit[Math.floor(Math.random() * fruit.length)];
$(function () {
    $("#startreset").click(function () {
        //are we playing?
        if (playing === true) {
            //yes
                //reload page
            location.reload();
        } else {
            playing = true;
            //set score to 0
            $("#scorevalue").html(score);
            //show trials left box
            $("#trialsLeft").show();
            trialsLeft = 3;
            addHearts();
            //change button text to reset game
            $("#startreset").html("Reset game");
            startAction();
            $("#gameover").hide();
        }
    });
    $("#fruit1").mouseover(function(){
        score++;
        $("#scorevalue").html(score);
//        document.getElementById("slicesound").play();
        $("#slicesound")[0].play();
//        stop, hide fruit
        clearInterval(action);
        $("#fruit1").hide("explode", 500);
//        send new fruit
        setTimeout(startAction, 550);
        
    });
    
//functions
function addHearts() {
    $("#trialsLeft").empty();
    for (var i=0; i<trialsLeft; i++){
    $("#trialsLeft").append('<img src="images/heart.png" class="life">');
}
}
function startAction(){
    //1,create random fruit
    chooseFruit();
    $("#fruit1").show();
    $("#fruit1").css({
        left: Math.round(Math.random()*550),
        top: -100,
    });
    //define random step (speed)
    step = Math.round(1+Math.random()*5);
    //2,move fruit down one step every 10 ms
    action = setInterval(function(){
        $("#fruit1").css("top" , $("#fruit1").position().top + step);
        //is fruit too low?
        if($("#fruit1").position().top>$("#fruitsContainer").height()){
            //yes
                //any trials left?
            if(trialsLeft>1){
                
                chooseFruit();
                $("#fruit1").show();
                $("#fruit1").css({
                    left: Math.round(Math.random()*550),
                    top: -100,
                });
                //define random step (speed)
                step = Math.round(1+Math.random()*5);
                trialsLeft --;
                addHearts();
            }else{
                playing=false;
                $("#startreset").html("Start game");
                $("#gameover").show();
                $("#result").html(score);
                $("#trialsLeft").hide;
                stopAction();
            }
           }
    }, 10);
    
}
//1,create random fruit
function chooseFruit(){
    var fruit = ["apple.png", "banana.png", "cherries.png", "grapes.png", "mango.png", "orange.png", "peach.png", "pear.png", "watermelon.png"];
    var randomFruit = "";
    randomFruit = "images/" + fruit[Math.floor(Math.random()*fruit.length)];
    $("#fruit1").attr("src", randomFruit);
}
function stopAction(){
    clearInterval(action);
    $("#fruit1").hide();
};
});
