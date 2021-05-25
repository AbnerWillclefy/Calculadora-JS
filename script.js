const maxWidth = 8
let count = []
let result = document.getElementById('result')
let accum = document.getElementById('expression')
let savedAction

function addNumber(num) {
    result.removeAttribute("hidden")
    if(result.innerHTML.length < maxWidth) {
        result.innerHTML += num
    }
}

function addOperator(op) {
    var currentNum = result.innerHTML

    if(currentNum.length === 0) {return }

    count.push(Number(result.innerHTML))
    accum.removeAttribute("hidden")
    accum.innerHTML += `${result.innerHTML} ${op} `
    result.innerHTML = ''
    count.push(op)
}

function calcAction () {
    let action = null
    let current = null

    var total = 0

    if(isNaN(count[count.length - 1])) {
        count.pop()
    }

    count.forEach(n => {
        if(!isNaN(n)) {
            if(current == null) {
                current = n
            } else {
                total += processCalc(current, n, action)
                current = null
            }
        } else {
            action = n
            savedAction = n
        }
    })
    
    if(current != null) {
        total = processCalc(total, current, action)
    }

    //accum.innerHTML=""
    result.innerHTML = total.toString().substring(0, maxWidth)
    count = []
}

function generateResult() {
    currentAccum = accum.innerHTML
    if(currentAccum[currentAccum.length - 1] === "=" && result.innerHTML.length > 0) {
        result.innerHTML = processCalc(Number(result.innerHTML), Number(result.innerHTML), savedAction).toString().substring(0, maxWidth)
    }

    if(count.length === 0) {return }

    count.push(Number(result.innerHTML))
    accum.innerHTML += `${result.innerHTML} = `

    calcAction()
}

function clearAll() {
    result.innerHTML = ''
    accum.innerHTML = ''
}

function clean() {
    result.innerHTML = ''
}

function processCalc(num1, num2, operation) {
    switch(operation) {
        case '+': return num1 + num2
        case '-': return num1 - num2
        case 'x': return num1 * num2
        case '/': return num1 / num2
    }
}

function percentage() {
    if(result.innerHTML != "") {
        result.innerHTML = Number(result.innerHTML / 100)
    }
}