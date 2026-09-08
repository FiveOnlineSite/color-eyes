export default function WaveHeadingText({ lines }) {
  const headingLines = Array.isArray(lines) ? lines : [lines];
  let letterIndex = 0;

  return (
    <span className="wavy-heading">
      <span className="sr-only">{headingLines.join(" ")}</span>
      <span aria-hidden="true">
        {headingLines.map((line, lineIndex) => (
          <span className="contents" key={line}>
            {lineIndex > 0 ? <br /> : null}
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
        ))}
      </span>
    </span>
  );
}
