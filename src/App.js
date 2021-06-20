import React from "react";
import { ReactComponent as Logo } from "./logo.svg";
import "react-awesome-button/dist/themes/theme-c137.css";
import "antd/dist/antd.dark.css";
import "./App.css";
import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
import { AwesomeButton } from "react-awesome-button";
import { Link } from "react-scroll";
import ContactForm from "./components/ContactForm";

const query = loader("./queries/fetchProjects.graphql");

function App() {
  const { loading, error, data } = useQuery(query);
  let projectsMock = [];
  for (let i = 0; i < 6; i++) {
    projectsMock.push(
      <div className="Project-cell" key={i}>
        <div>Loading...</div>
      </div>
    );
  }
  return (
    <div className="App">
      <header className="App-header">
        <Logo className="Author-pic" />
        <div className="Author-name">Arnor Nolen</div>
        <div className="Author-desc">software engineer from Finland</div>
        <div className="Author-project-link">
          <div>
            <Link
              to="my-projects"
              spy={true}
              smooth="easeInOutCubic"
              duration={500}
            >
              <AwesomeButton type="primary" size="large">
                Go to my projects
              </AwesomeButton>
            </Link>
          </div>
          <div>
            <Link
              to="contact-me"
              spy={true}
              smooth="easeInOutCubic"
              duration={500}
            >
              <AwesomeButton type="secondary" size="large">
                Contact me
              </AwesomeButton>
            </Link>
          </div>
        </div>
      </header>
      <section className="Projects" id="my-projects">
        <div className="title">My projects</div>
        <div className="Projects-grid">
          {loading || error
            ? projectsMock
            : data.githubInfo.pinnedItems.nodes.map((x, i) => (
                <div className="Project-cell" key={i}>
                  <div className="Project-name">
                    <a href={x.url}>{x.name}</a>
                  </div>
                  <div className="Project-desc">{x.description}</div>
                  <div
                    className="Project-language"
                    style={{ color: x.primaryLanguage.color }}
                  >
                    Written in {x.primaryLanguage.name}
                  </div>
                </div>
              ))}
        </div>
      </section>
      <section className="Contact" id="contact-me">
        <div className="title">Contact me</div>
        <div className="Contact-desc">
          {/* <div
            style={{
              margin: "40px 0px",
              textAlign: "center",
            }}
          >
            If you're interested in my work, you can contact me using the form
            below.
          </div> */}
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

export default App;
