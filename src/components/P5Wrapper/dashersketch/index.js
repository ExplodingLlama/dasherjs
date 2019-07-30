export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.state = {
    width: window.innerWidth,
    height: (window.innerHeight * 3) / 4,
    isMoving: false,
    data: {}
  };

  s.setup = function() {
    s.createCanvas(s.state.width, s.state.height);
    s.background(0);
    s.drawLines();
  };

  s.drawLines = () => {
    s.stroke(0, 255, 0);
    s.fill(0, 255, 0);
    s.line(s.state.width / 2, 0, s.state.width / 2, s.state.height);
    s.line(
      s.state.width / 2 - 50,
      s.state.height / 2,
      s.state.width / 2 + 50,
      s.state.height / 2
    );
    s.line((s.state.width * 3) / 4, 0, (s.state.width * 3) / 4, s.state.height);
  };

  s.drawBoxes = () => {
    s.stroke(0);
    s.fill(255);
    let data = s.getData();
    s.state.data = data;
    // data.x is the center point's distance from the data line w.r.t. the dataline
    // data.y is the center point's distance from the top. 0 to 1
    // data.data is all the square data which we will use to draw the squares.
    for (let square of data.data) {
      let bigL = s.state.width / (4 * data.x);
      let bigY = bigL * data.y;
      let offsetY = s.state.height / 2 - bigY;
      let squareSize =
        ((square.end - square.start) * s.state.width) / (4 * data.x);
      let squareY = (square.start * s.state.width) / (4 * data.x) + offsetY;
      let squareX = (s.state.width * 3) / 4 - squareSize; //because all the squares start on the line
      s.fill(255);
      s.rect(squareX, squareY, squareSize, squareSize);
      s.textSize(32);
      s.fill(0);
      s.text(
        square.character,
        squareX + squareSize / 10,
        squareY + squareSize / 2
      );
    }
  };

  s.mouseClicked = () => {
    // s.setXY(0.03, s.mouseY / s.state.height);
    // s.drawBoxes();
    s.state.isMoving = !s.state.isMoving;
  };

  s.moveAround = () => {
    if (s.state.isMoving) {
      let speedY =
        (Math.sign(s.mouseY - s.state.height / 2) *
          Math.pow(Math.abs(s.mouseY - s.state.height / 2), 1.5)) /
        2 /
        (s.state.height * 100);
      let speedX =
        (-1 *
          (Math.sign(s.mouseX - s.state.width / 2) *
            Math.pow(Math.abs(s.mouseX - s.state.width / 2), 1.5))) /
        (s.state.width * 100);
      let newY = s.state.data.y + speedY * s.state.data.x;
      let newX = s.state.data.x + speedX * s.state.data.x;
      s.setXY(newX, newY, s.state.data);
      s.stroke(255, 0, 0);
      s.line(s.state.width / 2, s.state.height / 2, s.mouseX, s.mouseY);
      // s.textSize(32);
      // s.text("speedX: " + speedX, 100, 100);
      // s.text("speedY: " + speedY, 100, 200);
    }
  };

  s.draw = function() {
    s.background(0);
    s.drawBoxes();
    s.drawLines();
    s.moveAround();
  };
}
