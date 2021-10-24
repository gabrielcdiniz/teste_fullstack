import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { PokemonContext } from "../../contexts/PokemonContext";
import { FaHeart, FaRegHeart, FaHeartbeat } from "react-icons/fa";
import {
  GiArcheryTarget,
  GiWingfoot,
  GiDodging,
  GiDrippingSword,
  GiShieldReflect,
} from "react-icons/gi";
import { RiSwordFill } from "react-icons/ri";
import { BiShieldQuarter } from "react-icons/bi";
import { PokeAPI } from "../../services/api";
import { Loading } from "../Loading/Loading";

import styles from "./styles.module.scss";

export function PokemonDetail() {
  const { pokemon, favoritesList, setFavoritesList } =
    useContext(PokemonContext);

  const isFavorite = favoritesList.some(({ id }) => id === pokemon?.id);
  const [favorite, setFavorite] = useState(isFavorite || false);
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const appendFavorite = (pokemon) => {
    setFavoritesList((prev) => {
      prev.push(pokemon);
      return [...prev];
    });
  };

  const popFavorite = (pokemon) => {
    const prevList = [...favoritesList];
    const index = prevList.findIndex(({ id }) => id === pokemon.id);

    prevList.splice(index, 1);

    setFavoritesList(prevList);
  };

  const getTypes = (name, index) => (
    <span key={index} className={`${styles.Type} ${styles[name]}`}>
      {name}
    </span>
  );

  const captilizeName = (name) => {
    const sep = "-";
    return name
      .split(sep)
      .map((text) => text.charAt(0).toUpperCase() + text.slice(1))
      .join(" ");
  };

  const getAbilities = async () => {
    const allAbilities = [];

    for (const {
      ability: { name, url },
    } of pokemon.abilities) {
      const { data } = await PokeAPI.get(url);

      const { effect_entries } = data;
      const { short_effect: description } = effect_entries.find(
        ({ language: { name } }) => name === "en"
      );

      allAbilities.push({ description, name });
    }

    setAbilities(allAbilities);
    setLoading(false);
  };

  const getStatIcon = (name) => {
    const defaultIconSize = 15;
    let icon = null;

    switch (name) {
      case "hp":
        icon = <FaHeartbeat size={defaultIconSize} />;
        break;

      case "attack":
        icon = <RiSwordFill size={defaultIconSize} />;
        break;

      case "defense":
        icon = <BiShieldQuarter size={defaultIconSize} />;
        break;

      case "special-attack":
        icon = <GiDrippingSword size={defaultIconSize} />;
        break;

      case "special-defense":
        icon = <GiShieldReflect size={defaultIconSize} />;
        break;

      case "speed":
        icon = <GiWingfoot size={defaultIconSize} />;
        break;

      case "accuracy":
        icon = <GiArcheryTarget size={defaultIconSize} />;
        break;

      case "evasion":
        icon = <GiDodging size={defaultIconSize} />;
        break;

      default:
        break;
    }

    return icon;
  };

  useEffect(() => {
    if (pokemon) {
      setLoading(true);
      const { stats } = pokemon;
      const allStates = stats.map(({ base_stat: value, stat: { name } }) => ({
        name,
        value,
      }));
      setStats(allStates);

      getAbilities();
    }
  }, [pokemon]);

  return (
    <div className={styles.DetailContainer}>
      <h2 className={styles.DetailTitle}>
        {!!pokemon ? (
          <>Detalhes de {captilizeName(pokemon.name)}</>
        ) : (
          <>Nenhum Pokémon com Esse Nome</>
        )}
      </h2>

      <Loading isActive={loading} message="Carregando Detalhes ..." />

      {!loading && (
        <div className={styles.Detail}>
          <div className={styles.DetailCard}>
            <div className={styles.DetailCardHeader}>
              <div className={styles.HeaderArea}>
                {favorite ? (
                  <FaHeart
                    onClick={(ev) => {
                      ev.preventDefault();
                      setFavorite(!favorite);
                      popFavorite(pokemon);
                    }}
                    size={48}
                  />
                ) : (
                  <FaRegHeart
                    onClick={(ev) => {
                      ev.preventDefault();
                      setFavorite(!favorite);
                      appendFavorite(pokemon);
                    }}
                    size={48}
                  />
                )}
                <Image
                  src={
                    pokemon?.sprites.other["official-artwork"][
                      "front_default"
                    ] || "/img/image-default.png"
                  }
                  width={240}
                  height={240}
                />
              </div>

              <div className={styles.HeaderArea}>
                <b className={styles.CardId}>
                  # {String(pokemon?.id).padStart(4, "0")}
                </b>

                <h3 className={styles.CardName}>{pokemon?.name}</h3>

                <div className={styles.CardTypes}>
                  {pokemon?.types.map(({ type }, index) =>
                    getTypes(type.name, index)
                  )}
                </div>
              </div>
            </div>

            <div className={styles.DetailCardContent}>
              <div className={styles.StatsContainer}>
                <h2 className={styles.StatsTitle}>Status Base</h2>
                <div>
                  {stats.map(({ name, value }) => {
                    return (
                      <div
                        key={`${pokemon?.name}-${name}`}
                        className={styles.Stat}
                      >
                        <div>
                          {getStatIcon(name)}
                          <p className={styles.StatName}>
                            {captilizeName(name)}
                          </p>
                        </div>
                        <b className={styles.StatValue}>{value}</b>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.AbilitiesContainer}>
                <h2 className={styles.AbilityTitle}>Habilidades</h2>

                <div className={styles.Abilities}>
                  {abilities.map(({ description, name }) => (
                    <div
                      key={`${pokemon?.name}-${name}`}
                      className={styles.Ability}
                    >
                      <b className={styles.Name}>{captilizeName(name)}</b>
                      <p className={styles.Description}>{description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
