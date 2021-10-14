//ajax call
$.ajax(
  "https://cdn.contentful.com/spaces/14jxgshhm124/environments/master/entries?access_token=FR8vy361JIKHHJ_RSs5_dxmDQLKcsJKNsG1bXBv-AiI&content_type=triviaQ"
).then((data) => {
  /*
  /////////////////////////////
  /////////////////////////////
  *************DOM*************
  /////////////////////////////
  /////////////////////////////
  */
  const $game = $("#game");
  $("#a").hide();
  $("#b").hide();
  $("#c").hide();
  $("#d").hide();
  $("#q").text("RULES");
  /*
  /////////////////////////////
  /////////////////////////////
  ***********RULE BOOK*********
  /////////////////////////////
  /////////////////////////////
  */
  const $rules = $("<h2>")
    .attr("id", "rules")
    .text(
      "Two players will take turns answering questions. If a player answers a question wrong, they lose a point. Answer a question correct, get 2 points. Answer 2 in row? Get 3 points. Answer 3 in a row? Get 4! So-fourth-and-so-on. The player with the most points wins! There are NO negative scores."
    );
  const $play = $("<button>").addClass("play").text("Play");
  $game.append($rules, $play);
  /*
  /////////////////////////////
  /////////////////////////////
  **********GAME STATE*********
  /////////////////////////////
  /////////////////////////////
  */
  const game = {
    players: {
      player1: {
        name: "",
        score: 0,
        multiplier: 0,
      },
      player2: {
        name: "",
        score: 0,
        multiplier: 0,
      },
    },
    winner: false,
    turn: true,
    start: () => {
      $rules.remove();
      $play.remove();
      $("#a").show();
      $("#b").show();
      $("#c").show();
      $("#d").show();
      getData();
      qaGen();
    },
    index: 0,
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
      answers.push(data.items[i].fields.answer);
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
    game.index = rng;
    //sets question
    $("#q").text(questions[rng]);

    //sets answers
    $("#a").val(choices.a[rng]);
    $("#b").val(choices.b[rng]);
    $("#c").val(choices.c[rng]);
    $("#d").val(choices.d[rng]);
  };
  ///////////////////////////////
  /*  SCORING AND TURN-TAKING  */
  ///////////////////////////////
  const changeTurn = () => {
    if (game.turn === true) {
      game.turn = false;
    } else {
      game.turn = true;
    }
  };
  const changeScore = (points) => {
    if (game.turn === true) {
      game.players.player1.score += points;
    } else {
      game.players.player2.score += points;
    }
    if (game.players.player1.score < 0) {
      game.players.player1.score = 0;
    }
    if (game.players.player2.score < 0) {
      game.players.player2.score = 0;
    }
  };
  const determinePoints = (target) => {
    const choice = $(target).attr("id");
    if (choice === "a") {
      if (answers[game.index] === choices.a[game.index]) {
        changeScore(1);
      } else {
        changeScore(-1);
      }
    } else if (choice === "b") {
      if (answers[game.index] === choices.b[game.index]) {
        changeScore(1);
      } else {
        changeScore(-1);
      }
    } else if (choice === "c") {
      if (answers[game.index] === choices.c[game.index]) {
        changeScore(1);
      } else {
        changeScore(-1);
      }
    } else if (choice === "d") {
      if (answers[game.index] === choices.d[game.index]) {
        changeScore(1);
      } else {
        changeScore(-1);
      }
    }
  };
  const updateScore = () => {
    if (game.turn === true) {
      if (game.players.player1.score < 10) {
        $("#p1").text("0" + game.players.player1.score);
      } else {
        $("#p1").text(game.players.player1.score);
      }
    } else {
      if (game.players.player2.score < 10) {
        $("#p2").text("0" + game.players.player2.score);
      } else {
        $("#p2").text(game.players.player2.score);
      }
    }
  };
  // //whats in my arrays?
  // getData();
  // console.log(questions, answers, choices.a, choices.b, choices.c, choices.d);
  // //what about now?
  // qaGen();
  // console.log(questions, answers, choices.a, choices.b, choices.c, choices.d);
  // //now?
  // qaGen();
  // console.log(questions, answers, choices.a, choices.b, choices.c, choices.d);

  ///////////////////////////////
  /*    MOUSE CURSOR CHANGER    */
  ///////////////////////////////
  const cursor = (e) => {
    mouseCursor.css("top", e.pageY + "px");
    mouseCursor.css("left", e.pageX + "px");
  };
  const mouseCursor = $("#cursor");
  $(window).on("mousemove", cursor);
  ///////////////////////////////
  /*    MOUSE CURSOR EVENTS    */
  ///////////////////////////////
  $("input").on("mouseover", (event) => {
    const target = $(event.target);
    target.addClass("hover");
  });
  $("input").on("mouseout", (event) => {
    const target = $(event.target);
    target.removeClass("hover");
  });
  $("button").on("mouseover", (event) => {
    const target = $(event.target);
    target.addClass("hover");
  });
  $("button").on("mouseout", (event) => {
    const target = $(event.target);
    target.removeClass("hover");
  });

  /*
  /////////////////////////////
  /////////////////////////////
  *****GAME FUNCTIONALITY******
  /////////////////////////////
  /////////////////////////////
  */
  $play.on("click", game.start);
  $("input").on("click", (event) => {
    setTimeout(() => {
      determinePoints(event.target);
      updateScore();
      changeTurn();
      qaGen();
    }, 2000);
  });
});
