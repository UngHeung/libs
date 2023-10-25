import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const url = e.currentTarget.name;
    navigate(url, { replace: true });
  };

  return (
    <nav>
      <ul>
        <li>
          <button type="button" name="/" onClick={handleClick}>
            홈
          </button>
          <button type="button" name="/upload/image" onClick={handleClick}>
            이미지업로드
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
