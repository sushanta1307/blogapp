import { createContext, useState } from "react";

const cookieContext = createContext();

const CookieContext = (props) => {
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      //cut the extra spaces
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        console.log(c.substring(name.length, c.length));
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  const [cookie, setCookie] = useState(getCookie("authToken"));
  return (
    <cookieContext.Provider value={{ cookie, setCookie, getCookie }}>
      {props.children}
    </cookieContext.Provider>
  );
};

export {cookieContext, CookieContext};
