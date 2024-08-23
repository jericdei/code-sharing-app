"use client";

import MonacoEditor, {
  EditorProps as MonacoEditorProps,
} from "@monaco-editor/react";
import { ChangeEventHandler, useEffect, useState } from "react";
import Dropdown from "./dropdown";
import Button from "./button";
import Share from "./vector/share";
import { Code } from "@prisma/client";
import Link from "./vector/link";
import { useRouter } from "next/navigation";
import {
  DEFAULT_CONTENT,
  LANGUAGE_OPTIONS,
  THEME_OPTIONS,
} from "@/lib/constants";

interface EditorProps extends MonacoEditorProps {
  code?: Code;
}

export default function Editor(props: EditorProps) {
  const router = useRouter();

  const [currentUrl, setCurrentUrl] = useState("");

  const [value, setValue] = useState<string>(
    props.code?.value ?? DEFAULT_CONTENT
  );

  const [theme, setTheme] = useState<EditorProps["theme"]>(
    props.theme ?? "light"
  );

  const [language, setLanguage] = useState<string>(
    props.code?.language ?? "html"
  );

  const [codeId, setCodeId] = useState(props.code?.id);
  const [shareButtonDisabled, setShareButtonDisabled] = useState(false);

  useEffect(() => {
    if (process) {
      setCurrentUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    if (props.code?.value) {
      setShareButtonDisabled(props.code.value === value);
    }
  }, [value, props.code?.value]);

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

    const code = await res.json();

    setCodeId(code.id);

    router.push(`/${code.id}`);
  };

  return (
    <div
      className={`w-11/12 xl:w-2/3 mx-auto mt-2 rounded-xl py-4 ${
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

        <div className="flex gap-4 items-center">
          {codeId && (
            <button
              className="inline-flex items-center text-sm gap-2 text-neutral-200 font-medium cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(`${currentUrl}/${codeId}`)
              }
            >
              <Link /> {`.../${codeId.substring(0, 10)}`}
            </button>
          )}

          <Button
            disabled={shareButtonDisabled}
            leftComponent={<Share />}
            onClick={handleShare}
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
