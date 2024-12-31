BASE_URL=" https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let DropDowns=document.querySelectorAll(".dropdown select")
let fromCurr=document.querySelector(".from select")
let toCurr=document.querySelector(".to select")
for(let Drop of DropDowns){
    for(let code in countryList){
        let option=document.createElement("option")
        option.innerText=code
        option.value=code
        if(Drop.name==="from" && code==="USD"){
            option.selected="selected"
            
        }
        else{
            if(Drop.name==="to" && code==="INR"){
                option.selected="selected"
                
            }
        }
        Drop.append(option)

     
    }
    Drop.addEventListener("change",async(eve)=>{
        changeFlag(eve.target)
  })
}

const changeFlag=(element)=>{
   let code=element.value
   console.log(code)
   let countryCode=countryList[code]
   let flag=`https://flagsapi.com/${countryCode}/flat/64.png`
   
  let img=element.parentElement.querySelector("img")
  img.src=flag
  
}
let msg=document.querySelector(".msg")

let btn=document.querySelector("form button")
btn.addEventListener("click",async(eve)=>{
    eve.preventDefault();
    let amt=document.querySelector(".amount input")
    amtval=amt.value
    console.log(amtval)
    let URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let responce= await fetch(URL);
  let data= await responce.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

  let result=amtval*rate
msg.innerText=`${amtval} ${fromCurr.value} =${result} ${toCurr.value}`
   
})

