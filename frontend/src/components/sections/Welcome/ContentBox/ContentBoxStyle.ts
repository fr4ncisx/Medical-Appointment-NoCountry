import { ObjectStyles } from "@tipos/component";
import { CSSProperties } from "react";

export const ContentBoxStyle: ObjectStyles = {
    box: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "start",
        backgroundColor: "#198751",
        width: "100%",
        minHeight: "500px",
        flexWrap: "wrap",
    },
};

export const WaveOneStyle: CSSProperties = {
    width: "100%",
    transform: "rotate(180deg)",
    display: "block",
    background: "linear-gradient(transparent 5%,#dadada 10%, #dadada 100%)",
}

export const WaveTwoStyle: CSSProperties = {
    width: "100%",
    backgroundColor: "#f1f1f1",
    display: "block",
    marginBottom: "20rem"
}