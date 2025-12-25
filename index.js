
let timeoutId;
let start_time = 0;
let elapsed_time = 0;
let mark_count = 0;
let canPause = false;
let timer = null;
let isActive = false;
let secs;
let secs_unfloor;
let isSecsPrime = false;

let max = 0;
let max_gap = 0;
let primeConcetration = 0;
let gaps = [];
let logs = [];

function isPrime(num){
    if(num < 2) return false
    for(let i = 2; i * i <= num; i++) { 
        if(num % i === 0) 
            return false
    } return true
}

function sum(list){
    let result = 0

    for(let i = 1; i < list.length; i++){
        result += list[i]
    }

    return result
}

let primeNums = [];
for(let i = 0; i <= 5000; i++) {
    if(isPrime(i)){
        primeNums.push(i)
    }
}

function updateStats(){
    document.getElementById("stats").innerHTML = `Attempt ${logs.length}<br>Max score: ${max}<br>Average score: ${Math.floor((sum(logs) / (logs.length - 1)) * 100) / 100}`
}

function switch_func(){
    if(canPause){
        canPause = false;
        console.log("stop()", canPause)
        stop()
    }
    else{
        canPause = true;
        document.getElementById("startBtn").textContent = "Stop"
        console.log("start()", canPause)
        start()
    }
}

function start(){
    console.log(isActive)
    if(!isActive){
        reset()
        start_time = Date.now() - elapsed_time;
        timer = setInterval(update, 10);
        isActive = true;
    }

}

function reset(){
    clearInterval(timer);
    start_time = Date.now();
    logs.push(Math.floor(elapsed_time / 1000))
    if(logs[logs.length - 1] > max){
        max = logs[logs.length - 1]
    }

    updateStats()

    elapsed_time = 0;
    isActive = false;
    timer = null;
    canPause = false;
    document.getElementById("time").innerHTML = "0";
 
}

function stop(){
    clearInterval(timer);
    elapsed_time = Date.now() - start_time;
    isActive = false;
    document.getElementById("startBtn").textContent = "Restart"
}

function format(min, max, current){
    let result = ""

    for(let i = min; i <= max; i++) {
        if(i < 0){
            result += ` <font class="hide"> </font>`
        } else if(i === current){
            if(primeNums.includes(i)){
                result += ` <b class="green">[ <u>${i}</u> ]</b>`
            } else{
                result += ` <b class="black">[ <u>${i}</u> ]</b>`
            }
        } else {
            if(i < current){
                result += ` ${i}`
            } else if(primeNums.includes(i)){
                result += ` <font class="green">${i}</font>`
            } else{
                result += ` <font class="black">${i}</font>`
            }
        }
    }

    return result
}

function update(){
    const current_time = Date.now()
    elapsed_time = current_time - start_time;
    if(secs !== Math.floor(elapsed_time / 1000)){
        secs = Math.floor(elapsed_time / 1000);
        isSecsPrime = primeNums.includes(secs)
        document.getElementById("nums").innerHTML = format(secs-10, secs+10, secs)
        
        if(isSecsPrime){
            console.log(`${secs} is prime!!!`)
            document.getElementById("isPrime").innerHTML = `<font class="green">${secs} is PRIME!!!</font>`

        } else {
            document.getElementById("isPrime").innerHTML = `<font class="black">${secs} is not prime.</font>`
        }

        updateStats()
        
    }

    secs_unfloor = elapsed_time / 1000 - secs

    if(isSecsPrime){
        document.getElementById("time").innerHTML = `<font style="color: hsla(120, 100%, ${Math.floor(secs_unfloor * 50) + 50}%, 1.00)">
${String(secs)}</font>`
    } else {
        document.getElementById("time").innerHTML = `<font style="color: hsla(0, 100%, ${Math.floor(secs_unfloor * 50) + 50}%, 1.00)">
${String(secs)}</font>`
    }
    
}


"hsla(120, 100%, 50%, 1.00)"
"hsla(0, 0%, 0%, 1.00)"

// ${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}:${String(date.getSeconds()).padStart(2,'0')}:${String(date.getMilliseconds()).padStart(3,'0')}</h2>`
