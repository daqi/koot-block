import React, { PureComponent } from "react";
import ReactDOM from "react-dom";

const modalRoot = document.body;

export default class SimpleModal extends PureComponent {
  state = {
    show: this.props.visible || false
  };
  static getDerivedStateFromProps(props, state) {
    if ('visible' in props && state.show !== props.visible) {
      return {
        show: props.visible
      };
    }
    return null;
  }
  el = document.createElement("div");
  componentDidMount() {
    modalRoot.appendChild(this.el);
  }
  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }
  hide = () => {
    this.rootOverflow = modalRoot.style.overflow;
    if (this.rootOverflow !== "hidden") {
      modalRoot.style.overflow = "hidden";
    }
    modalRoot.style.overflow = this.rootOverflow;
    const { onClose } = this.props;
    onClose && onClose();
  };
  render() {
    const { maskClosable = true, children, className } = this.props;
    if (!this.state.show) return null;
    const props = {
      className,
      onClick: maskClosable ? this.hide : undefined,
      style: {
        position: "fixed",
        zIndex: 2000,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.7)",
        overflow: "auto"
      }
    };
    return ReactDOM.createPortal(<div {...props}>{children}</div>, this.el);
  }
}
