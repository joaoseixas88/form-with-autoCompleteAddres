import { InputHTMLAttributes } from "react";
import { Control, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  mask?: any;
  control: Control;
  fieldName: string;
  name: string;
  error?: string;
  required?: boolean;
}

export function Input({
  mask,
  control,
  error,
  fieldName,
  name,
  required,
  ...rest
}: InputProps) {
  
  return (
    <>
      <Controller
        name={fieldName}
        render={({ field: { onChange, value, onBlur, ref } }) => (
          <div className={styles.container}>
            <label>
              {name} {required && <span>*</span>}              
              </label>
            {mask ? (
              <InputMask
                mask="99999-999"
                onBlur={onBlur}
                onChange={onChange}
                inputRef={ref}
              />
            ) : (
              <input
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...rest}
                ref={ref}
              />
            )}            
            <p style={error ? {} : { visibility: 'hidden'}}>{error ? error : '*'}</p>
          </div>
        )}
        control={control}
      />
    </>
  );
}
