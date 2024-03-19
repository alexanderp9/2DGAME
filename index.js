const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 32) {
    collisionsMap.push(collisions.slice(i, i + 32));
}

class Boundary {
    constructor({position}) {
        this.position = position
        this.width = 84
        this.height = 84
    }

    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x + 675, this.position.y + 1060, this.width, this.height)
    }
}
const boundaries = []
const offset = {
    x: 0,
    y: 0
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j)=> {
        if(symbol === 1153)
        boundaries.push(
            new Boundary({
                position: {
                    x: j * 96,
                    y: i * 96
                }
            })
        )
    })
})


const image = new Image()
image.src = '/img/DDMAP40.png'

const playerImage = new Image()
playerImage.src = '/img/deden3.png'

class Sprite {
    constructor({position, velocity, image}) {
        this.position = position
        this.image = image
    }

    draw(){
        c.drawImage(this.image, this.position.x, this.position.y)

    }
}



const background = new Sprite({
        position: {
    x: offset.x,
    y: offset.y
},
    image: image
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        const boundaryX = boundary.position.x + background.position.x;
        const boundaryY = boundary.position.y + background.position.y;
        const adjustedBoundaryPosition = { x: boundaryX, y: boundaryY };


        new Boundary({ position: adjustedBoundaryPosition }).draw();
    })
    c.drawImage(playerImage, 250, 250, 150,150)

    if (keys.w.pressed) background.position.y += 7
    else if (keys.s.pressed) background.position.y -= 7
    else if (keys.a.pressed) background.position.x += 7
    else if (keys.d.pressed) background.position.x -= 7
}
animate()

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
})
window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})





