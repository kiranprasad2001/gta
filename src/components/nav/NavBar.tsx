import { BaseBarComponents } from "./BaseBarComponents.js";
import style from "./NavBar.module.css";

export function NavBar({ width }: { width: number }) {
  return (
    <nav
      className={
        width >= 800
          ? `${style["nav-bar"]} ${style["side-nav"]}`
          : `${style["nav-bar"]} ${style["bottom-nav"]}`
      }
      style={
        width >= 800
          ? {
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
            }
          : undefined
      }
    >
      <BaseBarComponents width={width} />
      {width >= 800 && (
        <div
          style={{
            padding: "24px 16px",
            fontSize: "12px",
            color: "var(--colorNeutralForeground3)",
            marginTop: "auto",
            lineHeight: "1.6",
          }}
        >
          <strong>Credits:</strong>
          <br />
          <a
            href="https://tobus.ca"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--colorBrandForegroundLink)" }}
          >
            tobus.ca
          </a>
          <br />
          <a
            href="https://livebus.ca"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--colorBrandForegroundLink)" }}
          >
            livebus.ca
          </a>
          <br />
          <a
            href="https://ttcmap.ca"
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--colorBrandForegroundLink)" }}
          >
            ttcmap.ca
          </a>
        </div>
      )}
    </nav>
  );
}
