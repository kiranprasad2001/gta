import { useTranslation } from "react-i18next";
import styles from "./MapLegend.module.css";

/**
 * Floating map legend showing vehicle route types with their color coding.
 */
export default function MapLegend() {
  const { t } = useTranslation();

  const routeTypes = [
    { color: "#0EA5E9", label: "Bus" },
    { color: "#F59E0B", label: "Streetcar" },
    { color: "#10B981", label: "Express" },
    { color: "#DA291C", label: "Blue Night" },
    { color: "#8B5CF6", label: "500-series" },
  ];

  return (
    <div className={styles.legend}>
      <div className={styles.title}>{t("map.legend.title")}</div>
      {routeTypes.map((rt) => (
        <div key={rt.label} className={styles.item}>
          <span className={styles.dot} style={{ backgroundColor: rt.color }} />
          <span className={styles.label}>{rt.label}</span>
        </div>
      ))}
    </div>
  );
}
