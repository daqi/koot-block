import React, { PureComponent } from "react";
import "./index.less";

export default class GroupAvatar extends PureComponent {
  render() {
    const { className = "", users, style } = this.props;
    const _users = users.slice(0, 4);
    return (
      <div
        style={style}
        className={`${className} group-avatar avatar-${_users.length}`}
      >
        {users.map((user, index) => (
          <div className="group-avatar-image">
            <img key={index} src={user.avatar} alt={user.name} />
          </div>
        ))}
      </div>
    );
  }
}
