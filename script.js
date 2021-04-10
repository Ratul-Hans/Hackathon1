const pup = require("puppeteer");
let id = "dineniy462@684hh.com";
let pass = "piyush@12345";
let tab;
let fs = require('fs');
/* async function speechRec()
{
    var SpeechRecognition = window.webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

      let textbox= await tab.$("#gh-ac");
      let content="";
      recognition.continuous=true;

      recognition.onstart;
      recognition.onspeechend;
      recognition.onerror;
      recognition.onresult = function(event){
          let current = event.resultIndex;
          let transcript=event.results[current][0].transcript;

          content+=transcript;
           
          tab.type("#gh-ac",content);
      };
      textbox.click(function(event){
          if(content.length)
          content+="";

          recognition.start();
      })
}
async function runSpeechRecognition() {
    // new speech recognition object
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        alert("listening, please speak...");
    };
    
    recognition.onspeechend = function() {
        alert("stopped listening, hope you are done...");
        recognition.stop();
    }
  
    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        var confidence = event.results[0][0].confidence;

        return transcript;
    };
  
     // start recognition
     recognition.start();
} */
async function main() {
    let browser = await pup.launch({
        headless: false,
        defaultViewport: false,
        args: ["--start-fullscreen"]
    });

    let pages = await browser.pages();
    tab = pages[0];
    let pageOpenPromise = await tab.goto("https://www.ebay.com/");
    
    // SYNCHRONOUS WAIT
     await new Promise(function(resolve,reject){
        setTimeout(resolve,400); // or setTimeout(function(){resolve()},5000);
    });
    await tab.waitForSelector("#gh-topl .gh-t #gh-ug a", { visible: true });
    await tab.click("#gh-topl .gh-t #gh-ug a");
    await tab.waitForSelector("#userid", { visible: true });
    // SYNCHRONOUS WAIT
    await new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
    });
    // SYNCHRONOUS WAIT
    await new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
    });
    await tab.type("#userid", id);
    await tab.click("#signin-continue-btn");
    // SYNCHRONOUS WAIT
    await new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
    });
    await tab.waitForSelector("#pass", { visible: true });
    await tab.type("#pass", pass);
    await tab.click("#sgnBt");
    await tab.waitForSelector("#gh-ac", { visible: true });
    //let tex=runSpeechRecognition();
    /* var recognition = new SpeechRecognition();
    document.body.onclick = function() {
        recognition.start();
        console.log('Ready to receive a color command.');
      }
      
      abortBtn.onclick = function() {
        recognition.abort();
        console.log('Speech recognition aborted.');
      }
      
      recognition.onspeechend = function() {
        recognition.stop();
        console.log('Speech recognition has stopped.');
      } */
    //await speechRec();
    // SYNCHRONOUS WAIT
    await new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
    });
    await tab.type("#gh-ac", "men clothes");
    await tab.click("#gh-btn");
    await tab.waitForSelector(".s-item__wrapper.clearfix", { visible: true });
    let descr = ["Cloth_Name", "Price", "Shipping Charges"];
    
    let finalData = [{"Cloth_Name": "",
                      "Price": "", 
                      "Shipping Charges":""}];

    await tab.waitForSelector(".s-item__wrapper.clearfix h3", { visible: true });
    let nameData = await tab.$$(".s-item__wrapper.clearfix h3");
    for (let i in nameData) {
        let name = await tab.evaluate(function (ele) {
            return ele.textContent;
        }, nameData[i]);
        finalData[i]={};
        finalData[i][descr[0]] =name;
    }

    fs.writeFileSync("Cloth_Names.json", JSON.stringify(finalData));

    await tab.waitForSelector(".s-item__price", { visible: true });
    let itemPrice = await tab.$$(".s-item__price");
    for (let i in itemPrice) {
        let price = await tab.evaluate(function (ele) {
            return ele.textContent;
        }, itemPrice[i]);
        
        finalData[i]={};
        finalData[i][descr[1]] = price;
        
    }
    fs.writeFileSync("Prices.json", JSON.stringify(finalData));

    await tab.waitForSelector(".s-item__logisticsCost", { visible: true });
    let shippingPrice = await tab.$$(".s-item__logisticsCost");
    for (let i in shippingPrice) {
        let price = await tab.evaluate(function (ele) {
            return ele.textContent;
        }, shippingPrice[i]);
        finalData[i] = {};
        finalData[i][descr[2]] = price;
    }
    fs.writeFileSync("Shipping Prices.json", JSON.stringify(finalData));
    
    await tab.waitForSelector(".x-refine__select__svg .checkbox.cbx.x-refine__multi-select-checkbox input", { visible: true });
    let categories=await tab.$$(".x-refine__select__svg .checkbox.cbx.x-refine__multi-select-checkbox input");
    // SYNCHRONOUS WAIT
    await new Promise(function (resolve, reject) {
        setTimeout(resolve, 2000);
    });
    //await tab.click(".x-refine__select__svg .checkbox.cbx.x-refine__multi-select-checkbox input",{clickCount:1});
    await tab.click("categories[13]",{clickCount:1});
    /* let loginPromise=await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForNavigation({waitUntil: "networkidle2"});
    await tab.click(".dropdown-handle.nav_link.toggle-wrap");
    await tab.click("a[data-analytics='NavBarProfileDropDownAdministration']");
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li", {visible: true});
    let linkLists = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    await linkLists[1].click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right", {visible: true});
    let createChallengeButton = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeUrl = await tab.evaluate(function(ele){
        return ele.getAttribute("href");
    },createChallengeButton);
    for(let i = 0; i < challenges.length; i++) {
        await createChallenge("https://www.hackerrank.com"+createChallengeUrl,challenges[i]);
    }
    // WAITS FOR 5 seconds and then the Promise will be resolved. This is called
    // SYNCHRONOUS WAIT
    await new Promise(function(resolve,reject){
        setTimeout(resolve,5000); // or setTimeout(function(){resolve()},5000);
    });
}
async function createChallenge(url,challenge)
{
    await tab.goto(url);
    await tab.waitForSelector("#name",{visible: true});
    await tab.type("#name",challenge["Challenge Name"]);
    await tab.type("#preview",challenge["Description"]);
    await tab.waitForSelector("#problem_statement-container .CodeMirror textarea",{visible: true});
    await tab.type("#problem_statement-container .CodeMirror textarea", challenge["Problem Statement"]);
    await tab.type("#input_format-container .CodeMirror textarea", challenge["Input Format"]);
    await tab.type("#constraints-container .CodeMirror textarea", challenge["Constraints"]);
    await tab.type("#output_format-container .CodeMirror textarea", challenge["Output Format"]);
    await tab.waitForSelector("#tags_tag",{visible: true});
    await tab.type("#tags_tag",challenge["Tags"]);
    await tab.keyboard.press("Enter");
    await tab.click(".save-challenge.btn.btn-green");*/
}
main();
