

document.addEventListener("DOMContentLoaded", function(event) {
window.onload = function() {
const targets = document.querySelectorAll("li");
const articles = document.querySelectorAll(".article");
let activeTab = 0;
let old = 0;
let dur = 0.4;
let timelines = [];
let animation;
let oldHeight;
let newHeight = articles[0].offsetHeight;
for (let i = 0; i < targets.length; i++) {
  targets[i].index = i;
  TweenMax.set(articles[i], {autoAlpha:0}); // hide all articles 
  targets[i].addEventListener("click", doCoolStuff);
  timelines.push(new TimelineMax({paused:true})); // create an array of timelines
}

// create the 4 unique timelines
timelines[1].staggerFrom("#article2 h1, #article2 p, #article2 img", 0.8, {autoAlpha:0, ease:Linear.easeNone}, 0.25 );

timelines[2].from("#article4 h1, #article4 p", 0.5, {x:100, autoAlpha:0});
timelines[2].from(".b", 0.5, {autoAlpha:0, ease:Linear.easeNone});
timelines[2].staggerFrom(".c img, .d img", 0.75, {yPercent:120}, 0.25);

timelines[3].from("#article3 h1", 0.6, {rotation:90, opacity:0, transformOrigin:"left top"} );
timelines[3].from("#article3 form", 0.75, {opacity:0, ease:Linear.easeNone} );


// set initial article block height and position popper on first tab 
TweenMax.set(articles[0], {autoAlpha:1});
TweenMax.set(".slider", {x:targets[0].offsetLeft, width:targets[0].offsetWidth});
TweenMax.set(".article-block", {height:newHeight});

// play 1st timeline on page load
timelines[0].play();


function doCoolStuff() {
  // check if clicked target is new and if the timeline is currently active
  if(this.index != activeTab) {
    //if there's an animation in-progress, jump to the end immediately so there aren't weird overlaps. 
    if (animation && animation.isActive()) {
      animation.progress(1);
    }
    animation = new TimelineMax();
    old = activeTab;
    oldHeight = newHeight;
    activeTab = this.index;
    newHeight = articles[activeTab].offsetHeight;
    
    // animate popper to clicked target
    animation.to(".slider", 0.25, {y:60, ease:Back.easeIn});
    animation.set(".slider", {x:targets[activeTab].offsetLeft, width:targets[activeTab].offsetWidth});    
    animation.to(".slider", 0.25, {y:0, ease:Back.easeOut}, "byebye");
    
    // slide current article down out of view and then set it to starting position 0 with autoAlpha:0
    animation.to(articles[old], 0.5, {y:oldHeight, ease:Power3.easeIn }, "byebye");
    animation.set(articles[old], {autoAlpha:0, y:0 });

    // resize article block to accommodate new content and change visibility of new content
    animation.set(articles[activeTab], {autoAlpha:1});
    animation.to(".article-block", dur, {height:newHeight, ease:Power3.easeInOut}, "newStuff");
    // add unique timeline     
    animation.add(timelines[activeTab].play(0), "newStuff+=0.1");
  }
}

function newSize() {
  TweenMax.set(".slider", {x:targets[activeTab].offsetLeft, width:targets[activeTab].offsetWidth});
  newHeight = articles[activeTab].offsetHeight;
  TweenMax.set(".article-block", {height:newHeight});
}



window.addEventListener("resize", newSize);

let pfPics = document.querySelectorAll(".pfo")
//add zoom-in picture for portfolio projects
for(let i=0; i<pfPics.length;i++){
  pfPics[i].getElementsByClassName.height=pfPics[i].offsetWidth +"px";
  pfPics[i].addEventListener("mouseenter", function(e){
    
    TweenMax.to(e.target.querySelector('img'), 2,{scale:"1.15"});
  })
  pfPics[i].addEventListener("mouseleave", function(e){
    TweenMax.to(e.target.querySelector('img'),0.5, {scale:"1"})
  })
}
      
    };
});
