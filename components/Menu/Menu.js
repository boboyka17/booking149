import React from "react";
import Link from "next/link";
export default function Menu({ name, items }) {
  return (
    <div className="card border-0">
      <div class="card-header bg-dark text-white h4">{name}</div>
      <div className="card-body">
        <ul class="navbar-nav">
          {items.map((elm) => (
            <li class="nav-item">
              <Link href={elm.link}>
                <a class="nav-link active">{elm.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

    // <ul class="list-group">
    //   <strong>{name}</strong>

    //   {items.map((elm) => {
    //     <li>
    //       <a class="list-group-item" href="#">
    //         {elm}
    //       </a>
    //     </li>;
    //   })}
    // </ul>
  );
}
