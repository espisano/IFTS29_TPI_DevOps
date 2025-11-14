
import React from 'react';
import './Home.css';
import Highlights from './highlights/Highlights';
import Benefits from './benefits/Benefits';
import AboutUsSnippet from './aboutUsSnippet/AboutUsSnippet';

function Home() {
  return (
    <>
      <Highlights />
      <Benefits />
      <AboutUsSnippet />
    </>
  );
}

export default Home;