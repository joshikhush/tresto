import type { ChangeEvent } from "react";

interface HoneypotFieldProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Spam trap for Web3Forms: a real (not `type="hidden"`) input, hidden with
 * CSS so bots that fill every field still populate it while sighted and
 * screen-reader users never encounter it.
 */
export function HoneypotField({ value, onChange }: HoneypotFieldProps) {
  return (
    <input
      type="text"
      name="botcheck"
      value={value}
      onChange={onChange}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        overflow: "hidden",
        clip: "rect(0 0 0 0)",
        clipPath: "inset(50%)",
        whiteSpace: "nowrap",
      }}
    />
  );
}
