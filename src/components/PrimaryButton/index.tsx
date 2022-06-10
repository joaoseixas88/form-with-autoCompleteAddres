import styles from "./styles.module.scss";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type: "button" | "reset" | "submit";
}

export function PrimaryButton({ label, onClick, type }: ButtonProps) {
  return (
    <div onClick={onClick && onClick}  className={styles.container} >
      <button type={type}  className={styles.button} >{label}</button>
    </div>
  );
}
