import Popup from "./components/Popup";
import React, { Fragment, useState, useRef, useEffect } from "react";
import Navbar from "./components/Navbar";
import ImageContainer from "./components/ImageContainer";
import Submenu from "./components/Submenu";
import Radius from "./components/Radius";
import firebase from "./firebase";

function App() {
  var db = firebase.firestore();

  // coordinates is x / zoom level
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

    //check if win condition is met
  }, [db, answers.length]);

  const [hideInstructions, setHideInstructions] = useState(true);
  const [submenu, setSubmenu] = useState(false);
  const [radius, setRadius] = useState(false);

  const radii = 65;
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
    coordinates.current.x = event.pageX;
    coordinates.current.xLowerBound = event.pageX - radii;
    coordinates.current.xUpperBound = event.pageX + radii;
    coordinates.current.y = event.pageY;
    coordinates.current.yLowerBound = event.pageY - radii;
    coordinates.current.yUpperBound = event.pageY + radii;

    toggleSubmenu();
    toggleRadius();

    // must provide coord
    // must toggle a state that triggers popup
    // https://stackoverflow.com/questions/6073505/what-is-the-difference-between-screenx-y-clientx-y-and-pagex-y
  };

  const checkAnswer = () => {
    // if the click radius touches the coord where it is
    // being lower bound [x -radii] <= answer.coord.x <= upper bound [x + radii]
  };

  const solutions = [
    { name: "lion", x: 1609, y: 334, correct: false },
    { name: "astronaut", x: 258, y: 176, correct: false },
    { name: "hippo", x: 595, y: 800, correct: false },
  ];

  const reportSelection = (event) => {
    console.log("selected " + event.target.innerHTML + " as answer");

    // find the corresponding answer in the array, then check its answer

    const tempArray = answers.slice();
    let matchedItem = tempArray.find(
      (item) => item.name.toLowerCase() === event.target.innerHTML.toLowerCase()
    );

    const adjustedX = matchedItem.x / window.devicePixelRatio;
    const adjustedY = matchedItem.y / window.devicePixelRatio;

    if (
      coordinates.current.xLowerBound <= adjustedX &&
      adjustedX <= coordinates.current.xUpperBound &&
      coordinates.current.yLowerBound <= adjustedY &&
      adjustedY <= coordinates.current.yUpperBound
    ) {
      console.log("correct");
      matchedItem = { ...matchedItem, found: true };
    } else {
      console.log(matchedItem.x);
      console.log(matchedItem.y);
      console.log(coordinates.current.xLowerBound);
      console.log(coordinates.current.xUpperBound);
    }

    setAnswers(tempArray);
  };

  // const reportSelection = (event) => {
  //   console.log("selected" + event.innerHTML + "as answer");
  //   let correct = false;
  //   answers.forEach((answer) => {
  //     if (answer.name.toLowerCase() === event.target.innerHTML.toLowerCase()) {
  //       if (
  //         coordinates.current.xLowerBound <= answer.x &&
  //         answer.x <= coordinates.current.xUpperBound &&
  //         coordinates.current.yLowerBound <= answer.y &&
  //         answer.y <= coordinates.current.yUpperBound
  //       ) {
  //         correct = true;
  //       }
  //     }
  //   });

  //   correct ? console.log("correct") : console.log("incorrect");
  // };

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

  const display = (
    <Fragment>
      {radius ? <Radius radii={radii} coordinates={coordinates.current} /> : ""}
      {submenu ? (
        <Submenu
          reportSelection={reportSelection}
          answers={answers}
          coordinates={coordinates.current}
        />
      ) : (
        ""
      )}
      <Navbar toggle={hideInstructionsToggle} />
      {!hideInstructions && <Popup toggle={hideInstructionsToggle} />}
      <div onClick={handleClick}>
        <ImageContainer toggleSubmenu={toggleSubmenu} />
      </div>
    </Fragment>
  );

  return display;
}

export default App;
