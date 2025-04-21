import { ObjectStyles } from "@tipos/component";

export const DetailsStyle: ObjectStyles = {
  rightContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "1rem"
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "white",
    width: "100%",
    textAlign: "center"
  },
  sectionContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: 1,
    gap: 2,
    paddingTop: 1,
    mb: 2,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: "50%",
    padding: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 2,
  },
};
