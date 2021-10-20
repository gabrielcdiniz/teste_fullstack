import { PokeAPI } from "../services/api";

function IndexPage(props) {
  const { pokemons } = props;

  return (
    <div>
      <span>Welcome</span>
      {pokemons?.map(({ name }, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await PokeAPI.get();

  console.log("POKEMONS STATIC", data);

  let props = {};
  if (!!data) {
    const { results } = data;
    props = { pokemons: results };
  }

  return {
    props,
  };
}

export default IndexPage;
