import Head from "next/head";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../store";
import styles from "./styles.module.scss";

export default function Result() {
  const { fullAddress } = useAppSelector((state) => state.address);

  return (
    <div className={styles.container}>
      <Head>
        <title>Resultado</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main className={styles.main}>
        <div>
          {fullAddress && (
            <>
              <h1>Endereço</h1>
              <p>Rua: <span>{fullAddress.street}</span></p>
              <p>Bairro: <span>{fullAddress.neighborhood}</span></p>
              <p>Número: <span>{fullAddress.addressNumber}</span></p>
              <p>CEP: <span>{fullAddress.addressCode}</span></p>
              <p>Cidade: <span>{fullAddress.city}</span></p>
              <p>Estado: <span>{fullAddress.state}</span></p>
              <p>Complemento: <span>{fullAddress.complement}</span></p>
              
            </>
          )}
        </div>
      </main>
    </div>
  );
}
