import "./admin.scss";

import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="admin-wrapper">
      <div className="admin-content">
        <h3>Admin</h3>
        <br />
        <Link to="/admin/login">Login to Admin</Link>
        <br />
        <h5>Project Links</h5>
        <div className="admin-links">
          <Link to="/admin/projects/edit">
            <p>Edit Project</p>
          </Link>
          <Link to="/admin/projects/add">
            <p>Add a Project</p>
          </Link>
        </div>
        <br />
        <h5>Study Links</h5>
        <div className="admin-links">
          <Link to="/admin/study/edit">
            <p>Edit Study</p>
          </Link>
          <Link to="/admin/study/add">
            <p>Add a Study</p>
          </Link>
        </div>
        <br />
        <h5>Personal Links</h5>
        <div className="admin-links">
          <Link to="/admin/personal/edit">
            <p>Edit Personal</p>
          </Link>
          <Link to="/admin/personal/add">
            <p>Add a Personal</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
