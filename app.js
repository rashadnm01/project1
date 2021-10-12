//ajax call
$.ajax(
  "https://cdn.contentful.com/spaces/14jxgshhm124/environments/master/entries?access_token=FR8vy361JIKHHJ_RSs5_dxmDQLKcsJKNsG1bXBv-AiI&content_type=triviaQ"
).then((data) => {
  /*
  /////////////////////////////
  /////////////////////////////
  **********GAME STATE*********
  /////////////////////////////
  /////////////////////////////
  */
  const players = {
    player1: {
      name: "",
      score: 0,
    },
    player2: {
      name: "",
      score: 0,
    },
  };

  const questions = [];
  const choices = {
    a: [],
    b: [],
    c: [],
    d: [],
  };
  const answers = [];
  //I need to see the data I'm pulling from
  console.log(data);
  /*
  /////////////////////////////
  /////////////////////////////
  **********FUNCTIONS**********
  /////////////////////////////
  /////////////////////////////
  */
  ///////////////////////////////
  /* QUESTION/ANSWER DATA PULL */
  ///////////////////////////////
  const getData = () => {
    for (let i = 0; i < data.items.length; i++) {
      questions.push(data.items[i].fields.question);
      answers.push(data.items[i].fields.answers);
      choices.a.push(data.items[i].fields.a);
      choices.b.push(data.items[i].fields.b);
      choices.c.push(data.items[i].fields.c);
      choices.d.push(data.items[i].fields.d);
    }
  };

  ///////////////////////////////
  /* QUESTION/ANSWER GENERATOR */
  ///////////////////////////////
  const qaGen = () => {
    //random number generator
    const rng = Math.floor(Math.random() * questions.length);
    //sets question
    $("#q").text(questions[rng]);

    //sets answers
    $("#a").val(choices.a[rng]);
    $("#b").val(choices.b[rng]);
    $("#c").val(choices.c[rng]);
    $("#d").val(choices.d[rng]);
    //removes questions and answers from array after use
    questions.splice(rng, 1);
    choices.a.splice(rng, 1);
    choices.b.splice(rng, 1);
    choices.c.splice(rng, 1);
    choices.d.splice(rng, 1);
  };
  //whats in my arrays?
  getData();
  console.log(questions, answers, choices.a, choices.b, choices.c, choices.d);
  //what about now?
  qaGen();
  console.log(questions, answers, choices.a, choices.b, choices.c, choices.d);
  //now?
  qaGen();
  console.log(questions, answers, choices.a, choices.b, choices.c, choices.d);
});
