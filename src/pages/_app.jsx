import "../styles/global.scss";

function PokeApp({ Component, pageProps }) {
  return (
    <div suppressHydrationWarning>
      {typeof window === 'undefined' ? null : <Component {...pageProps} />}
    </div>
  );
}

export default PokeApp;
