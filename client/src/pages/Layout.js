import React from "react";
import Hero from "../components/Hero";
import "../styles/Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout grid">
      <section className="left flex-sm img-wrapper">
        <img
          src="https://images.unsplash.com/photo-1576021182211-9ea8dced3690?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
          alt="fitness"
        />
        <div className="mask flex-col">
          <div className="content-wrapper">
            <h3 className="title">My Calorie Pal</h3>
            <div className="hero-wrapper">
              <div className="cl-left flex-col">
                <Hero />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="right">{children}</section>
    </div>
  );
};

export default Layout;
