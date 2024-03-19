// creating images on the dom
function newImage(url){
    let image = document.createElement('img')
    image.src = url
    image.style.position = 'absolute'
    document.body.append(image)
    return image
}
// Generating Bojack
function BoJack(x, y) {
    const element = newImage('./assets/BoJack/tile015.png')
    element.style.zIndex = 2;
    const startPosition = { x: 150, y: 150};

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;

    function changeDirection(direction) {
        if (direction === null) {
            element.src = `./assets/BoJack/tile015.png`
        }
        if (direction === 'east') {
            element.src = `./assets/BoJack/run.gif`
        }
    }
    move(element).startRace(x, y, changeDirection)

    
    return {
        element: element,
        startPosition: startPosition
    }
}

// placing all horses
let horse1 = BoJack(150, 250)

// creating movement
function move(element) {
    element.style.position = 'fixed'

    function moveToCoordinates(left, bottom) {
        element.style.left = left + 'px'
        element.style.bottom = bottom + 'px'
    }

    function startRace(left, bottom, callback){
        let direction = null;
        let x = left;
        let y = bottom;

        element.style.left = x + 'px'
        element.style.bottom = y + 'px'
        
        function moveAllObjects(){ 
            if(direction === 'east'){
                x+=1
            }

            element.style.left = x + 'px'
            element.style.bottom = y + 'px'
        }
        
        setInterval(moveAllObjects, 1)

        // creating controls
        document.addEventListener('keydown', function(e){
            if(e.repeat) return;
        
            if(e.key === 'ArrowUp'){
                direction = 'east'
            }
            callback(direction)
        })
        
        document.addEventListener('keyup', function(e){
            direction = 'east'
            callback(direction)
        })
    }

    return {
        to: moveToCoordinates,
        startRace: startRace
    }
}