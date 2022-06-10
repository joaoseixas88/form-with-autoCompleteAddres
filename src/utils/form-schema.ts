import { isValidCEP } from "@brazilian-utils/brazilian-utils";
import { fail } from "assert";
import * as yup from "yup";
import { api } from "../services/api";

export const schema = yup.object({
  street: yup.string().required("Campo obrigatório"),
  city: yup.string().required("Campo obrigatório"),
  neighborhood: yup.string().required("Campo obrigatório"),
  state: yup.string().required("Campo obrigatório"),
  addressNumber: yup.string().required("Campo obrigatório"),
  addressCode: yup
    .string()
    .test("checkCep", "Cep não encontrado", (value) => {
      const formattedValue = value?.replace("-", "");
      return new Promise((resolve, reject) => {
        api.get(`${formattedValue}/json/`).then((res) => {
          if (res.data.erro) {
            resolve(false);
            return;
          }
          resolve(true);
        }).catch(err => resolve(false));
      });
    }),
});
