import { Fragment } from "react";

export default function WaveHeadingText({ lines }) {
  const hasExplicitLines = Array.isArray(lines);
  const headingLines = hasExplicitLines ? lines : [lines];
  let letterIndex = 0;

  return (
    <span className="wavy-heading">
      <span className="sr-only">{headingLines.join(" ")}</span>
      <span aria-hidden="true">
        {headingLines.map((line, lineIndex) => (
          <Fragment key={line}>
            {lineIndex > 0 ? <br /> : null}
            <span className={hasExplicitLines ? "inline-block whitespace-nowrap" : "contents"}>
              {[...line].map((character, characterIndex) => {
                if (character === " ") return " ";

                const waveIndex = letterIndex;
                letterIndex += 1;

                return (
                  <span
                    className="wavy-heading__letter"
                    key={`${lineIndex}-${characterIndex}`}
                    style={{ "--wave-index": waveIndex }}
                  >
                    {character}
                  </span>
                );
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </span>
  );
}
