const arrowContainers = document.querySelectorAll('.arrow-cont-left, .arrow-cont-right');
const arrows = document.querySelectorAll('.arrow-circle');
const topicBar = document.querySelector('.topics');

let length = 70;
let slidedLength = 0;
// let visibleLength = document.querySelector('.topics-bar').getBoundingClientRect().width;
let totalLength = topicBar.getBoundingClientRect().width;

function moveForwad(){
    topicBar.style.transform = `translateX(-${length + slidedLength}px)`;
    slidedLength += length;
    checkAndActForw();
}

function moveBack(){
    topicBar.style.transform = `translateX(${length - slidedLength}px)`;
    slidedLength -= length;
    checkAndActBack();
}

function checkAndActForw(){
    if(!isAtStart()){
        arrowContainers[0].classList.add('active');
    }
    if(isAtEnd()){
        arrowContainers[1].classList.remove('active');
    }
}

function checkAndActBack(){
    if(isAtStart()){
        arrowContainers[0].classList.remove('active');
    }
    if(!isAtEnd()){
        arrowContainers[1].classList.add('active');
    }
}

function isAtStart(){
    if(slidedLength==0){
        return true;
    }
    return false;
}

function isAtEnd(){
    if(slidedLength>=1650){
        return true;
    }

    return false;
}

arrows[0].addEventListener('click',moveBack);
arrows[1].addEventListener('click',moveForwad);