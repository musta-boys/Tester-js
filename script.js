// tout nos questionnaire dans une const et le reponse possible
const questions = [
  {
    question: "Que fait console.log('Hello World') en JavaScript ?",
    answers: [
      "A. Affiche 'Hello World' dans la console",
      "B. Crée une alerte à l’écran",
      "C. Écrit dans un fichier texte",
      "D. Ferme la console",
    ],
    correct: 0,
  },
  {
    question:
      "Quelle est la bonne façon de déclarer une variable en JavaScript moderne ?",
    answers: [
      "A. var x = 5;",
      "B. let x = 5;",
      "C. const x = 5;",
      "D. Toutes les réponses précédentes sont correctes",
    ],
    correct: 3,
  },
  {
    question: "Quelle est la sortie du code : console.log(2 + '2') ?",
    answers: ["A. 4", "B. '22'", "C. Erreur", "D. undefined"],
    correct: 2,
  },
  {
    question: "Que signifie '===' en JavaScript ?",
    answers: [
      "A. Compare uniquement les valeurs",
      "B. Compare les valeurs et les types",
      "C. Compare uniquement les types",
      "D. Affecte une valeur",
    ],
    correct: 1,
  },
  {
    question:
      "Quelle méthode permet d’ajouter un élément à la fin d’un tableau ?",
    answers: ["A. add()", "B. push()", "C. append()", "D. insert()"],
    correct: 1,
  },
  {
    question: "Quelle est la sortie de typeof null ?",
    answers: ["A. 'null'", "B. 'undefined'", "C. 'object'", "D. 'number'"],
    correct: 2,
  },
  {
    question:
      "Quelle structure est utilisée pour exécuter un bloc de code plusieurs fois ?",
    answers: ["A. if", "B. for", "C. function", "D. import"],
    correct: 1,
  },
  {
    question: "Quelle est la différence entre let et const ?",
    answers: [
      "A. const crée une variable modifiable",
      "B. let crée une variable constante",
      "C. const crée une variable qui ne peut pas être réassignée",
      "D. Elles sont identiques",
    ],
    correct: 2,
  },
  {
    question: "Quelle est la sortie de console.log(3 == '3') ?",
    answers: ["A. true", "B. false", "C. undefined", "D. Erreur"],
    correct: 0,
  },
  {
    question: "Quelle est la sortie de console.log(3 === '3') ?",
    answers: ["A. true", "B. false", "C. undefined", "D. Erreur"],
    correct: 1,
  },
  {
    question: "Quelle méthode affiche une alerte dans le navigateur ?",
    answers: ["A. console.log()", "B. alert()", "C. print()", "D. message()"],
    correct: 1,
  },
  {
    question: "Que renvoie la fonction typeof [1, 2, 3] ?",
    answers: ["A. 'array'", "B. 'object'", "C. 'list'", "D. 'number'"],
    correct: 1,
  },
  {
    question:
      "Comment écrire une fonction fléchée (arrow function) en JavaScript ?",
    answers: [
      "A. function =() => {}",
      "B. () => {}",
      "C. => function() {}",
      "D. arrow() {}",
    ],
    correct: 0,
  },
  {
    question: "Quelle est la valeur de x après : let x = 10; x += 5; ?",
    answers: ["A. 5", "B. 10", "C. 15", "D. 20"],
    correct: 2,
  },
  {
    question: "Quelle méthode permet de convertir une chaîne en entier ?",
    answers: ["A. parseInt()", "B. toInt()", "C. stringToNumber()", "D. int()"],
    correct: 1,
  },
];
// creation de variable
let listeQuestion = 0;
let tempsRestant = 10;
let identifiant;
let score = 0;

//recuperations des id dans HTML
const chrono = document.getElementById("chrono");
const questionE = document.getElementById("question");
const mustaboys = document.getElementById("answers");
const lulu = document.getElementById("result");
const scoreE = document.getElementById("score");
const compteurE = document.getElementById("compteur");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

//declaration de quiz donc ce sui vas lance le quiz
function lanceQuiz() {
  score = 0; //remetre le score a zero
  listeQuestion = 0; //remetre le question a zero
  affiQuestion(); //affiche la premier question
  compteRebours(); //commence le chrono
}

// voila
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");

  // Animate Links
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });
});

// Close mobile menu when clicking a link
links.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
    links.forEach((link) => {
      link.style.animation = "";
    });
  });
});
//  voila

// pour le changement de question en respectent le temps
function affiQuestion() {
  const q = questions[listeQuestion];
  questionE.textContent = q.question; //chargement de questionnaire
  mustaboys.innerHTML = ""; //chargement de option ou choix
  lulu.textContent = ""; //chargement de questionnaire
  scoreE.textContent = ""; //chargement de questionnaire
  tempsRestant = 10; //pour le chrono qui doit
  chrono.textContent = tempsRestant; //pour le lancer de chrono propremendite

  // le compteur doit faire + 1 chaque fois que la question change
  compteurE.textContent = listeQuestion + 1;

  // parcourire et crée un element button et lui attribue un evene
  q.answers.forEach((ans, index) => {
    //pour parcourire les reponse possible
    const btn = document.createElement("button"); //pour la creation d'un button donc lz creation d'un element
    btn.textContent = ans; //mettre le reponse de possible dans le bouton
    btn.onclick = () => verifReponse(index, btn); // pour placer la logique de quand on clique sur l'un de reponse possible
    mustaboys.appendChild(btn); //pour ajouter le bouton dans le compteur
  });
}
// fonction pour ce qui doit ce passe quand ont click sur une bnn ou mov  reponse
function verifReponse(index, btn) {
  const q = questions[listeQuestion];
  if (index === q.correct) {
    btn.classList.add("correct");
    btn.classList.add("red");
    lulu.textContent = "Bravo courage!"; // ici oont verifie si la bnn ou si ce la mouvaise reponse qui a etait clique
    score++;
    nouveQuestion();
  } else {
    btn.classList.add("wrong");
    lulu.textContent = "Essaie encore ";
  }
}

// fonction pour la gestion des temps
function compteRebours() {
  clearInterval(identifiant);
  identifiant = setInterval(() => {
    tempsRestant--;
    chrono.textContent = tempsRestant;
    if (tempsRestant <= 0) {
      clearInterval(identifiant);
      nouveQuestion();
    }
  }, 1900);
}

// fonction pour la gestion des questions
function nouveQuestion() {
  clearInterval(identifiant);
  setTimeout(() => {
    listeQuestion++;
    if (listeQuestion < questions.length) {
      //juste pour verifie si il reste de question
      affiQuestion(); // afficher la questiion suivante
      compteRebours(); //recommmencer le chrono quans ont passe a une autre question
    } else {
      pageFinal(); // pour la fin et l'affichager du score final
    }
  }, 1200);
}

function pageFinal() {
  //pour affichager des l'ecran final
  clearInterval(identifiant);
  questionE.textContent = "Fin du quiz";
  mustaboys.innerHTML = "";
  chrono.textContent = "0";
  lulu.textContent = "Ton score final est :";
  scoreE.textContent = `${score} / ${questions.length}`;

  const restartBtn = document.createElement("button");
  restartBtn.id = "restart";
  restartBtn.textContent = "Rejouer encore une fois";
  restartBtn.onclick = lanceQuiz;
  mustaboys.appendChild(restartBtn);
}

// pour relancer le quiz apres auto
lanceQuiz();
