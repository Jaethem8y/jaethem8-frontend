import { Navbar, Nav, Container } from "react-bootstrap";

import "./header.scss";
export default function Header() {
  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="sm"
        bg="light"
        variant="light"
      >
        <Container>
          <Navbar.Brand>
            <h1 className="header-brand">Jaethem8</h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="/" className="header-nav">
                Home
              </Nav.Link>
              <Nav.Link href="/course" className="header-nav">
                Courses
              </Nav.Link>
              <Nav.Link href="/study" className="header-nav">
                Study
              </Nav.Link>
              <Nav.Link href="/project" className="header-nav">
                Projects
              </Nav.Link>
              <Nav.Link href="/contact" className="header-nav">
                Contact
              </Nav.Link>
              <Nav.Link href="/" className="header-nav">
                <a
                  href="https://github.com/Jaethem8y?tab=repositories"
                  target="_blank"
                  rel="noreferrer"
                  className="header-a-github text-secondary"
                >
                  Github
                </a>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
