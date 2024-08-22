"use client";

import MonacoEditor, {
  EditorProps as MonacoEditorProps,
} from "@monaco-editor/react";
import { ChangeEventHandler, useEffect, useState } from "react";
import Dropdown from "./dropdown";
import Button from "./button";
import Share from "./vector/share";
import { Code } from "@prisma/client";

const DEFAULT_CONTENT = `<html>
<head>
  <title>HTML Sample</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <style type="text/css">
    h1 {
      color: #CCA3A3;
    }
  </style>
  <script type="text/javascript">
    alert("I am a sample... visit devChallengs.io for more projects");
  </script>
</head>
<body>
  <h1>Heading No.1</h1>
  <input disabled type="button" value="Click me" />
</body>
</html>`;

const THEME_OPTIONS = [
  {
    label: "Light",
    value: "light",
  },
  {
    label: "VS Dark",
    value: "vs-dark",
  },
];

const LANGUAGE_OPTIONS = [
  {
    label: "HTML",
    value: "html",
  },
  {
    label: "CSS",
    value: "css",
  },
  {
    label: "JavaScript",
    value: "javascript",
  },
];

interface EditorProps extends MonacoEditorProps {
  code?: Code;
}

export default function Editor(props: EditorProps) {
  const [value, setValue] = useState<string>(
    props.code?.value ?? DEFAULT_CONTENT
  );
  const [theme, setTheme] = useState<EditorProps["theme"]>(
    props.theme ?? "light"
  );
  const [language, setLanguage] = useState<string>(
    props.code?.language ?? "html"
  );

  // useEffect(() => {
  //   setValue(props.code?.value ?? DEFAULT_CONTENT);
  //   setLanguage(props.code?.language ?? "html");
  // }, [props.code]);

  const handleThemeChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    setTheme(event.target.value);
  };

  const handleLanguageChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    setLanguage(event.target.value);
    setValue("");
  };

  const handleShare = async () => {
    if (value.length === 0) {
      alert("You cannot share a blank code!");

      return;
    }

    const res = await fetch("/api/share", {
      method: "POST",
      body: JSON.stringify({ value, language }),
    });

    const json = await res.json();

    console.log(json);
  };

  return (
    <div
      className={`w-2/3 mx-auto mt-2 rounded-xl py-4 ${
        theme === "vs-dark" ? "bg-[#1e1e1e]" : "bg-neutral-100"
      }`}
    >
      <MonacoEditor
        key={language}
        height="35rem"
        theme={theme}
        language={language}
        value={value}
        wrapperProps={{
          className: `p-4 rounded-xl`,
        }}
        onChange={(newValue) => setValue(newValue || "")}
        {...props}
      />

      <div className="px-8 mt-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Dropdown
            name="language"
            options={LANGUAGE_OPTIONS}
            value={language}
            onChange={handleLanguageChange}
          />

          <Dropdown
            name="theme"
            options={THEME_OPTIONS}
            value={theme}
            onChange={handleThemeChange}
          />
        </div>

        <div>
          <Button leftComponent={<Share />} onClick={handleShare}>
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
