import { FC, PropsWithChildren } from "react";

// Custom Type for a React functional component with props AND CHILDREN
export type ReactCustomFunctionalComponent<P = {}> = FC<PropsWithChildren<P>>;
