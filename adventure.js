'use strict';
// Optional, self-contained adventure add-on. No remote resources, analytics, purchases or sound.
(()=>{
 const words={
  en:{title:'🌈 Animated Adventure',desc:'Meet a friendly explorer and hatch a little pet!',open:'Start Adventure',back:'← Home',jump:'⬆️ Jump',walk:'➡️ Walk',wave:'👋 Wave',hatch:'🥚 Hatch Egg',calm:'Calm mode',pet:'Your pet',hello:'Hello, little explorer!',jumped:'Great jump!',walked:'A lovely little walk!',waved:'Hello, friend!',hatched:'Meet your new pet! 🐣',already:'Your pet is ready to play!',reduced:'Gentle movement is on.'},
  hi:{title:'🌈 एनिमेटेड रोमांच',desc:'प्यारे दोस्त से मिलो और अंडे से पालतू जानवर निकालो!',open:'रोमांच शुरू करें',back:'← वापस',jump:'⬆️ कूदो',walk:'➡️ चलो',wave:'👋 हाथ हिलाओ',hatch:'🥚 अंडा खोलो',calm:'शांत मोड',pet:'आपका दोस्त',hello:'नमस्ते, नन्हे दोस्त!',jumped:'बहुत अच्छी छलांग!',walked:'अच्छी सैर!',waved:'नमस्ते, दोस्त!',hatched:'अपने नए दोस्त से मिलो! 🐣',already:'आपका दोस्त खेलने के लिए तैयार है!',reduced:'धीमी गति चालू है।'},
  gu:{title:'🌈 એનિમેટેડ સાહસ',desc:'નાના મિત્રને મળો અને ઈંડામાંથી પાળતુ પ્રાણી મેળવો!',open:'સાહસ શરૂ કરો',back:'← પાછા',jump:'⬆️ કૂદો',walk:'➡️ ચાલો',wave:'👋 હાથ હલાવો',hatch:'🥚 ઈંડું ખોલો',calm:'શાંત મોડ',pet:'તમારું મિત્ર',hello:'નમસ્તે, નાના મિત્ર!',jumped:'સરસ કૂદકો!',walked:'સરસ ચાલ્યા!',waved:'નમસ્તે, મિત્ર!',hatched:'તમારા નવા મિત્રને મળો! 🐣',already:'તમારું મિત્ર રમવા તૈયાર છે!',reduced:'ધીમી ગતિ ચાલુ છે.'}
 };
 const $a=id=>document.getElementById(id);
 const state={pet:false,calm:false,x:36};
 try{state.pet=localStorage.getItem('lgk-adventure-pet')==='yes';state.calm=localStorage.getItem('lgk-adventure-calm')==='yes'}catch(_e){}
 const t=()=>words[(typeof lang!=='undefined'&&words[lang])?lang:'en'];
 const entry=document.createElement('div');entry.className='adventure-entry';entry.id='adventureEntry';entry.innerHTML='<h2 id="adventureEntryTitle"></h2><p id="adventureEntryDesc"></p><button class="primary" id="adventureOpen"></button>';
 const homeEl=$a('home');homeEl.append(entry);
 const section=document.createElement('section');section.id='adventure';section.className='hide';
 section.innerHTML=`<div class="actions"><button class="secondary" id="adventureBack"></button></div><div class="adventure-panel"><h2 id="adventureTitle"></h2><div class="adventure-scene" id="adventureScene" role="img" aria-label="Friendly explorer in a sunny garden"><div class="adventure-sun"></div><div class="adventure-cloud" aria-hidden="true">☁️</div><div class="adventure-hill"></div><div class="adventure-hill two"></div><div class="adventure-flower a" aria-hidden="true">🌻</div><div class="adventure-flower b" aria-hidden="true">🌷</div><div class="adventure-actor" id="adventureActor" aria-hidden="true">🧒</div><div class="adventure-egg" id="adventureEgg" aria-hidden="true">🥚</div><div class="adventure-pet hide" id="adventurePet" aria-hidden="true">🐉</div></div><p class="adventure-status" id="adventureStatus" role="status" aria-live="polite"></p><div class="adventure-controls"><button id="adventureJump"></button><button id="adventureWalk"></button><button id="adventureWave"></button><button id="adventureHatch"></button></div><div class="adventure-options"><label><input type="checkbox" id="adventureCalm"><span id="adventureCalmLabel"></span></label></div></div>`;
 homeEl.after(section);
 function translate(){const w=t();[['adventureEntryTitle','title'],['adventureEntryDesc','desc'],['adventureOpen','open'],['adventureBack','back'],['adventureTitle','title'],['adventureJump','jump'],['adventureWalk','walk'],['adventureWave','wave'],['adventureHatch','hatch'],['adventureCalmLabel','calm']].forEach(([id,key])=>$a(id).textContent=w[key]);$a('adventureHatch').disabled=state.pet;$a('adventureHatch').style.opacity=state.pet?'.65':'1'}
 function setPet(){ $a('adventureEgg').classList.toggle('hide',state.pet);$a('adventurePet').classList.toggle('hide',!state.pet);translate() }
 function setCalm(){ $a('adventureScene').classList.toggle('lgk-calm',state.calm);$a('adventureCalm').checked=state.calm }
 function message(key){$a('adventureStatus').textContent=t()[key]}
 function animate(id,cls){const e=$a(id);e.classList.remove(cls);void e.offsetWidth;if(!state.calm&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)e.classList.add(cls)}
 function open(){if(typeof closeFun==='function')closeFun();$a('game').classList.add('hide');homeEl.classList.add('hide');section.classList.remove('hide');translate();setPet();setCalm();message('hello');}
 function close(){section.classList.add('hide');if(typeof home==='function')home();else homeEl.classList.remove('hide')}
 $a('adventureOpen').addEventListener('click',open);$a('adventureBack').addEventListener('click',close);
 $a('adventureJump').addEventListener('click',()=>{animate('adventureActor','lgk-jump');message('jumped')});
 $a('adventureWalk').addEventListener('click',()=>{state.x=state.x===36?47:36;$a('adventureActor').style.left=state.x+'%';message('walked')});
 $a('adventureWave').addEventListener('click',()=>{ $a('adventureActor').textContent='🙋';message('waved');});
 $a('adventureHatch').addEventListener('click',()=>{if(state.pet){message('already');return}state.pet=true;try{localStorage.setItem('lgk-adventure-pet','yes')}catch(_e){};setPet();animate('adventurePet','lgk-hop');message('hatched')});
 $a('adventureCalm').addEventListener('change',e=>{state.calm=e.target.checked;setCalm();try{localStorage.setItem('lgk-adventure-calm',state.calm?'yes':'no')}catch(_e){};if(state.calm)message('reduced')});
 document.querySelectorAll('[data-lang]').forEach(b=>b.addEventListener('click',()=>{section.classList.add('hide');translate()}));
 translate();setPet();setCalm();
})();
