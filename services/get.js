import http from "./http";
import { getJwt } from "./auth";
import { toast } from "react-toastify";
import session from "./session";

/**--------------------------------------
 ** Build GET Api string
 * --------------------------------------
 * @param {string} category
 * @returns {object}
 */
export const getAPI = async (path, values) => {
  if (values) {
    return getJwt()
      .then(() => http.get(path, { params: values }))
      .catch((e) => {
        if (e.response.data.error.message === "Token is not valid!")
          window.location.reload();
        else {
          console.log(e.response);
          toast.error("Something went wrong!");
          return { data: { error: e } };
        }
      });
  } else
    return getJwt()
      .then(() => http.get(path))
      .catch((e) => {
        if (e.response.data.error.message === "Token is not valid!")
          window.location.reload();
        else {
          console.log(e.response);
          toast.error("Something went wrong!");
          return { data: { error: e } };
        }
      });
};
