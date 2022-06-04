import "./admin.scss";

import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="admin-wrapper">
      <div className="admin-content">
        <h1>Admin</h1>
        <br />
        <Link to="/admin/study">
          <h3>Study</h3>
        </Link>
        <Link to="/admin/projects">
          <h3>Projects</h3>
        </Link>
      </div>
    </div>
  );
}
