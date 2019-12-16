import React, { PureComponent } from "react";

import { getLeftTop, getWidthHeight } from "./utils";

class ImageClipCover extends PureComponent {
  state = {
    scrolled: false,
    stageRect: null,
    resizing: false,
    moving: false
  };
  stage;
  componentDidMount() {
    this.update();
    document.addEventListener("mouseup", this.handleMouseUp, false);
    window.addEventListener("scroll", this.scrolled, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp, false);
    window.removeEventListener("scroll", this.scrolled, false);
  }
  scrolled = () => {
    if (this.state.scrolled) return;
    this.setState({ scrolled: true });
  };
  update() {
    const stageRect = this.stage.getBoundingClientRect().toJSON();
    this.setState({ stageRect });
  }
  rectRound(rect, o) {
    const { zoom = 1 } = this.props;
    if (o) {
      return {
        left: Math.round(rect.left * zoom),
        top: Math.round(rect.top * zoom),
        width: Math.round(rect.width * zoom),
        height: Math.round(rect.height * zoom)
      };
    }
    return {
      left: Math.round(rect.left / zoom),
      top: Math.round(rect.top / zoom),
      width: Math.round(rect.width / zoom),
      height: Math.round(rect.height / zoom)
    };
  }
  handleMouseUp = () => {
    this.handleMoveEnd();
    this.handleResizeEnd();
  };
  handleMouseLeave = () => {
    if (this.state.moving) {
      this.handleMoveEnd();
    }
  };
  handleMouseEnter = e => {
    this.update();
    this.handleMouseMove(e);
  };
  handleMouseMove = e => {
    const { scrolled, resizing, moving } = this.state;
    if (scrolled) {
      this.update();
    }
    if (resizing) {
      this.handleResize(e);
      return;
    }
    if (moving) {
      this.handleMove(e);
      return;
    }
  };
  handleMove = e => {
    const { moving, stageRect } = this.state;
    if (!moving) return;
    const { rect, x, y } = moving;

    let left = rect.left + e.pageX - x;
    let top = rect.top + e.pageY - y;
    const want = { left, top };

    const leftTop = getLeftTop(want, stageRect, rect);

    left = leftTop.left;
    top = leftTop.top;

    const nextRect = {
      ...rect,
      left,
      top
    };

    const nextResurt = this.rectRound(nextRect);
    this.props.onChange(nextResurt);
  };
  handleMoveStart = e => {
    console.log("MoveStart");
    this.setState({
      moving: {
        rect: this.rectRound(this.props.rect, true),
        x: e.pageX,
        y: e.pageY
      }
    });
  };
  handleMoveEnd = e => {
    if (!this.state.moving) return;
    console.log("MoveEnd");
    this.setState({
      moving: null
    });
    this.update();
  };
  handleResize = e => {
    const { zoom = 1 } = this.props;
    const { resizing, stageRect } = this.state;
    if (!resizing) return;
    const { rect, x, y } = resizing;

    // 期望的宽高
    let width = rect.width + e.pageX - x;
    let height = rect.height + e.pageY - y;
    const want = { width, height };
    const min = { width: 45 * zoom, height: 45 * zoom };

    const widthHeight = getWidthHeight(want, stageRect, rect, min);

    width = widthHeight.width;
    height = widthHeight.height;

    const nextRect = {
      ...rect,
      width,
      height
    };

    const nextResurt = this.rectRound(nextRect);

    this.props.onChange(nextResurt);
  };
  handleResizeStart = e => {
    e.stopPropagation();
    console.log("ResizeStart");
    this.setState({
      resizing: {
        rect: this.rectRound(this.props.rect, true),
        x: e.pageX,
        y: e.pageY
      }
    });
  };
  handleResizeEnd = e => {
    if (!this.state.resizing) return;
    console.log("ResizeEnd");
    this.setState({
      resizing: null
    });
    this.update();
  };
  render() {
    const { resizing, moving } = this.state;
    const { className, rect, resize } = this.props;
    return (
      <div
        ref={el => (this.stage = el)}
        className={`${className}${resizing ? " resizing" : ""}${moving ? " moving" : ""}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseMove={this.handleMouseMove}
        onMouseLeave={this.handleMouseLeave}
        onMouseDown={this.handleMoveStart}
      >
        <div className="hover" style={this.rectRound(rect, true)}>
          <div onMouseDown={this.handleResizeStart} className="resize">
            {resize}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageClipCover;
