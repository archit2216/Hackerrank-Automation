const puppeteer=require("puppeteer");
const ansObject=require("./codes");
let cpage;
const BrowserPromise=puppeteer.launch({
    headless:false,
    args:["--start-maximized"],
    defaultViewport:null
});
let pagesArr=BrowserPromise.then(function(browser){
    pagesArr=browser.pages();
    return pagesArr;
}).then(function(PageArray){
    cpage=PageArray[0];
    let gotoProm=cpage.goto("https://www.hackerrank.com/auth/login");
    return gotoProm;
}).then(function(){
    let waiter=waitForSelector("#input-1",{visible:true});
    return waiter;
}).catch(function(err){
    console.log(err);
}).then(function(){
    let enterEmail=cpage.type("#input-1","sharmaarchit2216@gmail.com");
    return enterEmail;
}).then(function(){
    let enterPass=cpage.type("input[type='password'].input","archit@c32");
    return enterPass;
}).then(function(){
    let pressProm=cpage.keyboard.press("Enter");
    return pressProm;
}).catch(function(err){
    console.log(err);
}).then(function(){
    let waiter=waitAndClick(cpage,".topic-name[data-automation='algorithms']");
    return waiter;
}).then(function(){
    let waiter=waitAndClick(cpage,".checkbox-input[value='warmup']");
    return waiter;
}).then(function(){
    let pageReloadWait=cpage.waitFor(3000);   // waitFor() is used to wait for page load or any other activity for specified amount of time
    return pageReloadWait;
}).then(function(){
    let QuesArr=cpage.$$(".challenges-list .js-track-click.challenge-list-item");   // $$ is same as querySelectorAll
    return QuesArr;
}).then(function(questions){
    let solveit=questionSolver(cpage,questions[0],ansObject.answers[0]);
    return solveit;
})


function waitAndClick(cpage,selector){
    return new Promise(function(resolve,reject){
        let waitForPromise=cpage.waitForSelector(selector,{visible:true});
        waitForPromise.then(function(){
            let clicked=cpage.click(selector);
            return clicked;
        }).then(function(){
            resolve();
        }).catch(function(){
            reject();
        })
    })
}
function questionSolver(cpage,ques,ans){
    return new Promise(function(resolve,reject){
        let clicking=ques.click();
        clicking.then(function(){
            let textEditorFocuessedProm=waitAndClick(cpage,".monaco-editor.no-user-select.vs");
            return textEditorFocuessedProm;   // we don't use the provided text editor becoz while writing "for(" we het "for()" in the code editor, which would cause error in our code
        }).then(function(){
            let checkBoxProm=waitAndClick(cpage,".checkbox-input");
            return checkBoxProm;
        }).then(function(){
            let textAreaProm=waitAndClick(cpage,".input.text-area.custominput.auto-width");
            return textAreaProm;
        }).then(function(){
            let TypeAnsPromise=cpage.type(".input.text-area.custominput.auto-width",ans);
            return TypeAnsPromise;
        }).then(function(){
            let PressCtrlProm=cpage.keyboard.down("Control");
            return PressCtrlProm;
        }).then(function(){
            let PressAProm=cpage.keyboard.down("A");
            return PressAProm;
        }).then(function(){
            let PressCtrlProm=cpage.keyboard.down("Control");
            return PressCtrlProm;
        }).then(function(){
            let PressXProm=cpage.keyboard.down("X",{delay:100});
            return PressXProm;
        }).then(function(){
            let CtrlUnpressedProm=cpage.keyboard.up("Control");
            return CtrlUnpressedProm;
        }).then(function(){
            let CodeEditorProm=cpage.click(".monaco-editor.no-user-select.vs");
            return CodeEditorProm;
        }).then(function(){
            let PressCtrlProm=cpage.keyboard.down("Control");
            return PressCtrlProm;
        }).then(function(){
            let PressAProm=cpage.keyboard.down("A");
            return PressAProm;
        }).then(function(){
            let PressCtrlProm=cpage.keyboard.down("Control");
            return PressCtrlProm;
        }).then(function(){
            let PasteProm=cpage.keyboard.down("V");
            return PasteProm;
        }).then(function(){
            let CtrlUnpressedProm=cpage.keyboard.up("Control");
            return CtrlUnpressedProm;
        }).then(function(){
            let SubmitProm=cpage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled");
            return SubmitProm;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}
