import { DocumentIcon, XMarkIcon } from "@heroicons/react/24/solid";
import classnames from "classnames";
import { useEffect, useState } from "react";

interface Props {
  setFile: (file: File | undefined) => void;
}

export const FileSelect = ({ setFile }: Props) => {
  const [fileSelected, setFileSelected] = useState<Boolean>(false);

  useEffect(() => {
    const file = document.querySelector("#file");
    if (!file) return;
    file.addEventListener("change", (e) => {
      setFileSelected(true);
      // @ts-ignore
      const [file] = e?.target?.files;
      const { name: fileName, size } = file;
      const fileSize = (size / 1000).toFixed(2); // Convert size in bytes to kilo bytes
      const fileNameEl = document.querySelector(".file-name");
      const fileSizeEl = document.querySelector(".file-size");
      if (!fileNameEl || !fileSizeEl) return;
      fileNameEl.innerHTML = fileName;
      fileSizeEl.innerHTML = fileSize;
    });
  }, []);

  const clearFile = () => {
    setFileSelected(false);
    setFile(undefined);
    const file = document.querySelector("#file");
    if (!file) return;
    // @ts-ignore
    file.value = "";
  };

  return (
    <form>
      <div>
        <input
          type="file"
          id="file"
          className="absolute opacity-0 h-[0.1px] w-[0.1px]"
          onChange={(e) =>
            setFile(e.target.files?.[0] ? e.target.files[0] : undefined)
          }
        />
        <label
          className={classnames([
            "p-4 rounded-xl cursor-pointer border border-stone-400 hover:bg-stone-400 hover:text-stone-800 uppercase",
            !!fileSelected && "hidden",
          ])}
          htmlFor="file"
        >
          Select file
        </label>
        {fileSelected && (
          <div className="flex flex-col items-center justify-center relative">
            <button onClick={clearFile}>
              <XMarkIcon className="h-6 w-6 text-stone-300 mb-4 absolute top-0 -right-8 bg-red-500 hover:bg-red-600 rounded-full cursor-pointer" />
            </button>
            <DocumentIcon className="h-32 w-32 text-stone-300 mb-4" />
            <div className="text-xs">
              <div>
                <span className="mr-2 font-bold">Selected file:</span>
                <span className="file-name"></span>
              </div>
              <div>
                <span className="mr-2 font-bold">File size:</span>
                <span className="file-size"></span>KBs
              </div>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};
