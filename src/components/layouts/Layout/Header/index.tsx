import { useIsMobile, useUserContext } from "../../../../hooks";

import DesktopLogged from "./DesktopLogged";
import DesktopNoLogged from "./DesktopNoLogged";
import MobileLogged from "./MobileLogged";
import MobileNoLogged from "./MobileNoLogged";

export default function Header() {
  const { isLogged } = useUserContext();
  const isMobile = useIsMobile("sm");

  if (isLogged) {
    return isMobile ? <MobileLogged /> : <DesktopLogged />;
  } else {
    return isMobile ? <MobileNoLogged /> : <DesktopNoLogged />;
  }
}
