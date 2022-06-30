const [MIN_INT, MAX_INT] = [1, 1000]

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

async function createRandomIntArray(quantity) {
    const numbers = []
    for (let i = 0; i < quantity; i++) {
        numbers.push(
            generateRandomInt(MIN_INT, MAX_INT)
        )
    }
    numbers.sort()
    return numbers
}

async function generateNumbers(quantity) {
    const numbers = await createRandomIntArray(quantity)
    const groupNumbers = {}
    let previous = numbers[0]
    let sum = 0
    numbers.forEach(num => {
        if (num == previous){
            sum++
        } else {
            groupNumbers[previous] = sum
            sum = 1
            previous = num
        }
        
    })
    return groupNumbers
}


/* Connection with the server (FORK). */
process.on('message', (cantNumbers) => {
    generateNumbers(cantNumbers)
        .then(numbers => {
            process.send(numbers)
            process.exit()
        })
})

process.send('starting')