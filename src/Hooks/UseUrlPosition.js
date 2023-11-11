import { useSearchParams } from "react-router-dom";

export function UseUrlPosition() {
  const [searchparam] = useSearchParams();
  const Lat = searchparam.get("lat");
  const Lng = searchparam.get("lng");
  return [Lat, Lng];
}
