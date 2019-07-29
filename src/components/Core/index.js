import React, { Component } from "react";
import P5Wrapper from "../P5Wrapper";
import predictionEngine from "../../utils/predictionEngine";

let alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "_"
];

export default class Core extends Component {
  state = {
    //x and y define our mid point's location with respect to the line of streaming text.
    x: 0.03,
    y: 0.5,
    text: "maa"
    //Stores the result of predictions sent back by the prediction engine
    //predictions: []
  };

  setXY = (x, y) => {
    this.setState({ x: x, y: y });
  };

  //Returns all the visual data in terms of x, y and all the boxes required to be made.
  //Since, boxes are all squares, we just need to send the start point, and end point of boxes on the data line
  getData = () => {
    //Take the last five characters of the state.text
    let substring = "";
    if (this.state.text.length <= 5) {
      substring = this.state.text;
    } else {
      substring = this.state.text.substr(this.state.text.length - 5);
    }
    //Get the predictions of probabilities either from the array, or if not available there, from the prediction engine
    // { character: "a", start: 0, end: 0.01 },
    // { character: "b", start: 0.01, end: "0.1" }

    let data = [];
    let startPoint = 0;
    let endPoint = 1;
    for (let i = 0; i < substring.length; i++) {
      let range = endPoint - startPoint;
      let character = substring.charAt(i);
      let context = this.state.text.substr(this.state.text.length - 5 + i);
      let probabilities = predictionEngine(context, alphabet);
      data = data.concat(
        this.mapProbabilitiesToLocation(probabilities, startPoint, endPoint)
      );
      //get new startPoint, endPoint for the next character. These points are just the
      let counter = 0;
      do {
        startPoint += probabilities[counter] * range;
        counter++;
      } while (character !== alphabet[counter] && counter < alphabet.length);
      if (counter < alphabet.length - 1) {
        endPoint = startPoint + probabilities[counter] * range;
      }
    }
    if (substring.length === 0) {
      let probabilities = predictionEngine("", alphabet);
      data = data.concat(this.mapProbabilitiesToLocation(probabilities, 0, 1));
    }

    return { x: this.state.x, y: this.state.y, data: data };
  };

  mapProbabilitiesToLocation(probabilities, startPoint, endPoint) {
    let currentPos = startPoint;
    let data = [];
    for (let i = 0; i < alphabet.length; i++) {
      let length = probabilities[i] * (endPoint - startPoint);
      data.push({
        character: alphabet[i],
        start: currentPos,
        end: currentPos + length
      });
      currentPos += length;
    }
    return data;
  }

  render() {
    return (
      <>
        <P5Wrapper
          p5Props={{}}
          onSetAppState={() => {}}
          getData={this.getData}
          setXY={this.setXY}
        />
      </>
    );
  }
}
