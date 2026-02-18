import Spinner from "@/app/_components/ui/Spinner/Spinner";

export default function loading(): React.ReactElement {
  return <Spinner size="lg" label="Carregando pedidos..." />;
}
