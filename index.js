//document.getElementById("count-ele").innerText=5;
//let countEle=document.getElementById("count-ele")
//console.log(countEle;
// JavaScript code to change the message when the button is 
let myLeads =[]

// myLeads = JSON.parse(myLeads)
// myLeads.push("www.google.comy")
// myLeads = JSON.stringify(myLeads)
//console.log(typeof myLeads)


const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const delBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// localStorage.setItem("myLeads","www.google.com")
// localStorage.getItem("myLeads")
// localStorage.clear()

const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if(leadsFromLocalStorage)
{
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){    
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      myLeads.push(tabs[0].url)
      localStorage.setItem("myLeads", JSON.stringify(myLeads) )
      render(myLeads)
  })
})

function render(leads)
{
    let listItems = ""
for(let i=0;i<leads.length;i++)
{
    // 1.  ulEl.innerHTML += "<li>"+myLeads[i]+"</li>"
    // 2. const li = document.createElement("li")
    // li.textContent = myLeads[i]
    // ulEl.append(li)
    //3.
    // listItems += "<li><a target='_blank' href='" + myLeads[i] + "'>" + myLeads[i] + "</a></li>"
    listItems += `
        <li>
           <a target='_blank' href='${leads[i]}'>
             ${leads[i]} 
           </a>
        </li>`
}
ulEl.innerHTML =listItems
}

inputBtn.addEventListener("click",function()
{
   myLeads.push(inputEl.value)
   inputEl.value=""
   localStorage.setItem("myLeads",JSON.stringify(myLeads))
   render(myLeads)
})

delBtn.addEventListener("dblclick",function()
{
  localStorage.clear()
  myLeads = []
  render(myLeads)
})
