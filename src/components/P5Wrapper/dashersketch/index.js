export default function(s) {
  s.props = {};
  s.onSetAppState = () => {};

  s.state = {
    width: window.innerWidth,
    height: (window.innerHeight * 3) / 4,
    current: {
      x: window.innerWidth / 2,
      y: 50
    },
    p1: {
      x: window.innerWidth / 2,
      y: 50
    },
    p2: {
      x: window.innerWidth / 5,
      y: (window.innerHeight * 3) / 4 - 50
    },
    p3: {
      x: (window.innerWidth * 4) / 5,
      y: (window.innerHeight * 3) / 4 - 50
    }
  };

  s.mouseClicked = () => {
    if (s.mouseY < s.state.height) {
      s.state.p1 = s.state.p2;
      s.state.p2 = s.state.p3;
      s.state.p3 = {
        x: s.mouseX,
        y: s.mouseY
      };
    }
    s.resetSketch();
  };

  s.checkForReset = () => {
    if (s.props.isReseting) {
      s.resetSketch();
      s.resetDone();
    }
  };

  s.setup = function() {
    s.resetSketch();
  };

  s.resetSketch = () => {
    s.createCanvas(window.innerWidth, (window.innerHeight * 3) / 4);

    //setup
    s.background(0);
    s.stroke(255, 221, 89);
    s.fill(255, 221, 89);

    s.circle(s.state.p1.x, s.state.p1.y, 3);
    s.circle(s.state.p2.x, s.state.p2.y, 3);
    s.circle(s.state.p3.x, s.state.p3.y, 3);
    s.state.current = s.state.p1;
  };

  s.draw = function() {
    if (s.props.isPlaying) {
      let current = s.state.current;
      s.point(current.x, current.y);
      let r = s.random(3);
      let newPoint = {
        x: current.x,
        y: current.y
      };
      if (r < 1) {
        newPoint.x = (newPoint.x + s.state.p1.x) / 2;
        newPoint.y = (newPoint.y + s.state.p1.y) / 2;
      }
      if (r >= 1 && r < 2) {
        newPoint.x = (newPoint.x + s.state.p2.x) / 2;
        newPoint.y = (newPoint.y + s.state.p2.y) / 2;
      }
      if (r >= 2 && r < 3) {
        newPoint.x = (newPoint.x + s.state.p3.x) / 2;
        newPoint.y = (newPoint.y + s.state.p3.y) / 2;
      }
      s.state.current = { ...newPoint };
    }
    s.checkForReset();
  };
}
