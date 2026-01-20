const SneakerPageContext = createContext(null);

export function useSneakerPage() {
  return useContext(SneakerPageContext);
}

export default SneakerPageContext;
