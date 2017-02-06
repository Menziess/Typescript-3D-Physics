import * as React from 'react';
import * as ReactDOM from 'react-dom';

import SceneController from '../controllers/SceneController';

interface Props {
}
interface State {
  width: number;
  height: number;
}

export default class Scene extends React.Component<Props, State> {
  sceneController: SceneController;
  mounted: boolean;

  // Initializes attributes
  constructor() {
    super();

    this.mounted = false;
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    this.sceneController = new SceneController(this.state.width, this.state.height);
  }

  // When React component is mounted
  private componentDidMount() {
    this.mounted = true;
    window.addEventListener("resize", this.updateDimensions.bind(this));

    const canvas = ReactDOM.findDOMNode(this.refs['canvas']);
    this.sceneController.mount(canvas);
    this.updateDimensions();
    this.loop();
  }

  // When React component is unmounted
  private componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
    this.mounted = false;
  }

  // Main render loop
  private loop = () => {
    this.sceneController.renderFrame();
    const self = this;
    setTimeout(function() {
      requestAnimationFrame(self.loop);
    }, 1000 / 30);
  }

  // When width or height changes
  private updateDimensions() {
    this.mounted && this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    this.sceneController.updateDimensions(this.state.width, this.state.height);
  }

  // React render function
  render() {
    const self = this;
    const canvasStyle = {
      top: 0,
      zIndex: -1,
      position: "fixed",
    }

    return (
      <div>
        <canvas id="canvas" ref="canvas"
          width={this.state.width} height={this.state.height}
          style={canvasStyle} />
      </div>
    )
  }
}