import Popup from "./components/Popup";
import React, { Fragment, useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import ImageContainer from "./components/ImageContainer";
import Submenu from "./components/Submenu";
import Radius from "./components/Radius";
import Marker from "./components/Marker";
import firebase from "./firebase";

function App() {
  var db = firebase.firestore();
  const [answers, setAnswers] = useState([]);
  useEffect(() => {
    //populate the answers array if it isn't already populated
    if (answers.length === 0) {
      //populate with the false attribute
      let answersDB = db.collection("answers");
      const tempArray = [];
      answersDB.get().then((querySnapshot) =>
        querySnapshot.forEach((doc) =>
          tempArray.push({
            name: doc.id,
            x: doc.get("x"),
            y: doc.get("y"),
            found: false,
          })
        )
      );
      setAnswers(tempArray);
    }
  }, [answers.length, db]);

  const [hideInstructions, setHideInstructions] = useState(true);
  const [submenu, setSubmenu] = useState(false);
  const [radius, setRadius] = useState(false);
  const [gameover, setGameover] = useState(false);

  const radii = 30 / window.devicePixelRatio;
  const coordinates = useRef({
    x: 0,
    y: 0,
  });
  const hideInstructionsToggle = () => {
    hideInstructions ? setHideInstructions(false) : setHideInstructions(true);
  };

  const toggleSubmenu = () => {
    submenu ? setSubmenu(false) : setSubmenu(true);
  };

  const toggleRadius = () => {
    radius ? setRadius(false) : setRadius(true);
  };

  const handleClick = (event) => {
    // these are for showing on screen
    coordinates.current.x = event.pageX;
    coordinates.current.y = event.pageY;
    coordinates.current.xOffset = event.nativeEvent.offsetX;
    coordinates.current.yOffset = event.nativeEvent.offsetY;
    toggleSubmenu();
    toggleRadius();

    // must provide coord
    // must toggle a state that triggers popup
    // https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
  };

  const reportSelection = (event) => {
    //actual calculations for if answer is correct
    const radiiXAllowance = radii / document.getElementById("waldo").width;
    const radiiYAllowance = radii / document.getElementById("waldo").height;
    const Xratio =
      coordinates.current.xOffset / document.getElementById("waldo").width;
    const Yratio =
      coordinates.current.yOffset / document.getElementById("waldo").height;

    const XratioLower = Xratio - radiiXAllowance;
    const XratioUpper = Xratio + radiiXAllowance;
    const YratioLower = Yratio - radiiYAllowance;
    const YratioUpper = Yratio + radiiYAllowance;
    const matchSolution = answers.find(
      (answer) => answer.name === event.target.innerHTML
    );
    console.log(`${event.target.innerHTML} ` + matchSolution.x);
    if (
      XratioLower <= matchSolution.x &&
      matchSolution.x <= XratioUpper &&
      YratioLower <= matchSolution.y &&
      matchSolution.y <= YratioUpper
    ) {
      console.log("correct");
      updateCorrect(event.target.innerHTML);
      console.log(XratioLower + " " + matchSolution.x + " " + XratioUpper);
      console.log(YratioLower + " " + matchSolution.y + " " + YratioUpper);
    } else {
      console.log("incorrect");
    }
  };

  const updateCorrect = (name) => {
    const tempArray = answers.map((answer) =>
      answer.name.toLowerCase() === name.toLowerCase()
        ? { ...answer, found: true }
        : answer
    );
    setAnswers(tempArray);
    checkGameover(tempArray);
  };

  const checkGameover = (answers) => {
    console.log(answers);
    if (answers.every((answer) => answer.found === true)) {
      setGameover(true);
      alert("You won !");
      resetGame();
    }
  };

  const resetGame = () => {
    setAnswers(
      answers.map((answer) =>
        answer.found === true ? { ...answer, found: false } : answer
      )
    );
    setGameover(false);
  };

  // // this is no longer needed, keeping it here for review purposes
  // // this adds the answers into the collection if it does not already exist
  // var answersDB = db.collection("answers");
  // answers.map((answer) =>
  //   answersDB
  //     .doc(answer.name)
  //     .get()
  //     .then((doc) => {
  //       if (doc.exists) {
  //         console.log("Document data:", doc.data());
  //       } else {
  //         answersDB.doc(answer.name).set({
  //           x: answer.x,
  //           y: answer.y,
  //         });
  //       }
  //     })
  // );

  // const solutions = [
  //   {
  //     name: "lion",
  //     x: 0.8444561219127693,
  //     y: 0.27061105722599416,
  //     correct: false,
  //   },
  //   {
  //     name: "astronaut",
  //     x: 0.1282186022070415,
  //     y: 0.09117361784675072,
  //     correct: false,
  //   },
  //   {
  //     name: "hippo",
  //     x: 0.2974251182343668,
  //     y: 0.7070805043646945,
  //     correct: false,
  //   },
  // ];

  const display = (
    <Fragment>
      {radius ? <Radius radii={radii} coordinates={coordinates.current} /> : ""}

      <Navbar gameover={gameover} toggle={hideInstructionsToggle} />
      {!hideInstructions && <Popup toggle={hideInstructionsToggle} />}
      <div onClick={handleClick}>
        <ImageContainer toggleSubmenu={toggleSubmenu} />
        {submenu ? (
          <Submenu
            reportSelection={reportSelection}
            answers={answers.map((answer) =>
              answer.found === false ? answer : ""
            )}
            coordinates={coordinates.current}
          />
        ) : (
          ""
        )}
      </div>
      {answers
        ? answers.map((answer) =>
            answer.found === true ? (
              <Marker radii={radii} xRatio={answer.x} yRatio={answer.y} />
            ) : (
              ""
            )
          )
        : ""}
    </Fragment>
  );

  return display;
}

export default App;
