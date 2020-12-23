/** ----------------------------------------------------
 ** Navigation link for reach-router
 * -----------------------------------------------------
 * Easy use of active links
 */
import React from "react";
import { Link, Match } from "@reach/router";

export const NavLink = (props) => {
  return (
    <Match path={props.to}>
      {({ match }) => (
        <div
          className={
            props.override
              ? props.override
              : "nav-link" + (match ? " active" : "")
          }
        >
          <Link to={props.to}>{props.children}</Link>
        </div>
      )}
    </Match>
  );
};
