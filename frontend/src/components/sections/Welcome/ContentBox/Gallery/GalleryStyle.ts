import { ObjectStyles } from "@tipos/component";
import { CSSProperties } from "react";

export const GalleryStyle: ObjectStyles = {
    galleryContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: "1rem",
        textAlign: "center"
    },
    galleryTitle: {
        color: "#fff",
        textAlign: "center",
        minHeight: "100px"
    },
    galleryContImage: {
        position: "relative",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "minmax(300px, 390px)",
    },
    galleryImgText: {
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        alignItems: "center",
        color: "#fff",
        transition: "opacity .2s ease-in-out",
    },
    galleryImg: {
        width: "clamp(250px,15vw,300px)",
        height: "clamp(250px,15vw,300px)"
    },
    galleryIcon: {
        color: "#fff"
    },
    textBox: {
        textAlign: "center"
    }
}

export const imgStyle: CSSProperties = {
    borderRadius: "50%",
    width: "100%",
    height: "100%",
    objectFit: "cover"
}