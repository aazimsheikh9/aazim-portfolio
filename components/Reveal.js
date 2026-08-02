import { Fragment } from "react";

// Splits a string into per-word spans at render time so ScrollFX can drive the
// blur reveal. Deliberately a server component: the words ship in the HTML, so
// crawlers and no-JS readers get the full sentence, and there is no post-
// hydration DOM mutation to go wrong.
//
// The separators are plain text nodes, not spans. An earlier version wrapped
// each space in its own `white-space: pre` span, which meant a space could land
// at the start of a wrapped line and render as a visible indent — every
// multi-line heading came out with a ragged left edge. Real spaces collapse at
// a line break the way they should.
export default function Reveal({ as: Tag = "p", className, children }) {
  const words = String(children).trim().split(/\s+/);

  return (
    <Tag className={className} data-reveal>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="w">{word}</span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
