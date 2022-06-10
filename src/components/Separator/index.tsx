import { HTMLProps, ReactNode } from "react";
import styles from "./styles.module.scss";

interface SeparatorProps extends HTMLProps<HTMLDivElement>{
  children: ReactNode;
}

export function Separator({ children, ...rest }: SeparatorProps) {
  return (
    <div className={styles.container} {...rest}>
      {children}
    </div>
  );
}
