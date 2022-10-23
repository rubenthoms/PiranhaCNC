import React from 'react';
import logo from './logo.svg';
import './App.css';
import Editor, {loader} from "@monaco-editor/react";
import * as monaco from "monaco-editor";

loader.config({monaco});

function App() {
  return (
    <div className="App">
      <Editor theme='vs-dark'
          height="100vh" />
    </div>
  );
}

export default App;
