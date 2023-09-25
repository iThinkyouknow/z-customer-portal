import "../app/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store/store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, ...rest }: AppProps) {
  // const store: any = useStore();

  const {store, props} = wrapper.useWrappedStore(rest);
  const {session, pageProps} = props;
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
      <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}
export default MyApp;