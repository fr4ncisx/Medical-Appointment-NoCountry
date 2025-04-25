import { ObjectStyles } from "@tipos/component";

export const ResponsiveSideBarStyles: ObjectStyles = {
  sideBar: {
    width: "100%",
    position: "relative",
    height: "fit-content",
  },
  listResponsiveOpen: {
    backgroundColor: "#f1f1f1",
    padding: "10px",
    borderBottom: "1px solid #c1c1c1",
    borderRight: "1px solid #c1c1c1",
    position: "absolute",
    overflow: "hidden",
    transition: "width 0.1s linear",
  },
  listResponsiveClose: {
    padding: "0px",
    border: "none",
    position: "absolute",
    overflow: "hidden",
    transition: "width 0.1s linear",
  }
};
