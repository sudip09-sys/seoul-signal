const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const code=fs.readFileSync(__dirname+'/app.js','utf8').split("$('#deck-filter').innerHTML+=")[0];
function harness(stored=null){const elements=new Map();const element=selector=>{if(!elements.has(selector))elements.set(selector,{textContent:'',innerHTML:'',value:'all',hidden:false,addEventListener(){},setAttribute(){},classList:{add(){}}});return elements.get(selector);};const ctx=vm.createContext({document:{querySelector:element,querySelectorAll:()=>[],addEventListener(){}},window:{},location:{hash:''},localStorage:{getItem:()=>stored,setItem(){}},setTimeout:()=>0,clearTimeout(){},Date,console});vm.runInContext(code,ctx);return script=>vm.runInContext(script,ctx);}
const run=harness();
assert.equal(run('stations.length'),6);assert.equal(run('allPhrases.length'),24);assert.equal(run('new Set(allPhrases.map(p=>p.id)).size'),24);
assert.equal(run('stations.every(s=>s.quiz.length===4&&s.quiz.every(q=>q[2]>=0&&q[2]<q[1].length))'),true);
for(let n=0;n<6;n++){run(`renderLesson(stations[${n}]);`);for(let i=0;i<4;i++)run(`quiz.index=${i};quiz.answered=false;answerQuiz(currentStation.quiz[${i}][2]);`);assert.equal(run('quiz.correct'),4);run('finishQuiz()');}
assert.equal(run('state.stamps.length'),6);assert.equal(run('points()'),300);run('finishQuiz()');assert.equal(run('points()'),300);
run('state=fresh();renderLesson(stations[0]);quiz.correct=2;finishQuiz()');assert.equal(run('state.stamps.length'),0);
run('quiz={index:0,correct:0,answered:false,finished:false};answerQuiz(0);answerQuiz(0)');assert.equal(run('quiz.correct'),1);
run('builder=[1,0];checkBuilder()');assert.equal(run('state.built.length'),0);run('builder=[0,1];checkBuilder();checkBuilder()');assert.equal(run('points()'),10);
run("toggleSave('hello-0')");assert.equal(run('state.saved.length'),1);run("toggleSave('hello-0');toggleSave('invalid')");assert.equal(run('state.saved.length'),0);
assert.equal(run("String.fromCharCode(0xAC00+11*588)"),'아');assert.equal(run("String.fromCharCode(0xAC00+8*28)"),'고');
const bad=harness('{broken');assert.equal(bad('state.stamps.length'),0);assert.equal(bad('storageOK'),false);
const polluted=harness(JSON.stringify({stamps:['hello','hello','invalid'],saved:['<script>','hello-0']}));assert.equal(polluted('state.stamps.length'),1);assert.equal(polluted('state.saved.length'),1);
console.log('PASS: 6 neighbourhoods; 24 phrases; quiz scoring, pass threshold, repeat protection, sentence validation, save toggles, Hangul composition and malformed-storage recovery.');
