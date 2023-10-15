import { FC, PropsWithChildren } from "react";

// Custom Type for a React functional component with props AND CHILDREN
export type RCFC<P = {}> = FC<PropsWithChildren<P>>;
