const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/inr.json";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn=document.querySelector("button");
const fromselect=document.querySelector("#from-select");
const toselect=document.querySelector("#to-select");
const ratemsg=document.querySelector(".ratemsg");
const resultmsg=document.querySelector(".resultmsg");
const url= "https://v6.exchangerate-api.com/v6/c99d9b05785246b5f5df8946/latest/";
for(let select of dropdowns)
{
    for(currcode in countryList)
    {
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="To" && currcode==="INR")
        {
            newOption.selected="selected";
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt)=>{
        updateflag(evt.target);
    });
}



const updateflag=(element)=>{
    let currcode=element.value;
    console.log(currcode);
    let countrycode = countryList[currcode];
    let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click", async (evt)=>{
   evt.preventDefault();
   let amount=document.querySelector(".amount input");
   let amtvalue=amount.value;
   if(amtvalue==="" || amtvalue < 1){
    amtvalue=1;
    amount.value=1;
   }
  const newurl=`https://v6.exchangerate-api.com/v6/c99d9b05785246b5f5df8946/latest/${fromselect.value}`;
  let response=await fetch(newurl);
  let data=await response.json();
  let exchangerate=data.conversion_rates[toselect.value];
  let result=exchangerate*amtvalue;
  ratemsg.style.display="block";
  resultmsg.style.display="block";
  resultmsg.style.backgroundColor="rgb(119, 223, 119)";
  ratemsg.innerText=`1${fromselect.value} = ${exchangerate} ${toselect.value}`;
  resultmsg.innerText=`${amtvalue} ${fromselect.value} = ${result} ${toselect.value}`;
  
})