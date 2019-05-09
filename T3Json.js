console.log("probando");
/* VARIABLES GENERALES */
verifyPage();
var membersHouse = dataHouse.results[0].members;
var membersSenate = dataSenate.results[0].members;
// var democrats = 
var republicans = selectData().filter(item => item.party == "R");
var independents = selectData().filter(item => item.party == "I");
var democrats = selectData().filter(item => item.party == "D")
var democratsVotes = parseFloat(sumaVotes(selectData().filter(item => item.party == "D")));
console.log(typeof(democratsVotes));
var republicansVotes = parseFloat(sumaVotes(republicans));
var independentsVotes = parseFloat(sumaVotes(independents));
var diezPorcent = Math.round(selectData().length * 0.10);
var dataSortAttendance = selectData().sort(function (a, b) {
  if (a.missed_votes_pct > b.missed_votes_pct) {
    return 1;
  }
  if (a.missed_votes_pct < b.missed_votes_pct) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
var dataSortLoyalty = selectData().sort(function (a, b) {
  if (a.votes_with_party_pct > b.votes_with_party_pct) {
    return 1;
  }
  if (a.votes_with_party_pct < b.votes_with_party_pct) {
    return -1;
  }
  // a must be equal to b
  return 0;
});
var menoresMisses = menores10(dataSortAttendance);
var mayoresMisses = mayores10(dataSortAttendance);
var mostLoyalty = topMostLoyalty(dataSortLoyalty);
var menosLoyalty = topMenosLoyalty(dataSortLoyalty);

// DATA JSON..... ----------------------

var stadistic = {
  "numberOfDemocrats": 0,
  "numberOfIndependents": 0,
  "numberOfRepublicans": 0,
  "total": 0,
  "democratsVotes": 0,
  "republicansVotes": 0,
  "independentsVotes": 0,
  "total_average": 0,
  "leastAttendance": [],
  "mostAttendance": [],
  "least_loyal": [],
  "most_loyal": [],
};

stadistic.numberOfDemocrats = selectData().filter(item => item.party == "D").length;
stadistic.numberOfRepublicans = selectData().filter(item => item.party == "R").length;
stadistic.numberOfIndependents = selectData().filter(item => item.party == "I").length;
stadistic.total = parseInt(stadistic.numberOfDemocrats + stadistic.numberOfIndependents + stadistic.numberOfRepublicans);
stadistic.democratsVotes = parseFloat(sumaVotes(selectData().filter(item => item.party == "D")));
stadistic.republicansVotes = parseFloat(sumaVotes(republicans));
stadistic.independentsVotes = parseFloat(sumaVotes(independents));
stadistic.total_average = parseFloat(democratsVotes + republicansVotes + independentsVotes).toFixed(2);
stadistic.mostAttendance = menores10(dataSortAttendance);
console.log(stadistic.mostAttendance);
stadistic.leastAttendance = mayores10(dataSortAttendance);
stadistic.least_loyal = topMenosLoyalty(dataSortLoyalty);
stadistic.most_loyal = topMostLoyalty(dataSortLoyalty);

console.log(stadistic.mostAttendance);
 
// democrats.map(element => {element.votes_with_party_pct});

/* COMANDOS PARA PRUEBA */

console.log(stadistic.numberOfDemocrats);
console.log(stadistic.numberOfRepublicans);
console.log(stadistic.numberOfIndependents);
// stadistic.total = parseInt(stadistic.numberOfDemocrats + stadistic.numberOfIndependents + stadistic.numberOfRepublicans);
// stadistic.democratsVotes = parseFloat(sumaVotes(selectData().filter(item => item.party == "D")));
// stadistic.republicansVotes = parseFloat(sumaVotes(republicans));
// stadistic.independentsVotes = parseFloat(sumaVotes(independents));
// stadistic.total_average = parseFloat(democratsVotes + republicansVotes + independentsVotes).toFixed(2);
// stadistic.mostAttendance = mayores10(dataSortAttendance);
// stadistic.leastAttendance = menores10(dataSortAttendance);
// stadistic.least_loyal= topLeastLoyalty(dataSortAttendance);
// stadistic.most_loyal = topMostLoyalty(dataSortAttendance)


/* console.log(selectData());
console.log(democrats);
console.log(democrats.length);
// console.table(table1)
console.log(democratsVotes);
console.log((typeof (democratsVotes)));
console.log(diezPorcent);
// console.log(parseInt(topTen));
// console.log((typeof(topTen)));
console.log(dataSortAttendance);
console.log(independents);
console.log(menores10(dataSortAttendance));


array.reduce((count, ))
 */
/* 
°°°°°°°°°°°°°°°°°°°°°°°°°°°
°  FUNCIONES °
°°°°°°°°°°°°°°°°°°°°°°°°°°°      */

// selecciona la data a usar
function selectData() {

  if (document.getElementById("estadisticaGralSENATE")) {
    return membersSenate;
  } else {
    return membersHouse;
  }
}
// Miembros por partido
function members (array, value){array.filter(item => item.party == value).length
  
}

//   % Voted w/ Party

function sumaVotes(array) {
  let suma = (0);
  for (let i = 0; i < array.length; i++) {
    suma = suma + array[i].votes_with_party_pct;
  }
  return suma / selectData().length;   
};

// Ordenar Sort esta dentro de la variable dataSortAttendance

// top 10 menores

function menores10(data) {
  var menores = [];
  for (var x = 0; x < diezPorcent; x++)
    menores.push(data[x]);
  
    while (menores[menores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
      menores.push(data[x]);
      x++
    } 
  return menores;
};
// top 10 mayores
function mayores10(data) {
  var mayores = [];
  for (var x = data.length -1; x >= data.length - diezPorcent; x--){
    mayores.push(data[x]);}
   
  while (mayores[mayores.length - 1].missed_votes_pct === data[x].missed_votes_pct) {
    mayores.push(data[x]);
    x++
    // console.log(data[x]);
    
  }  
  // if (mayores[mayores.length - 1].missed_votes_pct === data[x + 2].missed_votes_pct) {
    // mayores.push(data[x + 2]);
   
  //  console.log(data[x + 2]);
   
  return mayores;
  
};

//  loyalty
function topMenosLoyalty(data) {
  var menores = [];
  for (var x = 0; x < diezPorcent; x++)
    menores.push(data[x]);
  
    while (menores[menores.length - 1].votes_with_party_pct === data[x].votes_with_party_pct) {
      menores.push(data[x]);
      x++
    } 
  return menores;
}
function topMostLoyalty(data) {
  var mayores = [];
  for (var x = data.length -1; x >= data.length - diezPorcent; x--){
    mayores.push(data[x]);}  
  while (mayores[mayores.length - 1].votes_with_party_pct === data[x].votes_with_party_pct) {
    mayores.push(data[x]);
    x++
    // console.log(data[x]);  
  }  
}

// ZONA DE PRUEBAS------------------

// ¡¡¡¡¡¡¡¡¡¡¡¡¡¡¡FIN ZONA DE PRUEBAS!!!!!!!!!

/* 
°°°°°°°°°°°°°°°°°°°°°°°°°°°
°       TABLAS            °
°°°°°°°°°°°°°°°°°°°°°°°°°°°      */

// tabla1 datos generales
var mytable1 = "<thead > <tr><th> Party </th><th> N° of Reps </th> <th> % Voted w/ Party </th> </thead>";
mytable1 += "<tbody>";
mytable1 += "<tr> <td> Democrats </td> <td>" + stadistic.numberOfDemocrats + "</td> <td>" +democratsVotes.toFixed(2) + " % </td> </tr>";
mytable1 += "<tr> <td> Republicans </td> <td>" + republicans.length + "</td> <td>" + republicansVotes.toFixed(2) + " % </td> </tr>";
if (independents != 0) {
  mytable1 += "<tr> <td> Independents </td> <td>" + independents.length + "</td> <td>" + independentsVotes.toFixed(2) + " % </td> </tr>"
};
// console.log(mytable1);
mytable1 += "<tr> <td> TOTAL </td> <td>" + parseInt(stadistic.numberOfDemocrats + republicans.length + independents.length) + "</td> <td>" + parseFloat(democratsVotes + republicansVotes + independentsVotes).toFixed(2) + " % </td> </tr></tbody>"

// tabla1 print
document.getElementById('table1').innerHTML = mytable1;


// tables TOPS
function tableTopsAttendance(array) {
  var mytable2 = "<thead > <tr><th> Name </th><th> Missed Votes</th> <th> % Missed Votes </th> </thead><tbody>";
  array.forEach(element => {
    mytable2 += "<tr>";
    if (element.middle_name === null) {
      mytable2 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.last_name + '</a></td>';
    } else {
      mytable2 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.middle_name + ' ' + element.last_name + '</a></td>';
    }
    mytable2 += "<td>" + element.missed_votes + "</td>";

    mytable2 += "<td>" + element.missed_votes_pct + "% </td> </tr>";
    
 
  });
  mytable2 += "</tbody>";
  return mytable2;
}

function tableTopsLoyalty(array) {
  var mytable3 = "<thead > <tr><th> Name </th><th> Number Party Votes</th> <th> % Party Votes </th> </thead><tbody>";
  array.forEach(element => {
    mytable3 += "<tr>";
    if (element.middle_name === null) {
      mytable3 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.last_name + '</a></td>';
    } else {
      mytable3 += '<td><a href= "' + element.url + '">' + element.first_name + ' ' + element.middle_name + ' ' + element.last_name + '</a></td>';
    }
    mytable3 += "<td>" + (element.votes_with_party_pct * element.total_votes) / 100 + "</td>";

    mytable3 += "<td>" + element.votes_with_party_pct + "% </td> </tr>";
    
    
  });
  mytable3 += "</tbody>";
  return mytable3;
}

// IMPRIMIR TABLAS
function verifyPage() {
  
if (document.getElementById("estadisticaGralSENATE")) {
// ATTENDANCE table2 LEAST comprometidos print
document.getElementById('table2').innerHTML = tableTopsAttendance(stadistic.leastAttendance);
// ATTENDANCE table3 MOST comprometidos print
  document.getElementById('table3').innerHTML = tableTopsAttendance(stadistic.mostAttendance);
  } else {
// LOYALTY table4 LEAST Lealtad print
document.getElementById('table4').innerHTML = tableTopsLoyalty(stadistic.least_loyal);

// LOYALTY table5 MOST lealtad print
document.getElementById('table5').innerHTML = tableTopsLoyalty(stadistic.most_loyal);
  }
}





/* ME QUEDA PENDIENTE:
1- revisar que pasa que no reconoce la propiedad inner
2- darle formato a la pag, que quede linda! 
3- verificar si anda los datos colocados en stadistic
4- veriricar pq da error el el forEach cuando va a armar la segunda tabla
5- pendiente que al final agregue una funcion de verifify page... chequear si sirve ade algo.
NOTA: testear los datos que arroja*/


