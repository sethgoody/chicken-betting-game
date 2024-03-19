function newImage(url){
    let image = document.createElement('img')
    image.src = url
    image.style.position = 'absolute'
    document.body.append(image)
    return image
}

function BoJack(x, y) {
    const element = newImage('./assets/BoJack/tile015.png')
    element.style.zIndex = 2;
    const startPosition = { x: 150, y: 150};

    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
    
    return {
        element: element,
        startPosition: startPosition
    }
}

let horse1 = BoJack(150, 250)