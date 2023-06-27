const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

async function askQuestion(question, cast = 'int') {
    return new Promise((resolve, reject) => {
        readline.question(question, (answer) => {
        
            resolve(cast === 'int' ? parseInt(answer): answer)
            
        })
    })
}

function close() {
    readline.close()
}

module.exports = {askQuestion, close}