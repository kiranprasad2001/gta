import { useTranslation } from "react-i18next";
import { Title1 } from "@fluentui/react-components";

export default function Legacy() {
    const { t } = useTranslation();

    return (
        <div
            className="legacy-page"
            style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                height: "100vh",
                width: "100%",
                overflow: "hidden"
            }}
        >
            <iframe
                src="/legacy-app/index.html"
                title="Legacy App"
                allow="geolocation"
                style={{
                    flexGrow: 1,
                    border: "none",
                    width: "100%",
                    height: "100%"
                }}
            />
        </div>
    );
}
