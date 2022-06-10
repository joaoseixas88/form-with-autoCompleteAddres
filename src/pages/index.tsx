import { FormEvent, useEffect, useState } from "react";
import { Input } from "../components/Input/index";
import { PrimaryButton } from "../components/PrimaryButton/index";
import { Separator } from "../components/Separator/index";
import styles from "../styles/Home.module.scss";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../services/api";
import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import * as yup from "yup";
import { schema } from "../utils/form-schema";

interface ViaCepResponse {
  bairro: string;
  localidade: string;
  logradouro: string;
  uf: string;
  erro?: boolean;
}

export default function Home() {
  
 

  const {
    handleSubmit,
    control,
    setValue,
    watch,
    
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const watchedAddressCode: string = watch("addressCode", "");

  const setAddress = async (cep: string) => {
    const response = await api.get(`${cep}/json/`);
    const address: ViaCepResponse = response.data;

    if(address.erro){
      return
    }
    
    setValue("street", address.logradouro);
    setValue("neighborhood", address.bairro);
    setValue("city", address.localidade);
    setValue("state", address.uf);
    return address;
  };

  useEffect(() => {
    
    if (isValidCEP(watchedAddressCode)) {

      setAddress(watchedAddressCode);
    }
    
  }, [watchedAddressCode]);
  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Endereço</h1>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Separator>
            <Input
              control={control}
              name={"Rua"}
              error={errors.street && errors.street.message}
              fieldName="street"
              required
            />
            <Input
              control={control}
              name={"Cep"}
              fieldName="addressCode"
              error={errors.addressCode && errors.addressCode.message}
              required
              mask={"44073-000"}
            />
          </Separator>
          <Separator>
            <Input
              control={control}
              name={"Número"}
              error={errors.addressNumber && errors.addressNumber.message}
              fieldName="addressNumber"
              required
            />
            <Input
              control={control}
              name={"Bairro"}
              error={errors.neighborhood && errors.neighborhood.message}
              fieldName="neighborhood"
              required
            />
          </Separator>
          <Separator>
            <Input
              control={control}
              name={"Cidade"}
              error={errors.city && errors.city.message}
              fieldName="city"
              required
            />
            <Input
              control={control}
              name={"Estado"}
              error={errors.state && errors.state.message}
              fieldName="state"
              required
            />
          </Separator>
          <Separator
            style={{ flexDirection: "row", justifyContent: "flex-start" }}
          >
            <Input
              control={control}
              name={"Complemento"}
              error={errors.complement && errors.complement.message}
              fieldName="complement"
            />
          </Separator>
          <PrimaryButton label="Enviar" type="submit" />
        </form>
      </main>
    </div>
  );
}
