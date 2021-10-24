import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import { baseURL, PokeAPI } from "../../services/api";
import styles from "./styles.module.scss";

export default function Search() {
  const { push } = useRouter();

  const [searchValue, setSearchValue] = useState([]);
  const [typesList, setTypesList] = useState([]);
  const [abilitiesList, setAbilitiesList] = useState([]);

  const getType = (name, index) => (
    <span
      key={`${name}-${index}`}
      className={`${styles.Type} ${styles[name]}`}
      onClick={() => {
        push(`/search/type/${name}`);
      }}
    >
      {name}
    </span>
  );

  const getAbility = (name, index) => (
    <span
      key={`${name}-${index}`}
      className={styles.Ability}
      onClick={() => {
        push(`/search/ability/${name}`);
      }}
    >
      {String(name).replaceAll("-", " ")}
    </span>
  );

  const populateTypesList = async () => {
    const url = `${baseURL}/type`;
    const {
      data: { results },
    } = await PokeAPI.get(url);

    const list = results.map(({ name }) => name);

    setTypesList(list);
  };

  const populateAbilitiesList = async () => {
    const url = `${baseURL}/ability?limit=99999`;
    const {
      data: { results },
    } = await PokeAPI.get(url);

    const list = results.map(({ name }) => name);

    setAbilitiesList(list);
  };

  const search = () => push(`/search/name/${searchValue}`);

  const onSubmit = (e) => {
    e.preventDefault();
    search();
  };

  useEffect(() => {
    populateTypesList();
    populateAbilitiesList();
  }, []);

  return (
    <Layout>
      <div className={styles.SearchContainer}>
        <div className={styles.SearchTitle}>Pesquisar Pokémons</div>

        <div className={styles.Row}>
          <div className={styles.Group}>
            <div className={styles.GroupTitle}>
              <p>
                Pesquisa por <b>ID</b> ou <b>Nome</b>
              </p>
            </div>
            <div className={styles.GroupContent}>
              <form onSubmit={onSubmit}>
                <input
                  value={searchValue}
                  placeholder="Digite Aqui"
                  onChange={(ev) =>
                    setSearchValue(String(ev.target.value).toLowerCase())
                  }
                />
                <button type="button" onClick={() => search()}>
                  Pesquisar
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.Row}>
          <div className={styles.Group}>
            <div className={styles.GroupTitle}>
              Pesquisar por <b>Tipo</b>
            </div>
            <div className={styles.GroupGrid}>
              {typesList.map((name, index) => getType(name, index))}
            </div>
          </div>
        </div>

        <div className={styles.Row}>
          <div className={styles.Group}>
            <div className={styles.GroupTitle}>
              Pesquisar por <b>Habilidade</b>
            </div>
            <div className={styles.GroupGrid}>
              {abilitiesList.map((name, index) => getAbility(name, index))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
