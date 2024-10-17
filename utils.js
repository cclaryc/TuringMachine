function changeLetters() { //functie pt animatie titlu
  const titleElement = document.getElementById('title');
  const titleText = titleElement.innerText.split(''); 
  let index = 0; 
  let previousIndex = -1; 
  
  const interval = setInterval(() => { //delay schimbare fundal  
      if (previousIndex !== -1) {
          titleText[previousIndex] = titleText[previousIndex].replace(/<\/?span[^>]*>/g, ''); //regex
// \/? cauta / (apare zero sau o data)
// [^>] orice caracter care nu e >
}
      
      // iteram prin litere si adaugam fundal
      if (index < titleText.length) {
          const currentLetter = titleText[index];
          titleText[index] = `<span class="highlight">${currentLetter}</span>`;
          titleElement.innerHTML = titleText.join('');
          previousIndex = index; 
          index++;
      } else {
          clearInterval(interval); 
      }
  }, 1000); // 1s
}

changeLetters();

function createDivs(n,text='') { //functie de creeare casute dinamic
    const container = document.getElementById('flex-container');
    
    for (let i = 0; i < n; i++) {
      const newDiv = document.createElement('div');
    if(text=='')
       newDiv.innerText = "ㅤ"; //invisible character less go
    else 
      newDiv.innerText = text[`${i}`];
      container.appendChild(newDiv);
      // console.log('i did iy');
    }
  }

 
  function addLeftDiv() {  // adaugam casuta pe prima poz spre stanga
    const container = document.getElementById('flex-container');
    const leftDiv = document.createElement('div');
    leftDiv.innerText = 'ㅤ';
    container.insertBefore(leftDiv, container.firstChild);
  }

  createDivs(15); //default ca asa a bn
  createDivs(1);
  let ex = document.getElementById('flex-container').children;
  let button = document.getElementById('submit');
    
//functie de remove copii cand dam reset
    function removeAllChildren() {
      const container = document.getElementById('flex-container');
      while (container.firstChild) {
        container.removeChild(container.firstChild); 
      }
    }
    
    function getDivCenterPosition(divElement) {// calculam centrul casutei curente ca sa mutam mana relativ la centru
      const rect = divElement.getBoundingClientRect();
    
      
      const centerX = rect.left + (rect.width / 2);
      const centerY = rect.top + (rect.height / 2);
    
      return { centerX, centerY };
    }

    function getText() {//extragem text din textarea cu NameL Init:
      //nu este nevoie sa mai punem noi Name: Masina mea ci doar Masina mea, etc.
      const textareaValue = document.getElementById('startbox').value;
      const lines = textareaValue.split('\n');
      const name = lines[0].trim();  
      const start = lines[1].trim(); 
      const acceptValues = lines[2].split(',').map(item => item.trim());
      return lines;
  }
    function processInput() {
      const inputText = document.getElementById("textbox").value;
      const lines = inputText.split('\n').map(line => line.trim()); // Split by lines si dam trim whitespace
      const dictionaryMap = new Map(); ;//unde o sa stocam regulile
      for (let i = 0; i < lines.length; i += 2) {
        // prima linie e cheia,a 2 a e value
        const [initial_status, cur_input] = lines[i].split(',');
        const [next_status, modified_input, direction] = lines[i + 1].split(',');
        // mapam ca string ca sa putem sa gasim in dictionar mai usor
        const key = `${initial_status},${cur_input}`;
        dictionaryMap.set(key, [next_status, modified_input, direction]);
      }
    
      dictionaryMap.forEach((value, key) => {
        console.log(`Key: [${key}], Value: [${value}]`);
      });
      return dictionaryMap;
    }
    
    function delay(ms) { //fct de delay
      return new Promise(resolve => setTimeout(resolve, ms));
  }



//ii dam bataie
    button.addEventListener('click',function(){
      removeAllChildren();  // stergem ce garbage era inainte
    let numbers = document.getElementById('inputbox');
      createDivs(numbers.value.length,numbers.value);
      changeLetters();

      const container = document.getElementById('flex-container').children[0];
      const center = getDivCenterPosition(container);
      const mana = document.getElementById('test');
      mana.style.transform = `translateX(${center.centerX -100}px)`; // mutam mana
      console.log(`Center X: ${center.centerX}, Center Y: ${center.centerY}`);
      let code = document.getElementById('textbox');
      console.log(numbers.value);
      console.log(numbers.value.length);
      const dictt = processInput();
      
      //scriu aici ca mi e mai greu sa fac fct sep sa mi returneze 3 chestii neomogene

      const textareaValue = document.getElementById('startbox').value;
      const lines = textareaValue.split('\n');
      const name = lines[0].trim();  // First line is the name
      const start = lines[1].trim(); // Second line is start
      const acceptValues = lines[2].split(',').map(item => item.trim()); // Third line split by commas

      //subtitlu
      let titlu = document.getElementById('subtitle');
      titlu.innerText = name;
      logic(dictt,numbers.value,numbers.value.length,ex,start,acceptValues);

    })

async function logic(dict,input,len,ex,start,acceptValues){ //creierul siteului
  let poz=0; //pozitia in datele de intrare
  let counter = document.getElementById('steps');
  let no_steps = 0; //pasii curenti
  counter.innerText = "Steps: " + no_steps;
  let cur_status = start;
  const mana = document.getElementById('test');
  mana.innerHTML = cur_status;
   while(dict){
    await delay(2000);  // 2s pt pas
    no_steps++;
    counter.innerText = "Steps: " + no_steps;
    let cur_el = input[poz];
    // console.log("CUR EL");
    // console.log(cur_el);
    if(cur_el == 'ㅤ') //verificam daca in input avem caract invizibil si-l traducem in cod ca _
       {
        cur_el = '_';
        // console.log("BAAAAAAAAAAAAAAAAAA");
        console.log(`${cur_status},${cur_el}`);
       }
      
    let cur_rules = dict.get(`${cur_status},${cur_el}`); //gasim configuratia curenta
    // console.log("Curent rules are");
    // console.log(cur_rules);
    // console.log(input.substring(0, poz));
    // console.log(input.substring(poz + 1));
    let schimba = cur_rules[1];
    if(cur_rules[1] == '_')
      schimba = 'ㅤ'
    input = input.substring(0, poz) + schimba + input.substring(poz + 1);
    // console.log(ex[poz]);

    ex[poz].innerText = schimba; //rescriem inputul
    cur_status = cur_rules[0];
    const mana = document.getElementById('test');
    mana.innerHTML = cur_status; 
    if(cur_rules[2] == '<') { //irectia de deplasare
      if(poz == 0) {
        addLeftDiv();
        //input.unshift(0);
        input = 'ㅤ' + input;
       
        // console.log(input);
      }
      else {
        poz --;
        const container = document.getElementById('flex-container').children[poz];
      const center = getDivCenterPosition(container);
      const mana = document.getElementById('test');
      mana.style.transform = `translateX(${center.centerX -100}px)`; // mutam mana
      } 
    }
    else if(cur_rules[2] == '>')
    {
      console.log('DREAPTA');
      if(poz== len-1)
      {
        console.log('CREEZ');
        createDivs(1);
        input = input + 'ㅤ';
        poz++;
        const container = document.getElementById('flex-container').children[poz];
      const center = getDivCenterPosition(container);
      const mana = document.getElementById('test');
      mana.style.transform = `translateX(${center.centerX -100}px)`;
      }
      else
       {
        poz++;
        const container = document.getElementById('flex-container').children[poz];
      const center = getDivCenterPosition(container);
      const mana = document.getElementById('test');
      mana.style.transform = `translateX(${center.centerX -100}px)`;
        
       }
    }
    let i = 0;
    // console.log(acceptValues.length);
    for(i = 0; i< acceptValues.length; i++) {
      if (cur_status == acceptValues[i]) {
        window.alert(acceptValues[i]);
          break;
      }
    }
    if( i !=  acceptValues.length) {
      break;
    }
   }
}


