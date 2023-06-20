const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

async function askQuestion(question) {
    return new Promise((resolve, reject) => {
        readline.question(question, (answer) => {
        
            resolve(parseInt(answer))
            
        })
    })
}

function close() {
    readline.close()
}

module.exports = {askQuestion, close}